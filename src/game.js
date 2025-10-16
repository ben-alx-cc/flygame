/**
 * Game Core
 * State Machine und Game Loop
 */

import { FPSCounter } from './utils.js';

// Game States
export const GAME_STATES = {
    START: 'start',
    RUNNING: 'running',
    PAUSED: 'paused',
    GAMEOVER: 'gameover'
};

export class Game {
    constructor(canvas, width, height) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.state = GAME_STATES.START;
        
        // Logische Dimensionen (nicht DPR-skaliert)
        this.width = width;
        this.height = height;
        
        // Zeit & Performance
        this.lastTime = 0;
        this.deltaTime = 0;
        this.fpsCounter = new FPSCounter();
        this.maxDeltaTime = 1 / 30; // Cap bei 30 FPS minimum
        
        // Game Objekte (werden von außen gesetzt)
        this.player = null;
        this.world = null;
        this.obstacles = null;
        this.coins = null;
        this.input = null;
        this.audio = null;
        this.ui = null;
        
        // Score
        this.score = 0;
        this.distance = 0;
        this.coinsCollected = 0;
        
        // Difficulty Scaling
        this.gameTime = 0;
        this.speedMultiplier = 1.0;
        
        // Loop Control
        this.animationId = null;
        this.isPaused = false;
        
        // Bind
        this.loop = this.loop.bind(this);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
        
        // Auto-Pause bei Tab-Wechsel
        document.addEventListener('visibilitychange', this.handleVisibilityChange);
    }
    
    setState(newState) {
        this.state = newState;
        
        // State-spezifische Aktionen
        if (newState === GAME_STATES.RUNNING && this.isPaused) {
            this.isPaused = false;
            this.lastTime = performance.now(); // Reset time für smooth resume
        }
        
        if (newState === GAME_STATES.PAUSED) {
            this.isPaused = true;
        }
    }
    
    start() {
        this.reset();
        this.setState(GAME_STATES.RUNNING);
        this.lastTime = performance.now();
        this.loop();
    }
    
    pause() {
        if (this.state === GAME_STATES.RUNNING) {
            this.setState(GAME_STATES.PAUSED);
        }
    }
    
    resume() {
        if (this.state === GAME_STATES.PAUSED) {
            this.setState(GAME_STATES.RUNNING);
            this.lastTime = performance.now();
        }
    }
    
    reset() {
        this.score = 0;
        this.distance = 0;
        this.coinsCollected = 0;
        this.gameTime = 0;
        this.speedMultiplier = 1.0;
        
        // Reset aller Game-Objekte
        if (this.player) this.player.reset();
        if (this.world) this.world.reset();
        if (this.obstacles) this.obstacles.reset();
        if (this.coins) this.coins.reset();
    }
    
    gameOver() {
        this.setState(GAME_STATES.GAMEOVER);
        
        // Audio
        if (this.audio) {
            this.audio.play('hit');
        }
        
        // Vibration
        if (this.ui && this.ui.settings.vibration) {
            navigator.vibrate && navigator.vibrate(200);
        }
        
        // UI Update
        if (this.ui) {
            this.ui.showGameOver(this.score, this.coinsCollected);
        }
    }
    
    loop(currentTime = 0) {
        // Delta Time berechnen
        this.deltaTime = Math.min((currentTime - this.lastTime) / 1000, this.maxDeltaTime);
        this.lastTime = currentTime;
        
        // Update & Render
        if (this.state === GAME_STATES.RUNNING) {
            this.update(this.deltaTime);
        }
        this.render();
        
        // FPS Update
        const fps = this.fpsCounter.update();
        if (this.ui) {
            this.ui.updateFPS(fps);
        }
        
        // Nächster Frame
        this.animationId = requestAnimationFrame(this.loop);
    }
    
    update(dt) {
        // Game Time
        this.gameTime += dt;
        
        // Speed erhöht sich langsam
        this.speedMultiplier = 1.0 + (this.gameTime / 60) * 0.5; // +50% nach 1 min
        
        // Player Update
        if (this.player) {
            this.player.update(dt);
            
            // Bounds Check (mit logischen Dimensionen)
            if (this.player.y + this.player.height > this.height ||
                this.player.y < 0) {
                this.gameOver();
                return;
            }
        }
        
        // World Update (Scrolling)
        if (this.world) {
            this.world.update(dt, this.speedMultiplier);
            this.distance = Math.floor(this.world.cameraX / 10);
        }
        
        // Obstacles Update
        if (this.obstacles && this.player) {
            this.obstacles.update(dt, this.world.cameraX, this.speedMultiplier);
            
            // Kollisionsprüfung
            if (this.obstacles.checkCollision(this.player)) {
                this.gameOver();
                return;
            }
        }
        
        // Coins Update
        if (this.coins && this.player) {
            this.coins.update(dt, this.world.cameraX, this.speedMultiplier);
            
            // Sammeln
            const collected = this.coins.checkCollection(this.player);
            if (collected > 0) {
                this.coinsCollected += collected;
                
                // Audio & Vibration
                if (this.audio) {
                    this.audio.play('collect');
                }
                if (this.ui && this.ui.settings.vibration) {
                    navigator.vibrate && navigator.vibrate(30);
                }
            }
        }
        
        // Score berechnen
        this.score = this.distance + (this.coinsCollected * 10);
        
        // UI Update
        if (this.ui) {
            this.ui.updateScore(this.score, this.coinsCollected);
        }
    }
    
    render() {
        // Clear (mit logischen Dimensionen)
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // World (Parallax Background)
        if (this.world) {
            this.world.render(this.ctx);
        }
        
        // Coins
        if (this.coins) {
            this.coins.render(this.ctx, this.world.cameraX);
        }
        
        // Obstacles
        if (this.obstacles) {
            this.obstacles.render(this.ctx, this.world.cameraX);
        }
        
        // Player
        if (this.player) {
            this.player.render(this.ctx);
        }
        
        // Pause Overlay (text direkt auf canvas)
        if (this.state === GAME_STATES.PAUSED) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(0, 0, this.width, this.height);
        }
    }
    
    handleVisibilityChange() {
        if (document.hidden && this.state === GAME_STATES.RUNNING) {
            this.pause();
            if (this.ui) {
                this.ui.showPause();
            }
        }
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    }
}

