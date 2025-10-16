/**
 * World & Parallax System
 * Scrolling Background mit mehreren Parallax-Layern
 */

export class World {
    constructor(canvasWidth, canvasHeight, settings = {}) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.settings = settings;
        
        // Scroll
        this.cameraX = 0;
        this.baseSpeed = 220; // px/s
        
        // Parallax Layers
        this.layers = this.createLayers();
        
        this.reset();
    }
    
    reset() {
        this.cameraX = 0;
        this.layers.forEach(layer => {
            layer.offset = 0;
        });
    }
    
    createLayers() {
        const isLowGraphics = this.settings.graphics === 'low';
        
        const layers = [
            // Sky (statisch)
            {
                type: 'gradient',
                speed: 0,
                offset: 0,
                render: (ctx, offset) => this.renderSky(ctx)
            },
            // Far Mountains
            {
                type: 'mountains-far',
                speed: 0.2,
                offset: 0,
                render: (ctx, offset) => this.renderMountains(ctx, offset, '#4A5568', 0.3)
            }
        ];
        
        // Mid-Clouds (skip in low graphics)
        if (!isLowGraphics) {
            layers.push({
                type: 'clouds',
                speed: 0.4,
                offset: 0,
                render: (ctx, offset) => this.renderClouds(ctx, offset)
            });
        }
        
        // Near Mountains
        layers.push({
            type: 'mountains-near',
            speed: 0.6,
            offset: 0,
            render: (ctx, offset) => this.renderMountains(ctx, offset, '#2D3748', 0.6)
        });
        
        // Ground
        layers.push({
            type: 'ground',
            speed: 1.0,
            offset: 0,
            render: (ctx, offset) => this.renderGround(ctx, offset)
        });
        
        return layers;
    }
    
    update(dt, speedMultiplier = 1.0) {
        const scrollSpeed = this.baseSpeed * speedMultiplier;
        this.cameraX += scrollSpeed * dt;
        
        // Layer Offsets
        this.layers.forEach(layer => {
            layer.offset = this.cameraX * layer.speed;
        });
    }
    
    render(ctx) {
        this.layers.forEach(layer => {
            layer.render(ctx, layer.offset);
        });
    }
    
    // Rendering Functions
    renderSky(ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 0, this.canvasHeight);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(0.7, '#B0E0E6');
        gradient.addColorStop(1, '#E0F6FF');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
    
    renderMountains(ctx, offset, color, yScale) {
        ctx.fillStyle = color;
        ctx.beginPath();
        
        const baseY = this.canvasHeight * 0.7;
        const amplitude = 80 * yScale;
        const frequency = 0.003;
        
        ctx.moveTo(-offset % 500, baseY);
        
        for (let x = -offset % 500; x < this.canvasWidth + 100; x += 50) {
            const y = baseY - Math.sin((x + offset) * frequency) * amplitude;
            ctx.lineTo(x, y);
        }
        
        ctx.lineTo(this.canvasWidth, this.canvasHeight);
        ctx.lineTo(0, this.canvasHeight);
        ctx.closePath();
        ctx.fill();
    }
    
    renderClouds(ctx, offset) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        
        // Clouds wiederholen sich alle 800px
        const cloudSpacing = 800;
        const startX = Math.floor(offset / cloudSpacing) * cloudSpacing;
        
        for (let x = startX; x < startX + this.canvasWidth + cloudSpacing; x += cloudSpacing) {
            const cloudX = x - offset;
            
            // Wolke 1
            this.drawCloud(ctx, cloudX + 100, 80, 60, 30);
            
            // Wolke 2
            this.drawCloud(ctx, cloudX + 400, 140, 80, 40);
            
            // Wolke 3
            this.drawCloud(ctx, cloudX + 650, 100, 70, 35);
        }
    }
    
    drawCloud(ctx, x, y, width, height) {
        ctx.save();
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.ellipse(x, y, width, height, 0, 0, Math.PI * 2);
        ctx.ellipse(x - width * 0.5, y + height * 0.3, width * 0.7, height * 0.7, 0, 0, Math.PI * 2);
        ctx.ellipse(x + width * 0.5, y + height * 0.3, width * 0.7, height * 0.7, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
    
    renderGround(ctx, offset) {
        const groundY = this.canvasHeight * 0.85;
        
        // Ground Fill
        ctx.fillStyle = '#2F855A';
        ctx.fillRect(0, groundY, this.canvasWidth, this.canvasHeight - groundY);
        
        // Ground Pattern (Gras)
        ctx.strokeStyle = '#38A169';
        ctx.lineWidth = 2;
        
        const grassSpacing = 20;
        const startX = -(offset % grassSpacing);
        
        for (let x = startX; x < this.canvasWidth; x += grassSpacing) {
            ctx.beginPath();
            ctx.moveTo(x, groundY);
            ctx.lineTo(x + 3, groundY - 8);
            ctx.lineTo(x + 6, groundY);
            ctx.stroke();
        }
    }
}


