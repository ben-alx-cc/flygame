/**
 * Coins System
 * Generierung und Sammeln von Münzen
 */

import { rectIntersect, random, randomInt } from './utils.js';

export class CoinManager {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        
        // Coins Pool
        this.coins = [];
        this.maxCoins = 30;
        
        // Generation
        this.nextCoinGroupX = canvasWidth + 300;
        this.minGroupSpacing = 400;
        this.maxGroupSpacing = 700;
        
        // Coin Props
        this.coinSize = 20;
        this.coinRotation = 0;
        
        this.reset();
    }
    
    reset() {
        this.coins = [];
        this.nextCoinGroupX = this.canvasWidth + 500;
        this.coinRotation = 0;
    }
    
    update(dt, cameraX, speedMultiplier = 1.0) {
        // Rotation Animation
        this.coinRotation += dt * 3;
        
        // Generiere neue Coin-Gruppe wenn nötig
        if (cameraX + this.canvasWidth > this.nextCoinGroupX) {
            this.spawnCoinGroup();
        }
        
        // Entferne Coins außerhalb des Screens
        this.coins = this.coins.filter(coin => {
            return coin.x + this.coinSize > cameraX - 100 && !coin.collected;
        });
    }
    
    spawnCoinGroup() {
        const groupSize = randomInt(3, 6);
        const pattern = randomInt(0, 2); // 0: line, 1: wave, 2: circle
        
        const startX = this.nextCoinGroupX;
        const startY = random(150, this.canvasHeight - 150);
        
        for (let i = 0; i < groupSize; i++) {
            let x, y;
            
            switch (pattern) {
                case 0: // Horizontal Line
                    x = startX + i * 40;
                    y = startY;
                    break;
                    
                case 1: // Wave
                    x = startX + i * 40;
                    y = startY + Math.sin(i * 0.8) * 50;
                    break;
                    
                case 2: // Diagonal
                    x = startX + i * 40;
                    y = startY + (i % 2 === 0 ? -30 : 30);
                    break;
            }
            
            this.coins.push({
                x,
                y,
                width: this.coinSize,
                height: this.coinSize,
                collected: false
            });
        }
        
        // Nächste Gruppe
        this.nextCoinGroupX += random(this.minGroupSpacing, this.maxGroupSpacing);
    }
    
    checkCollection(player) {
        const playerRect = player.getRect();
        let collected = 0;
        
        this.coins.forEach(coin => {
            if (!coin.collected && rectIntersect(playerRect, coin)) {
                coin.collected = true;
                collected++;
            }
        });
        
        return collected;
    }
    
    render(ctx, cameraX) {
        this.coins.forEach(coin => {
            if (coin.collected) return;
            
            const screenX = coin.x - cameraX;
            
            ctx.save();
            ctx.translate(screenX + this.coinSize / 2, coin.y + this.coinSize / 2);
            ctx.rotate(this.coinRotation);
            
            // Coin (goldener Kreis)
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.coinSize / 2);
            gradient.addColorStop(0, '#FFD700');
            gradient.addColorStop(0.7, '#FFA500');
            gradient.addColorStop(1, '#FF8C00');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(0, 0, this.coinSize / 2, 0, Math.PI * 2);
            ctx.fill();
            
            // Border
            ctx.strokeStyle = '#DAA520';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Inner Circle
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(0, 0, this.coinSize / 4, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        });
    }
}


