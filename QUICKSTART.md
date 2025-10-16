# 🚀 Quick Start Guide

## 30 Sekunden zum Spielen

```bash
# 1. In Projekt-Ordner navigieren
cd hotroad

# 2. Server starten
python3 -m http.server 8000

# 3. Browser öffnen
open http://localhost:8000
```

**Das war's!** 🎮

---

## Alternative Server

### Node.js
```bash
npx http-server -p 8000
```

### PHP
```bash
php -S localhost:8000
```

### VS Code
Install "Live Server" Extension → Rechtsklick auf index.html → "Open with Live Server"

---

## Erste Schritte im Spiel

1. **Start**: Klicke "Tap to Start"
2. **Steuerung**: 
   - **Mobile**: Touch halten = Steigen
   - **Desktop**: Space oder Maus halten = Steigen
3. **Ziel**: Hindernisse ausweichen, Münzen sammeln
4. **Score**: Distanz + Münzen = Punkte

---

## Einstellungen anpassen

1. Im Spiel: Pause-Button → Einstellungen
2. Oder im Game Over Screen: Einstellungen

**Empfohlen**:
- Lautstärke: 70%
- Boost-Stärke: 100%
- Grafik: Normal (auf langsameren Geräten: Niedrig)

---

## Als App installieren (iOS)

1. Öffne in **Safari**
2. Tap auf **Teilen**-Icon
3. Wähle **"Zum Home-Bildschirm"**
4. Fertig! App startet jetzt im Vollbild

---

## Deployment in 2 Minuten

### GitHub Pages

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/sky-runner.git
git push -u origin main
```

Dann: Settings → Pages → Deploy from `main` branch

**URL**: `https://USERNAME.github.io/sky-runner/`

### Netlify (noch schneller!)

```bash
# Drag & Drop auf netlify.com
# Oder:
npx netlify-cli deploy --prod
```

---

## Troubleshooting

### Kein Sound?
- Erstes Tap im Spiel aktiviert Audio
- Lautstärke in Einstellungen prüfen
- iOS: Stummschalter prüfen

### Läuft nicht flüssig?
- Grafik auf "Niedrig" setzen
- Andere Browser-Tabs schließen
- FPS-Counter unten links beobachten

### Service Worker Fehler?
- Nur HTTPS oder localhost
- Cache leeren: Cmd+Shift+R

---

## Nächste Schritte

- 📖 Vollständige Doku: [README.md](README.md)
- 🚀 Deployment-Guide: [DEPLOYMENT.md](DEPLOYMENT.md)
- 📋 Projekt-Details: [PROJECT-OVERVIEW.md](PROJECT-OVERVIEW.md)

---

**Viel Spaß! ✈️**


