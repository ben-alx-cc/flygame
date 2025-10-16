# Changelog

Alle wichtigen Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/),
und dieses Projekt folgt [Semantic Versioning](https://semver.org/lang/de/).

## [1.0.0] - 2025-10-16

### Hinzugefügt
- 🎮 **Core Gameplay**
  - Side-Scrolling Mechanik mit kontinuierlichem Fortschritt
  - Physik-System (Gravitation, Boost, Drag)
  - Touch-Steuerung (iOS-optimiert)
  - Desktop-Steuerung (Keyboard/Maus)
  - Kollisionserkennung (AABB)
  - Score-System (Distanz + Münzen)

- 🌍 **Welt & Visuals**
  - Parallax-Background System (3-5 Layer)
  - Prozedurale Hindernisgenerierung
  - Münzen-System mit verschiedenen Formationen
  - Canvas 2D Rendering mit DPR-Support
  - Animierter Player mit Partikel-Effekten
  - Responsive Canvas (Auto-Resize)

- 🔊 **Audio & Haptik**
  - Web Audio API Integration
  - Prozedurale Sound-Generierung (Collect, Hit, Whoosh)
  - iOS-freundliche Audio-Initialisierung
  - Mute-Toggle mit Persistenz
  - Vibrations-API Support

- 🎨 **UI/UX**
  - Start Screen
  - Game HUD (Score, Coins, FPS, Controls)
  - Pause Overlay
  - Game Over Screen mit Highscore
  - Settings Modal (Lautstärke, Sensitivität, Grafik, Vibration)
  - "Add to Home Screen" Hinweis für iOS
  - Responsive Design (Mobile + Desktop)

- 📱 **PWA Features**
  - Service Worker (Offline-Caching)
  - Web App Manifest
  - Installierbarkeit (iOS, Android, Desktop)
  - Standalone Mode
  - App Icons (SVG + Generator für PNG)
  - Splash Screen
  - Theme Color Integration

- ⚡ **Performance**
  - Delta-Time basierte Animation
  - 60 FPS Target
  - Device Pixel Ratio Handling (max 2x)
  - Auto-Pause bei Tab-Wechsel
  - Object Pooling für Obstacles/Coins
  - Offscreen Culling
  - FPS Counter

- 💾 **Persistenz**
  - localStorage Integration
  - Highscore-Speicherung
  - Settings-Speicherung
  - Namespace für Keys (mini-flight-v1:*)

- 📚 **Dokumentation**
  - README.md mit vollständiger Anleitung
  - DEPLOYMENT.md mit Deployment-Guide
  - PROJECT-OVERVIEW.md mit Projektdetails
  - Icon-Generator (HTML + Python + Node.js)
  - .gitignore Konfiguration

### Technische Details
- **Vanilla JavaScript** (ES Modules, keine Dependencies)
- **HTML5 Canvas** 2D Rendering
- **Web Audio API** für Sounds
- **Service Worker** für Offline-Funktionalität
- **localStorage** für Datenpersistenz
- **SVG Icons** (mit PNG-Fallback)

### Browser-Support
- iOS Safari 14+
- Chrome Mobile/Desktop
- Edge
- Firefox
- Safari Desktop

### Dateigrößen
- **Gesamt (unkomprimiert)**: ~60 KB
- **Gesamt (gzipped)**: ~20 KB
- **Einzelne Module**: 2-6 KB

---

## Geplant für zukünftige Versionen

### [1.1.0] - Geplant
- [ ] Power-Ups System (Shield, Magnet, Speed Boost)
- [ ] Verschiedene Flugzeuge/Skins
- [ ] Achievements System
- [ ] Verbessertes Tutorial/Onboarding

### [1.2.0] - Geplant
- [ ] Backend-Integration (Highscore-Sync)
- [ ] Leaderboard
- [ ] Daily Challenges
- [ ] Social Sharing (Web Share API)

### [2.0.0] - Vision
- [ ] WebGL Renderer
- [ ] Multiplayer-Modus
- [ ] Level-Editor
- [ ] Verschiedene Spielmodi (Time Attack, Challenge)

---

**Legende**:
- `Added` für neue Features
- `Changed` für Änderungen an bestehenden Features
- `Deprecated` für Features, die bald entfernt werden
- `Removed` für entfernte Features
- `Fixed` für Bugfixes
- `Security` für Sicherheits-Updates


