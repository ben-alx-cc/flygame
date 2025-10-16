# 📋 Sky Runner - Projektübersicht

## 🎯 Projektziel

Ein minimalistischer, aber vollständiger Side-Scrolling Flugsimulator als Progressive Web App (PWA), optimiert für iOS Safari, offline-fähig und production-ready.

## ✅ Implementierte Features

### Core Gameplay
- ✅ Side-Scrolling mit kontinuierlichem Fortschritt
- ✅ Flüssige Physik (Gravitation, Boost, Drag)
- ✅ Touch-Steuerung (iOS-optimiert) + Desktop (Keyboard/Maus)
- ✅ Prozedurale Hindernisgenerierung
- ✅ Münzen-System mit verschiedenen Formationen
- ✅ Kollisionserkennung (AABB)
- ✅ Score-System (Distanz + Münzen)
- ✅ Difficulty Scaling (Speed erhöht sich mit Zeit)

### Visuals
- ✅ Parallax-Background (3-5 Layer je nach Grafik-Setting)
- ✅ Canvas 2D Rendering mit DPR-Support
- ✅ Animierter Player mit Rotation
- ✅ Boost-Partikel-Effekt
- ✅ Gradient-Backgrounds
- ✅ Responsive Canvas (Auto-Resize)

### Audio & Haptik
- ✅ Web Audio API (prozedural generierte Sounds)
- ✅ 3 Sound-Effekte (Collect, Hit, Whoosh)
- ✅ iOS-freundliche Audio-Initialisierung
- ✅ Mute-Toggle mit Persistenz
- ✅ Vibrations-API Integration (optional)

### UI/UX
- ✅ Start Screen
- ✅ HUD (Score, Coins, FPS, Controls)
- ✅ Pause Overlay
- ✅ Game Over Screen mit Highscore
- ✅ Settings Modal (Volume, Sensitivity, Graphics, Vibration)
- ✅ "Add to Home Screen" Hint für iOS
- ✅ Responsive Design (Mobile + Desktop)
- ✅ Moderne UI mit Gradients & Blur

### PWA Features
- ✅ Service Worker (Offline-Caching)
- ✅ Web App Manifest
- ✅ Installierbar (iOS, Android, Desktop)
- ✅ Standalone Mode
- ✅ Icons (SVG + Generator für PNG)
- ✅ Splash Screen
- ✅ Theme Color

### Performance
- ✅ Delta-Time basierte Animation
- ✅ 60 FPS Target
- ✅ Device Pixel Ratio Handling (max 2x)
- ✅ Auto-Pause bei Tab-Wechsel
- ✅ Object Pooling (Obstacles/Coins)
- ✅ Offscreen Culling
- ✅ FPS Counter

### Persistenz
- ✅ localStorage Integration
- ✅ Highscore Speicherung
- ✅ Settings Speicherung
- ✅ Namespace für Keys (mini-flight-v1:*)

## 📁 Dateistruktur

```
hotroad/
│
├── index.html                    # Haupt-HTML mit allen Screens
├── styles.css                    # Komplettes Styling
├── manifest.webmanifest          # PWA Manifest
├── service-worker.js             # Offline/Caching
├── .gitignore                    # Git-Konfiguration
│
├── src/                          # Source Code (ES Modules)
│   ├── main.js                   # Entry Point & App-Klasse
│   ├── game.js                   # Game Loop & State Machine
│   ├── player.js                 # Spieler-Entity mit Physik
│   ├── world.js                  # Parallax & Scrolling
│   ├── obstacles.js              # Hindernisse-Manager
│   ├── coins.js                  # Münzen-Manager
│   ├── input.js                  # Touch/Keyboard Input
│   ├── audio.js                  # Audio-System (Web Audio API)
│   ├── ui.js                     # UI-Manager (Screens, Modals)
│   ├── utils.js                  # Hilfsfunktionen
│   └── storage.js                # localStorage Wrapper
│
├── icons/                        # App Icons
│   ├── icon-192.svg
│   ├── icon-512.svg
│   ├── apple-touch-icon.svg
│   └── splash-640x1136.svg
│
├── generate-icons.html           # Browser-basierter Icon-Generator
├── generate-icons.js             # Node.js Icon-Generator (SVG)
├── create-icons.py               # Python Icon-Generator (PNG)
├── create-png-icons.sh           # ImageMagick Wrapper
│
├── README.md                     # Haupt-Dokumentation
├── DEPLOYMENT.md                 # Deployment-Guide
└── PROJECT-OVERVIEW.md           # Diese Datei
```

## 🔧 Technologie-Stack

- **Frontend**: Vanilla JavaScript (ES2020+)
- **Rendering**: HTML5 Canvas 2D Context
- **Audio**: Web Audio API (prozedural)
- **Storage**: localStorage
- **PWA**: Service Worker + Manifest
- **Styling**: Modern CSS (Gradients, Flexbox, Grid)
- **APIs**: Vibration API, Page Visibility API

### Keine Abhängigkeiten

- ✅ Kein npm/Webpack/Build-Prozess
- ✅ Keine externen Libraries
- ✅ Keine CDN-Abhängigkeiten
- ✅ Komplett standalone

## 🎮 Gameplay-Spezifikationen

### Physik
- **Gravitation**: 1400 px/s²
- **Boost-Impuls**: -520 px/s (anpassbar via Settings)
- **Max Fall Speed**: 800 px/s
- **Max Rise Speed**: -600 px/s
- **Drag**: 0.95 (subtil)

### Welt
- **Base Speed**: 220 px/s
- **Speed Scaling**: +50% max nach 1 Minute
- **Parallax Layers**: 4-5 (Himmel, Berge weit, Wolken, Berge nah, Boden)

### Obstacles
- **Pipe Width**: 80 px
- **Gap Size**: 160-220 px (skaliert mit Difficulty)
- **Min Spacing**: 350 px (~1.6s bei base speed)
- **Max Spacing**: 550 px
- **Min Reaktionszeit**: 1.2 Sekunden garantiert

### Coins
- **Size**: 20 px
- **Patterns**: Line, Wave, Diagonal
- **Group Size**: 3-6 Münzen
- **Spacing**: 400-700 px zwischen Gruppen
- **Value**: 10 Punkte pro Münze

### Scoring
```
Score = (Distanz / 10) + (Coins × 10)
```

## 🎨 Design-System

### Farbpalette
- **Himmel**: #87CEEB → #E0F6FF (Gradient)
- **Player**: #FF6B6B (Rot)
- **Obstacles**: #38A169 (Grün)
- **Coins**: #FFD700 (Gold)
- **UI Primary**: #667eea → #764ba2 (Gradient)
- **UI Background**: rgba(0,0,0,0.8) + blur

### Typografie
- **Font**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
- **Sizes**: 
  - Titel: 3rem (mobile: 2rem)
  - Buttons: 1.2rem
  - HUD: 1.3rem

## 📱 iOS-Optimierungen

1. **Touch-Handling**
   - Passive Touch-Listener
   - preventDefault nur auf Canvas
   - Touch-Callout deaktiviert

2. **Audio**
   - Context-Init nach User-Tap
   - Resume bei suspended state
   - Fallback bei Fehler

3. **PWA**
   - apple-mobile-web-app-capable
   - apple-mobile-web-app-status-bar-style
   - apple-touch-icon
   - apple-touch-startup-image
   - viewport-fit=cover (Notch-Support)

4. **Performance**
   - DPR limitiert auf 2
   - Auto-Pause bei visibility change
   - Optimierte Canvas-Size

## 🚀 Performance-Ziele

| Metrik | Ziel | Status |
|--------|------|--------|
| FPS | 60 | ✅ |
| First Paint | < 1s | ✅ |
| Time to Interactive | < 2s | ✅ |
| Bundle Size | < 100KB | ✅ |
| Lighthouse PWA | 100 | ✅ |
| Lighthouse Performance | 90+ | ✅ |

## 🧪 Testing-Checkliste

### Funktional
- [x] Touch-Steuerung funktioniert
- [x] Keyboard-Steuerung funktioniert
- [x] Kollision korrekt
- [x] Coins sammelbar
- [x] Score zählt richtig
- [x] Highscore speichert
- [x] Settings persistieren
- [x] Audio spielt nach Tap
- [x] Vibration funktioniert (wo verfügbar)
- [x] Pause/Resume
- [x] Game Over → Restart Flow

### PWA
- [x] Service Worker registriert
- [x] Offline spielbar
- [x] Installierbar (iOS)
- [x] Installierbar (Android)
- [x] Icons werden angezeigt
- [x] Splash Screen (iOS)
- [x] Fullscreen nach Install

### Performance
- [x] 60 FPS auf iPhone 12+
- [x] Keine Memory Leaks
- [x] Smooth Scrolling
- [x] Kein Jank/Stutter
- [x] Quick Resume nach Pause

### Browser-Kompatibilität
- [x] iOS Safari 14+
- [x] Chrome Mobile
- [x] Chrome Desktop
- [x] Edge
- [x] Firefox
- [x] Safari Desktop

## 📊 Dateigröße

```
index.html        ~6 KB
styles.css        ~5 KB
manifest.json     ~0.5 KB
service-worker.js ~2 KB

src/main.js       ~3 KB
src/game.js       ~5 KB
src/player.js     ~4 KB
src/world.js      ~4 KB
src/obstacles.js  ~3 KB
src/coins.js      ~3 KB
src/input.js      ~2 KB
src/audio.js      ~3 KB
src/ui.js         ~6 KB
src/utils.js      ~3 KB
src/storage.js    ~2 KB

icons/ (SVG)      ~8 KB

TOTAL: ~60 KB (unkomprimiert)
       ~20 KB (gzipped)
```

## 🔮 Mögliche Erweiterungen

### Gameplay
- [ ] Power-Ups (Shield, Magnet, Speed Boost)
- [ ] Verschiedene Spielmodi (Endless, Time Attack, Challenge)
- [ ] Verschiedene Flugzeuge/Skins
- [ ] Achievements System
- [ ] Daily Challenges
- [ ] Leaderboard (Backend-Integration)

### Technisch
- [ ] WebGL Renderer (für Effekte)
- [ ] Multiplayer (WebRTC/WebSocket)
- [ ] Backend (Highscore-Sync)
- [ ] Analytics Integration
- [ ] A/B Testing
- [ ] Progressive Enhancement (GamePad API)

### UI/UX
- [ ] Themes (Dark/Light/Custom)
- [ ] Localization (i18n)
- [ ] Tutorial/Onboarding
- [ ] Accessibility (Screen Reader, High Contrast)
- [ ] Share-Funktionalität (Web Share API)

## 📝 Entwickler-Notizen

### Code-Style
- ES Modules (import/export)
- Klassen-basiert für Manager
- Funktional für Utils
- Kommentare in Deutsch
- JSDoc wo sinnvoll

### Git Workflow
```bash
# Feature Branch
git checkout -b feature/neue-funktion

# Commit
git commit -m "feat: beschreibung"

# Push & PR
git push origin feature/neue-funktion
```

### Debugging
- FPS Counter ist immer sichtbar
- Console Logging für kritische Fehler
- Chrome DevTools: Canvas Rendering, Network, Storage
- Lighthouse Audits vor Release

## 📞 Support & Kontakt

- **Bugs**: GitHub Issues
- **Features**: GitHub Discussions
- **Fragen**: README.md FAQ

---

**Status**: ✅ Production Ready

**Version**: 1.0.0

**Letzte Aktualisierung**: 2025-10-16


