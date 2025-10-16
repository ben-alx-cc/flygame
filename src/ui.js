/**
 * UI Manager
 * Verwaltet alle UI-Elemente, Screens und Modals
 */

import { getSettings, saveSettings, getHighscore, setHighscore } from './storage.js';
import { isIOS, isStandalone } from './utils.js';

export class UIManager {
    constructor() {
        // Settings
        this.settings = getSettings();
        
        // Elements
        this.elements = {
            // Screens
            startScreen: document.getElementById('startScreen'),
            gameOverScreen: document.getElementById('gameOverScreen'),
            pauseOverlay: document.getElementById('pauseOverlay'),
            
            // HUD
            hud: document.getElementById('hud'),
            scoreText: document.getElementById('scoreText'),
            coinCount: document.getElementById('coinCount'),
            fpsCounter: document.getElementById('fpsCounter'),
            
            // Buttons
            startButton: document.getElementById('startButton'),
            restartButton: document.getElementById('restartButton'),
            pauseButton: document.getElementById('pauseButton'),
            resumeButton: document.getElementById('resumeButton'),
            muteButton: document.getElementById('muteButton'),
            quitButton: document.getElementById('quitButton'),
            homeButton: document.getElementById('homeButton'),
            
            // Settings
            settingsModal: document.getElementById('settingsModal'),
            settingsFromPauseButton: document.getElementById('settingsFromPauseButton'),
            settingsFromGameOverButton: document.getElementById('settingsFromGameOverButton'),
            closeSettingsButton: document.getElementById('closeSettingsButton'),
            volumeSlider: document.getElementById('volumeSlider'),
            volumeValue: document.getElementById('volumeValue'),
            sensitivitySlider: document.getElementById('sensitivitySlider'),
            sensitivityValue: document.getElementById('sensitivityValue'),
            graphicsSelect: document.getElementById('graphicsSelect'),
            vibrationToggle: document.getElementById('vibrationToggle'),
            
            // Game Over
            finalScore: document.getElementById('finalScore'),
            highscoreDisplay: document.getElementById('highscoreDisplay'),
            newHighscoreText: document.getElementById('newHighscoreText'),
            
            // Install Hint
            installHint: document.getElementById('installHint')
        };
        
        // Callbacks
        this.onStart = null;
        this.onRestart = null;
        this.onPause = null;
        this.onResume = null;
        this.onQuit = null;
        this.onMuteToggle = null;
        this.onSettingsChange = null;
        
        this.setupListeners();
        this.loadSettings();
        this.checkInstallHint();
    }
    
    setupListeners() {
        // Start
        this.elements.startButton.addEventListener('click', () => {
            if (this.onStart) this.onStart();
        });
        
        // Restart
        this.elements.restartButton.addEventListener('click', () => {
            if (this.onRestart) this.onRestart();
        });
        
        // Pause/Resume
        this.elements.pauseButton.addEventListener('click', () => {
            if (this.onPause) this.onPause();
        });
        
        this.elements.resumeButton.addEventListener('click', () => {
            if (this.onResume) this.onResume();
        });
        
        // Quit
        this.elements.quitButton.addEventListener('click', () => {
            if (this.onQuit) this.onQuit();
        });
        
        this.elements.homeButton.addEventListener('click', () => {
            if (this.onQuit) this.onQuit();
        });
        
        // Mute
        this.elements.muteButton.addEventListener('click', () => {
            if (this.onMuteToggle) {
                const isMuted = this.onMuteToggle();
                this.updateMuteButton(isMuted);
            }
        });
        
        // Settings Modal
        this.elements.settingsFromPauseButton.addEventListener('click', () => {
            this.showSettings();
        });
        
        this.elements.settingsFromGameOverButton.addEventListener('click', () => {
            this.showSettings();
        });
        
        this.elements.closeSettingsButton.addEventListener('click', () => {
            this.hideSettings();
        });
        
        // Settings Controls
        this.elements.volumeSlider.addEventListener('input', (e) => {
            const value = e.target.value / 100;
            this.settings.volume = value;
            this.elements.volumeValue.textContent = `${e.target.value}%`;
            if (this.onSettingsChange) this.onSettingsChange(this.settings);
        });
        
        this.elements.sensitivitySlider.addEventListener('input', (e) => {
            const value = e.target.value / 100;
            this.settings.sensitivity = value;
            this.elements.sensitivityValue.textContent = `${e.target.value}%`;
            if (this.onSettingsChange) this.onSettingsChange(this.settings);
        });
        
        this.elements.graphicsSelect.addEventListener('change', (e) => {
            this.settings.graphics = e.target.value;
            if (this.onSettingsChange) this.onSettingsChange(this.settings);
        });
        
        this.elements.vibrationToggle.addEventListener('change', (e) => {
            this.settings.vibration = e.target.checked;
            if (this.onSettingsChange) this.onSettingsChange(this.settings);
        });
    }
    
    loadSettings() {
        // Apply settings to UI
        this.elements.volumeSlider.value = this.settings.volume * 100;
        this.elements.volumeValue.textContent = `${Math.round(this.settings.volume * 100)}%`;
        
        this.elements.sensitivitySlider.value = this.settings.sensitivity * 100;
        this.elements.sensitivityValue.textContent = `${Math.round(this.settings.sensitivity * 100)}%`;
        
        this.elements.graphicsSelect.value = this.settings.graphics;
        this.elements.vibrationToggle.checked = this.settings.vibration;
    }
    
    saveCurrentSettings() {
        saveSettings(this.settings);
    }
    
    checkInstallHint() {
        // Zeige Install-Hint nur auf iOS Safari, wenn nicht standalone
        if (isIOS() && !isStandalone()) {
            this.elements.installHint.classList.remove('hidden');
        }
    }
    
    // Screen Management
    showStartScreen() {
        this.hideAll();
        this.elements.startScreen.classList.remove('hidden');
    }
    
    showGameScreen() {
        this.hideAll();
        this.elements.hud.classList.remove('hidden');
    }
    
    showPause() {
        this.elements.pauseOverlay.classList.remove('hidden');
    }
    
    hidePause() {
        this.elements.pauseOverlay.classList.add('hidden');
    }
    
    showGameOver(score, coins) {
        this.elements.finalScore.textContent = score;
        
        const highscore = getHighscore();
        const isNewHighscore = setHighscore(score);
        
        this.elements.highscoreDisplay.textContent = Math.max(score, highscore);
        
        if (isNewHighscore) {
            this.elements.newHighscoreText.classList.remove('hidden');
        } else {
            this.elements.newHighscoreText.classList.add('hidden');
        }
        
        this.elements.gameOverScreen.classList.remove('hidden');
    }
    
    showSettings() {
        this.elements.settingsModal.classList.remove('hidden');
    }
    
    hideSettings() {
        this.elements.settingsModal.classList.add('hidden');
        this.saveCurrentSettings();
    }
    
    hideAll() {
        this.elements.startScreen.classList.add('hidden');
        this.elements.gameOverScreen.classList.add('hidden');
        this.elements.pauseOverlay.classList.add('hidden');
        this.elements.hud.classList.add('hidden');
        this.elements.settingsModal.classList.add('hidden');
    }
    
    // HUD Updates
    updateScore(score, coins) {
        this.elements.scoreText.textContent = score;
        this.elements.coinCount.textContent = coins;
    }
    
    updateFPS(fps) {
        this.elements.fpsCounter.textContent = `${fps} FPS`;
    }
    
    updateMuteButton(isMuted) {
        this.elements.muteButton.textContent = isMuted ? '🔇' : '🔊';
    }
}


