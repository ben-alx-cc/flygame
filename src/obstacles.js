/**
 * Obstacles System
 * Prozedurale Hindernisgenerierung mit fairen Abständen
 */

import { rectIntersect, random, randomInt } from './utils.js';

export class ObstacleManager {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        
        // Obstacles Pool
        this.obstacles = [];
        this.maxObstacles = 10;
        
        // Generation
        this.nextObstacleX = canvasWidth + 200;
        this.minGap = 160; // Mindestlücke zwischen Pipes
        this.maxGap = 220;
        this.pipeWidth = 80;
        this.minSpacing = 350; // Mindestabstand zwischen Obstacles
        this.maxSpacing = 550;
        
        // Difficulty
        this.difficulty = 0;
        
        this.reset();
    }
    
    reset() {
        this.obstacles = [];
        this.nextObstacleX = this.canvasWidth + 400; // Startverzögerung
        this.difficulty = 0;
    }
    
    update(dt, cameraX, speedMultiplier = 1.0) {
        // Difficulty steigt
        this.difficulty = Math.min(speedMultiplier - 1, 0.5); // Max +50%
        
        // Gap-Größe skaliert mit Difficulty (wird kleiner)
        const currentGap = this.maxGap - (this.difficulty * 60);
        
        // Generiere neues Obstacle wenn nötig
        if (cameraX + this.canvasWidth > this.nextObstacleX) {
            this.spawnObstacle(currentGap);
        }
        
        // Entferne Obstacles außerhalb des Screens
        this.obstacles = this.obstacles.filter(obs => {
            return obs.x + obs.width > cameraX - 100;
        });
    }
    
    spawnObstacle(gapSize) {
        // Gap Position (vertical)
        const minGapY = 100;
        const maxGapY = this.canvasHeight - gapSize - 100;
        const gapY = random(minGapY, maxGapY);
        
        // Obere Pipe
        this.obstacles.push({
            x: this.nextObstacleX,
            y: 0,
            width: this.pipeWidth,
            height: gapY,
            type: 'top'
        });
        
        // Untere Pipe
        this.obstacles.push({
            x: this.nextObstacleX,
            y: gapY + gapSize,
            width: this.pipeWidth,
            height: this.canvasHeight - (gapY + gapSize),
            type: 'bottom'
        });
        
        // Nächste Position
        this.nextObstacleX += random(this.minSpacing, this.maxSpacing);
    }
    
    checkCollision(player) {
        const playerRect = player.getRect();
        
        for (const obs of this.obstacles) {
            if (rectIntersect(playerRect, obs)) {
                return true;
            }
        }
        
        return false;
    }
    
    render(ctx, cameraX) {
        this.obstacles.forEach(obs => {
            const screenX = obs.x - cameraX;
            
            // Pipe
            const gradient = ctx.createLinearGradient(screenX, 0, screenX + obs.width, 0);
            gradient.addColorStop(0, '#48BB78');
            gradient.addColorStop(0.5, '#38A169');
            gradient.addColorStop(1, '#2F855A');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(screenX, obs.y, obs.width, obs.height);
            
            // Border
            ctx.strokeStyle = '#276749';
            ctx.lineWidth = 3;
            ctx.strokeRect(screenX, obs.y, obs.width, obs.height);
            
            // Pipe Cap (oben oder unten)
            ctx.fillStyle = '#2F855A';
            if (obs.type === 'top') {
                ctx.fillRect(screenX - 5, obs.height - 20, obs.width + 10, 20);
            } else {
                ctx.fillRect(screenX - 5, obs.y, obs.width + 10, 20);
            }
        });
    }
}


