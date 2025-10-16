# 🛩️ Sky Runner - Mini Flugsimulator

Ein leichtgewichtiger, arcadiger Side-Scrolling Flugsimulator als Progressive Web App (PWA). Entwickelt mit Vanilla JavaScript, HTML5 Canvas und optimiert für iOS Safari.

![Sky Runner](icons/icon-512.svg)

## 🎮 Features

- **Arcade-Gameplay**: Side-Scrolling mit flüssiger Physik, inspiriert von Flappy Bird und Mario
- **Parallax-Background**: Mehrschichtige Hintergrundebenen für Tiefenwirkung
- **Prozedurale Levelgenerierung**: Endlose, zufällig generierte Hindernisse und Münzen
- **Touch & Desktop**: Optimiert für Touch-Steuerung (iOS), funktioniert auch mit Tastatur/Maus
- **Audio & Haptik**: Web Audio API für Sound-Effekte, Vibrationsfeedback
- **Highscore & Settings**: Persistente Speicherung mit localStorage
- **Offline-fähig**: Vollständig spielbar ohne Internetverbindung (Service Worker)
- **Performance**: Zielt auf 60 FPS auch auf mobilen Geräten

## 🚀 Schnellstart

### Lokal ausführen

1. **Repository klonen oder herunterladen**

2. **Lokalen Server starten** (wegen ES Modules erforderlich)

   ```bash
   # Python 3
   python3 -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (mit http-server)
   npx http-server -p 8000
   
   # PHP
   php -S localhost:8000
   ```

3. **Im Browser öffnen**
   
   Navigiere zu: `http://localhost:8000`

4. **Spielen!** 🎮

### Steuerung

- **Touch (Mobile)**: Halten = Steigflug, Loslassen = Fallen
- **Desktop**: Space oder Linke Maustaste gedrückt halten
- **Pause**: Pause-Button oben rechts
- **Sound**: Lautstärke-Icon zum An/Ausschalten

## 📱 Als PWA installieren (iOS)

### iPhone/iPad (Safari)

1. Öffne die App in Safari
2. Tippe auf das **Teilen**-Icon (Quadrat mit Pfeil nach oben)
3. Scrolle runter und wähle **"Zum Home-Bildschirm"**
4. Tippe auf **"Hinzufügen"**
5. Die App erscheint als Icon auf dem Home-Bildschirm
6. Starte die App vom Home-Bildschirm - sie läuft jetzt im Vollbild ohne Browser-UI!

### Android (Chrome)

1. Öffne die App in Chrome
2. Tippe auf die drei Punkte (Menü)
3. Wähle **"App installieren"** oder **"Zum Startbildschirm hinzufügen"**
4. Bestätige die Installation

### Desktop (Chrome/Edge)

1. Öffne die App im Browser
2. Klicke auf das **Install**-Icon in der Adressleiste
3. Oder: Menü → "App installieren"

## 🌐 Deployment (GitHub Pages)

1. **Repository auf GitHub pushen**

   ```bash
   git init
   git add .
   git commit -m "Initial commit: Sky Runner PWA"
   git branch -M main
   git remote add origin https://github.com/DEIN-USERNAME/sky-runner.git
   git push -u origin main
   ```

2. **GitHub Pages aktivieren**
   
   - Gehe zu Repository Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `main` / Folder: `/ (root)`
   - Speichern

3. **Zugreifen**
   
   Nach wenigen Minuten ist die App verfügbar unter:
   `https://DEIN-USERNAME.github.io/sky-runner/`

### Wichtig für Deployment

- Alle Pfade sind bereits relativ → funktioniert out-of-the-box
- Service Worker registriert sich nur auf Production (nicht localhost)
- HTTPS ist für PWA-Features erforderlich (GitHub Pages liefert automatisch HTTPS)

## 🎨 Icons generieren (Optional)

Die App verwendet standardmäßig SVG-Icons. Für PNG-Icons:

### Methode 1: Browser (empfohlen)

1. Öffne `generate-icons.html` im Browser
2. Klicke auf die Download-Buttons
3. Verschiebe die PNGs in den `icons/` Ordner
4. Update `manifest.webmanifest` und `index.html` auf `.png` statt `.svg`

### Methode 2: ImageMagick

```bash
brew install imagemagick  # macOS
./create-png-icons.sh
```

### Methode 3: Python/Pillow

```bash
pip3 install Pillow
python3 create-icons.py
```

## 🛠️ Projektstruktur

```
sky-runner/
├── index.html              # Haupt-HTML
├── styles.css              # Styling
├── manifest.webmanifest    # PWA Manifest
├── service-worker.js       # Offline-Funktionalität
├── src/
│   ├── main.js            # Entry Point
│   ├── game.js            # Game Loop & State Machine
│   ├── player.js          # Spieler-Physik
│   ├── world.js           # Parallax & Scrolling
│   ├── obstacles.js       # Hindernisse
│   ├── coins.js           # Münzen
│   ├── input.js           # Touch/Keyboard
│   ├── audio.js           # Sound System
│   ├── ui.js              # UI Management
│   ├── utils.js           # Hilfsfunktionen
│   └── storage.js         # localStorage
├── icons/
│   ├── icon-192.svg
│   ├── icon-512.svg
│   ├── apple-touch-icon.svg
│   └── splash-640x1136.svg
└── README.md
```

## ⚙️ Einstellungen

Im Spiel anpassbar:

- **Lautstärke**: 0-100%
- **Boost-Stärke**: Steuerempfindlichkeit
- **Grafik**: Normal/Niedrig (weniger Parallax-Layer für bessere Performance)
- **Vibration**: An/Aus (falls vom Gerät unterstützt)

Alle Einstellungen werden lokal gespeichert.

## 🧪 Technische Details

### Technologie-Stack

- **Vanilla JavaScript** (ES Modules)
- **HTML5 Canvas** (2D Rendering)
- **Web Audio API** (Sounds)
- **Service Worker** (Offline/Caching)
- **localStorage** (Persistenz)
- **Vibration API** (Haptisches Feedback)

### Performance-Optimierungen

- Delta-Time basierte Animation
- Device Pixel Ratio Handling (max 2x für mobile)
- Object Pooling für Coins/Obstacles
- Offscreen-Culling
- Auto-Pause bei Tab-Wechsel
- GC-freundliches Update-Pattern

### iOS-Spezifika

- Passive Touch-Listener
- Audio-Context nach User-Interaction
- Viewport-Meta für stabiles Layout
- PWA-Meta-Tags für Standalone-Mode
- Touch-Callout deaktiviert

## 🎯 Gameplay-Mechaniken

- **Gravitation**: 1400 px/s²
- **Boost-Impuls**: -520 px/s
- **Base-Speed**: 220 px/s (steigt mit Zeit)
- **Score**: Distanz/10 + Münzen×10
- **Hindernisse**: Mind. 1.2s Reaktionszeit
- **Gap-Größe**: 160-220px (wird kleiner mit Schwierigkeit)

## 🐛 Troubleshooting

### Service Worker lädt nicht

- Service Worker funktioniert nur über HTTPS oder localhost
- Bei GitHub Pages: Warte 1-2 Minuten nach Deployment
- Cache leeren: DevTools → Application → Clear Storage

### Kein Sound auf iOS

- Audio benötigt User-Interaction (erstes Tap)
- Prüfe ob Stumm-Schalter am Gerät aktiv ist
- In den Einstellungen Lautstärke prüfen

### Performance-Probleme

- Grafik-Setting auf "Niedrig" setzen
- Browser-Tab im Vordergrund halten
- Andere Apps/Tabs schließen
- FPS-Counter unten links beobachten

### Icons werden nicht angezeigt

- SVG-Icons sollten überall funktionieren
- Für ältere Browser: PNG-Icons generieren (siehe oben)
- Cache leeren und neu laden

## 📄 Lizenz

Dieses Projekt ist frei verfügbar für persönliche und kommerzielle Nutzung.

## 🙏 Credits

Entwickelt als minimalistisches Beispiel für ein Production-Ready PWA Game.

---

**Viel Spaß beim Fliegen! ✈️**

Fragen oder Feedback? Öffne ein Issue auf GitHub.


