/**
 * Storage Manager
 * localStorage Wrapper mit Namespace
 */

const NAMESPACE = 'mini-flight-v1';

export class Storage {
    static set(key, value) {
        try {
            const namespaced = `${NAMESPACE}:${key}`;
            localStorage.setItem(namespaced, JSON.stringify(value));
            return true;
        } catch (e) {
            console.warn('Storage set failed:', e);
            return false;
        }
    }
    
    static get(key, defaultValue = null) {
        try {
            const namespaced = `${NAMESPACE}:${key}`;
            const item = localStorage.getItem(namespaced);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.warn('Storage get failed:', e);
            return defaultValue;
        }
    }
    
    static remove(key) {
        try {
            const namespaced = `${NAMESPACE}:${key}`;
            localStorage.removeItem(namespaced);
            return true;
        } catch (e) {
            console.warn('Storage remove failed:', e);
            return false;
        }
    }
    
    static clear() {
        try {
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith(`${NAMESPACE}:`)) {
                    localStorage.removeItem(key);
                }
            });
            return true;
        } catch (e) {
            console.warn('Storage clear failed:', e);
            return false;
        }
    }
}

// Highscore Helpers
export function getHighscore() {
    return Storage.get('highscore', 0);
}

export function setHighscore(score) {
    const current = getHighscore();
    if (score > current) {
        Storage.set('highscore', score);
        return true; // Neuer Rekord
    }
    return false;
}

// Settings Helpers
export function getSettings() {
    return Storage.get('settings', {
        volume: 0.7,
        sensitivity: 1.0,
        graphics: 'normal',
        vibration: true
    });
}

export function saveSettings(settings) {
    Storage.set('settings', settings);
}


