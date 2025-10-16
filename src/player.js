/**
 * Player Entity
 * Spieler mit Physik und Rendering
 */

import { clamp } from './utils.js';

export class Player {
    constructor(canvasWidth, canvasHeight, settings = {}) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.settings = settings;
        
        // Größe & Position
        this.width = 50;
        this.height = 35;
        this.x = 120; // Fixe X-Position (links im Screen)
        this.y = canvasHeight / 2 - this.height / 2; // Zentriert mit Höhenkorrektur
        
        // Physik
        this.velocityY = 0;
        this.gravity = 1400; // px/s²
        this.boostImpulse = -520; // px/s (negativ = nach oben)
        this.maxFallSpeed = 800;
        this.maxRiseSpeed = -600;
        this.drag = 0.95; // Luftwiderstand
        
        // Animation
        this.rotation = 0;
        this.targetRotation = 0;
        
        // Boost Effect
        this.isBoosting = false;
        this.boostParticles = [];
        
        this.reset();
    }
    
    reset() {
        this.y = this.canvasHeight / 2 - this.height / 2; // Zentriert mit Höhenkorrektur
        this.velocityY = 0;
        this.rotation = 0;
        this.targetRotation = 0;
        this.isBoosting = false;
        this.boostParticles = [];
    }
    
    // Dimensionen aktualisieren (bei Resize)
    updateDimensions(width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;
    }
    
    boost() {
        const sensitivity = this.settings.sensitivity || 1.0;
        this.velocityY = this.boostImpulse * sensitivity;
        this.isBoosting = true;
        
        // Partikel für Boost-Effekt
        this.addBoostParticle();
    }
    
    stopBoost() {
        this.isBoosting = false;
    }
    
    update(dt) {
        // Gravitation
        this.velocityY += this.gravity * dt;
        
        // Geschwindigkeit begrenzen
        this.velocityY = clamp(this.velocityY, this.maxRiseSpeed, this.maxFallSpeed);
        
        // Drag (subtil)
        this.velocityY *= this.drag;
        
        // Position updaten
        this.y += this.velocityY * dt;
        
        // Rotation basierend auf Velocity
        if (this.velocityY < 0) {
            this.targetRotation = -0.3; // Nach oben neigen
        } else if (this.velocityY > 200) {
            this.targetRotation = 0.3; // Nach unten neigen
        } else {
            this.targetRotation = 0;
        }
        
        // Smooth rotation interpolation
        this.rotation += (this.targetRotation - this.rotation) * 0.1;
        
        // Boost Particles Update
        this.boostParticles = this.boostParticles.filter(p => {
            p.life -= dt * 2;
            p.x -= dt * 150;
            p.y += p.vy * dt;
            p.alpha = p.life;
            return p.life > 0;
        });
    }
    
    addBoostParticle() {
        for (let i = 0; i < 3; i++) {
            this.boostParticles.push({
                x: this.x + this.width / 2,
                y: this.y + this.height / 2 + (Math.random() - 0.5) * 20,
                vy: (Math.random() - 0.5) * 100,
                life: 1,
                alpha: 1,
                size: 3 + Math.random() * 3
            });
        }
    }
    
    render(ctx) {
        // Boost Particles
        this.boostParticles.forEach(p => {
            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
        
        // Player
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation);
        
        // Flugzeug Body (vereinfachte Form)
        ctx.fillStyle = '#FF6B6B';
        ctx.beginPath();
        ctx.ellipse(0, 0, this.width / 2, this.height / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Wing
        ctx.fillStyle = '#FF8787';
        ctx.fillRect(-this.width / 3, -this.height / 2 - 8, this.width * 0.6, 8);
        
        // Cockpit Window
        ctx.fillStyle = '#87CEEB';
        ctx.beginPath();
        ctx.arc(this.width / 4, -5, 8, 0, Math.PI * 2);
        ctx.fill();
        
        // Propeller (wenn boosting)
        if (this.isBoosting) {
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 2;
            ctx.globalAlpha = 0.5;
            ctx.beginPath();
            ctx.moveTo(this.width / 2, -10);
            ctx.lineTo(this.width / 2, 10);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(this.width / 2 - 10, 0);
            ctx.lineTo(this.width / 2 + 10, 0);
            ctx.stroke();
        }
        
        ctx.restore();
        
        // Hitbox Debug (optional, auskommentiert)
        // ctx.strokeStyle = 'red';
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
    
    // Kollisionsbox für AABB
    getRect() {
        return {
            x: this.x + 5, // Kleinere Hitbox für faireres Gameplay
            y: this.y + 5,
            width: this.width - 10,
            height: this.height - 10
        };
    }
}


