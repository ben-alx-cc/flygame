/**
 * Main Entry Point
 * Initialisiert und verbindet alle Systeme
 */

import { setupCanvas } from './utils.js';
import { Game, GAME_STATES } from './game.js';
import { Player } from './player.js';
import { World } from './world.js';
import { ObstacleManager } from './obstacles.js';
import { CoinManager } from './coins.js';
import { InputManager } from './input.js';
import { AudioManager } from './audio.js';
import { UIManager } from './ui.js';

class App {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.canvasSetup = null;
        this.game = null;
        
        // Managers
        this.ui = null;
        this.audio = null;
        this.input = null;
        
        this.init();
    }
    
    init() {
        // Canvas Setup
        this.setupCanvasSize();
        window.addEventListener('resize', () => this.setupCanvasSize());
        
        // UI Manager
        this.ui = new UIManager();
        this.setupUICallbacks();
        
        // Audio Manager
        this.audio = new AudioManager();
        
        // Input Manager
        this.input = new InputManager(this.canvas);
        
        // Show Start Screen
        this.ui.showStartScreen();
    }
    
    setupCanvasSize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        this.canvasSetup = setupCanvas(this.canvas, width, height);
        
        // Wenn Game läuft, Dimensionen updaten und Objekte neu initialisieren
        if (this.game) {
            this.game.width = this.canvasSetup.width;
            this.game.height = this.canvasSetup.height;
            this.initializeGame();
        }
    }
    
    setupUICallbacks() {
        this.ui.onStart = () => this.startGame();
        this.ui.onRestart = () => this.restartGame();
        this.ui.onPause = () => this.pauseGame();
        this.ui.onResume = () => this.resumeGame();
        this.ui.onQuit = () => this.quitGame();
        this.ui.onMuteToggle = () => this.toggleMute();
        this.ui.onSettingsChange = (settings) => this.updateSettings(settings);
    }
    
    async startGame() {
        // Audio initialisieren (iOS: benötigt User Interaction)
        await this.audio.init();
        this.audio.setVolume(this.ui.settings.volume);
        
        // Game erstellen falls noch nicht vorhanden
        if (!this.game) {
            const { width, height } = this.canvasSetup;
            this.game = new Game(this.canvas, width, height);
            this.game.ui = this.ui;
            this.game.audio = this.audio;
        }
        
        // Game-Objekte initialisieren
        this.initializeGame();
        
        // Input Callbacks
        this.setupInputCallbacks();
        
        // UI
        this.ui.showGameScreen();
        
        // Game starten
        this.game.start();
    }
    
    initializeGame() {
        const { width, height } = this.canvasSetup;
        
        // Player
        if (!this.game.player) {
            this.game.player = new Player(width, height, this.ui.settings);
        } else {
            this.game.player.updateDimensions(width, height);
            this.game.player.reset();
        }
        
        // World
        this.game.world = new World(width, height, this.ui.settings);
        
        // Obstacles
        this.game.obstacles = new ObstacleManager(width, height);
        
        // Coins
        this.game.coins = new CoinManager(width, height);
        
        // Input
        this.game.input = this.input;
    }
    
    setupInputCallbacks() {
        // Entferne alte Callbacks
        this.input.listeners.start = [];
        this.input.listeners.end = [];
        
        // Neue Callbacks
        this.input.on('start', () => {
            if (this.game.state === GAME_STATES.RUNNING && this.game.player) {
                this.game.player.boost();
                this.audio.play('whoosh');
            }
        });
        
        this.input.on('end', () => {
            if (this.game.state === GAME_STATES.RUNNING && this.game.player) {
                this.game.player.stopBoost();
            }
        });
    }
    
    restartGame() {
        this.ui.hideAll();
        this.startGame();
    }
    
    pauseGame() {
        if (this.game) {
            this.game.pause();
            this.ui.showPause();
        }
    }
    
    resumeGame() {
        if (this.game) {
            this.game.resume();
            this.ui.hidePause();
        }
    }
    
    quitGame() {
        if (this.game) {
            this.game.setState(GAME_STATES.START);
        }
        this.ui.showStartScreen();
    }
    
    toggleMute() {
        const isMuted = this.audio.toggleMute();
        return isMuted;
    }
    
    updateSettings(settings) {
        this.audio.setVolume(settings.volume);
        
        // Wenn Graphics geändert wurde und Spiel läuft, Welt neu erstellen
        if (this.game && this.game.world) {
            this.game.world = new World(
                this.canvasSetup.width, 
                this.canvasSetup.height, 
                settings
            );
        }
        
        // Player Settings updaten
        if (this.game && this.game.player) {
            this.game.player.settings = settings;
        }
    }
}

// Service Worker Registration (PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Nur registrieren wenn nicht localhost
        const isLocalhost = window.location.hostname === 'localhost' || 
                          window.location.hostname === '127.0.0.1';
        
        if (!isLocalhost) {
            navigator.serviceWorker.register('./service-worker.js')
                .then(reg => console.log('Service Worker registered:', reg.scope))
                .catch(err => console.warn('Service Worker registration failed:', err));
        }
    });
}

// App starten
new App();

