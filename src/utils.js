/**
 * Utility Functions
 * Hilfsfunktionen für Mathematik, Kollision, Canvas etc.
 */

// Zahl zwischen min und max begrenzen
export function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

// Lineares Interpolieren
export function lerp(start, end, t) {
    return start + (end - start) * t;
}

// Zufallszahl zwischen min und max
export function random(min, max) {
    return Math.random() * (max - min) + min;
}

// Zufälliges Integer zwischen min und max (inklusiv)
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// AABB Collision Detection
export function rectIntersect(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

// Point in Rect Check
export function pointInRect(x, y, rect) {
    return x >= rect.x && 
           x <= rect.x + rect.width && 
           y >= rect.y && 
           y <= rect.y + rect.height;
}

// Device Pixel Ratio Helper
export function getOptimalDPR() {
    const dpr = window.devicePixelRatio || 1;
    // Begrenze auf max 2 für Performance auf mobilen Geräten
    return Math.min(dpr, 2);
}

// Canvas Setup mit DPR
export function setupCanvas(canvas, width, height) {
    const dpr = getOptimalDPR();
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    
    return { ctx, dpr, width, height };
}

// iOS Detection (heuristisch)
export function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

// Standalone Mode Check (installierte PWA)
export function isStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone === true;
}

// Vibration Helper mit Fallback
export function vibrate(pattern = 50) {
    if (navigator.vibrate) {
        navigator.vibrate(pattern);
    }
}

// FPS Counter Helper
export class FPSCounter {
    constructor() {
        this.frames = 0;
        this.lastTime = performance.now();
        this.fps = 60;
    }
    
    update() {
        this.frames++;
        const now = performance.now();
        
        if (now >= this.lastTime + 1000) {
            this.fps = Math.round((this.frames * 1000) / (now - this.lastTime));
            this.frames = 0;
            this.lastTime = now;
        }
        
        return this.fps;
    }
}

// Simple Seeded Random (für reproduzierbare Weltgenerierung)
export class SeededRandom {
    constructor(seed = Date.now()) {
        this.seed = seed;
    }
    
    next() {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }
    
    range(min, max) {
        return min + this.next() * (max - min);
    }
    
    int(min, max) {
        return Math.floor(this.range(min, max + 1));
    }
}


