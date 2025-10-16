/**
 * Input Manager
 * Touch & Keyboard Handling (iOS-freundlich)
 */

export class InputManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.isActive = false;
        this.listeners = {
            start: [],
            end: []
        };
        
        // Bind
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        
        this.setupListeners();
    }
    
    setupListeners() {
        // Touch Events (iOS)
        this.canvas.addEventListener('touchstart', this.handleTouchStart, { passive: false });
        this.canvas.addEventListener('touchend', this.handleTouchEnd, { passive: true });
        this.canvas.addEventListener('touchcancel', this.handleTouchEnd, { passive: true });
        
        // Mouse Events (Desktop)
        this.canvas.addEventListener('mousedown', this.handleMouseDown);
        this.canvas.addEventListener('mouseup', this.handleMouseUp);
        
        // Keyboard (Desktop)
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
    }
    
    handleTouchStart(e) {
        e.preventDefault(); // Verhindert Zoom etc. nur beim Spielfeld
        this.isActive = true;
        this.emit('start');
    }
    
    handleTouchEnd(e) {
        this.isActive = false;
        this.emit('end');
    }
    
    handleMouseDown(e) {
        if (e.button === 0) { // Linke Maustaste
            this.isActive = true;
            this.emit('start');
        }
    }
    
    handleMouseUp(e) {
        if (e.button === 0) {
            this.isActive = false;
            this.emit('end');
        }
    }
    
    handleKeyDown(e) {
        if (e.code === 'Space' && !e.repeat) {
            this.isActive = true;
            this.emit('start');
        }
    }
    
    handleKeyUp(e) {
        if (e.code === 'Space') {
            this.isActive = false;
            this.emit('end');
        }
    }
    
    // Event System
    on(event, callback) {
        if (this.listeners[event]) {
            this.listeners[event].push(callback);
        }
    }
    
    off(event, callback) {
        if (this.listeners[event]) {
            const index = this.listeners[event].indexOf(callback);
            if (index > -1) {
                this.listeners[event].splice(index, 1);
            }
        }
    }
    
    emit(event) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(cb => cb());
        }
    }
    
    destroy() {
        // Touch
        this.canvas.removeEventListener('touchstart', this.handleTouchStart);
        this.canvas.removeEventListener('touchend', this.handleTouchEnd);
        this.canvas.removeEventListener('touchcancel', this.handleTouchEnd);
        
        // Mouse
        this.canvas.removeEventListener('mousedown', this.handleMouseDown);
        this.canvas.removeEventListener('mouseup', this.handleMouseUp);
        
        // Keyboard
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('keyup', this.handleKeyUp);
    }
}


