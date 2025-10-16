/**
 * Audio System
 * Web Audio API für Sound Effects (iOS-freundlich)
 */

export class AudioManager {
    constructor() {
        this.audioContext = null;
        this.isInitialized = false;
        this.isMuted = false;
        this.volume = 0.7;
        
        // Sound Buffers
        this.sounds = {};
    }
    
    // Muss nach User-Interaction aufgerufen werden (iOS)
    async init() {
        if (this.isInitialized) return;
        
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Resume context (iOS requirement)
            if (this.audioContext.state === 'suspended') {
                await this.audioContext.resume();
            }
            
            // Generiere Sounds
            this.generateSounds();
            
            this.isInitialized = true;
            console.log('Audio initialized');
        } catch (e) {
            console.warn('Audio init failed:', e);
        }
    }
    
    generateSounds() {
        // Collect Sound (coin pickup)
        this.sounds.collect = this.createCollectSound();
        
        // Hit Sound (collision)
        this.sounds.hit = this.createHitSound();
        
        // Boost/Whoosh Sound
        this.sounds.whoosh = this.createWhooshSound();
    }
    
    createCollectSound() {
        const duration = 0.15;
        const sampleRate = this.audioContext.sampleRate;
        const buffer = this.audioContext.createBuffer(1, duration * sampleRate, sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < buffer.length; i++) {
            const t = i / sampleRate;
            // Einfacher Sinus-Sweep nach oben
            const freq = 800 + t * 600;
            const envelope = Math.exp(-t * 8);
            data[i] = Math.sin(2 * Math.PI * freq * t) * envelope * 0.3;
        }
        
        return buffer;
    }
    
    createHitSound() {
        const duration = 0.3;
        const sampleRate = this.audioContext.sampleRate;
        const buffer = this.audioContext.createBuffer(1, duration * sampleRate, sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < buffer.length; i++) {
            const t = i / sampleRate;
            // Noise burst mit schnellem Decay
            const noise = (Math.random() * 2 - 1);
            const envelope = Math.exp(-t * 10);
            data[i] = noise * envelope * 0.4;
        }
        
        return buffer;
    }
    
    createWhooshSound() {
        const duration = 0.2;
        const sampleRate = this.audioContext.sampleRate;
        const buffer = this.audioContext.createBuffer(1, duration * sampleRate, sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < buffer.length; i++) {
            const t = i / sampleRate;
            // Sweep nach unten
            const freq = 400 - t * 300;
            const envelope = Math.exp(-t * 6);
            data[i] = Math.sin(2 * Math.PI * freq * t) * envelope * 0.2;
        }
        
        return buffer;
    }
    
    play(soundName) {
        if (!this.isInitialized || this.isMuted || !this.sounds[soundName]) {
            return;
        }
        
        try {
            const source = this.audioContext.createBufferSource();
            source.buffer = this.sounds[soundName];
            
            const gainNode = this.audioContext.createGain();
            gainNode.gain.value = this.volume;
            
            source.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            source.start(0);
        } catch (e) {
            console.warn('Sound playback failed:', e);
        }
    }
    
    setVolume(value) {
        this.volume = Math.max(0, Math.min(1, value));
    }
    
    setMuted(muted) {
        this.isMuted = muted;
    }
    
    toggleMute() {
        this.isMuted = !this.isMuted;
        return this.isMuted;
    }
}


