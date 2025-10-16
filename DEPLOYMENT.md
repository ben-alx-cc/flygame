# 🚀 Deployment Guide - Sky Runner

## Schnellstart für Entwicklung

```bash
# Im Projekt-Verzeichnis
python3 -m http.server 8000

# Oder mit Node.js
npx http-server -p 8000
```

Dann öffne: http://localhost:8000

## GitHub Pages Deployment

### 1. Repository erstellen

```bash
git init
git add .
git commit -m "Initial commit: Sky Runner PWA Game"
git branch -M main
git remote add origin https://github.com/USERNAME/sky-runner.git
git push -u origin main
```

### 2. GitHub Pages aktivieren

1. Gehe zu Repository **Settings**
2. Navigiere zu **Pages** (linke Sidebar)
3. **Source**: Deploy from a branch
4. **Branch**: `main`
5. **Folder**: `/ (root)`
6. Klicke **Save**

### 3. Warten & Testen

- Deployment dauert 1-3 Minuten
- URL: `https://USERNAME.github.io/sky-runner/`
- Check Actions-Tab für Build-Status

## Andere Hosting-Optionen

### Netlify

1. Drag & Drop Projekt-Ordner auf netlify.com
2. Oder: `netlify deploy --prod`
3. Fertig!

### Vercel

```bash
npm i -g vercel
vercel
```

### Firebase Hosting

```bash
firebase init hosting
firebase deploy
```

### Cloudflare Pages

1. Repository verbinden
2. Build Command: (leer lassen)
3. Output Directory: `/`
4. Deploy!

## Pre-Deployment Checklist

- [ ] `manifest.webmanifest` korrekt konfiguriert
- [ ] Icons vorhanden (SVG oder PNG)
- [ ] Service Worker Pfade relativ
- [ ] localStorage Keys eindeutig
- [ ] Console Errors behoben
- [ ] Mobile Testing durchgeführt
- [ ] PWA Installierbarkeit geprüft

## Post-Deployment Testing

### Desktop

- [ ] Chrome: Installierbarkeit (Install-Icon in Adressleiste)
- [ ] Edge: PWA-Features
- [ ] Firefox: Basis-Funktionalität
- [ ] Safari: Gameplay

### Mobile

- [ ] iOS Safari: Add to Home Screen
- [ ] Android Chrome: Install Prompt
- [ ] Touch-Steuerung flüssig
- [ ] Audio nach erstem Tap
- [ ] Offline-Modus (Flugmodus)
- [ ] Fullscreen nach Install

## PWA Audit

```bash
# Lighthouse PWA Audit
npx lighthouse https://YOUR-URL.com --view

# Oder in Chrome DevTools:
# Lighthouse Tab → Progressive Web App → Generate Report
```

### Erwartete Scores

- **Performance**: 90+
- **Accessibility**: 90+
- **Best Practices**: 90+
- **SEO**: 90+
- **PWA**: 100 ✓

## Troubleshooting

### Service Worker registriert nicht

- HTTPS erforderlich (oder localhost)
- Cache leeren: DevTools → Application → Clear Storage
- Hard Reload: Cmd+Shift+R (Mac) / Ctrl+Shift+R (Windows)

### Icons werden nicht angezeigt

- Pfade in `manifest.webmanifest` prüfen
- Browser-Cache leeren
- PNG statt SVG nutzen (bessere Kompatibilität)

### Audio funktioniert nicht auf iOS

- Audio Context benötigt User-Gesture
- Erste Tap im Spiel initialisiert Audio
- Stummschalter am Gerät prüfen

### App nicht installierbar

- HTTPS erforderlich
- manifest.webmanifest erreichbar prüfen
- Service Worker aktiv
- Alle PWA-Kriterien erfüllt (Lighthouse)

## Performance-Optimierung

### Wenn < 60 FPS

1. Grafik-Setting auf "Niedrig" setzen
2. Device Pixel Ratio auf 1 limitieren (utils.js)
3. Weniger Partikel (player.js)
4. Obstacle-Density reduzieren

### Code-Minifizierung (Optional)

```bash
# Terser für JS
npx terser src/**/*.js -c -m -o dist/bundle.min.js

# csso für CSS
npx csso styles.css -o dist/styles.min.css
```

## Analytics (Optional)

### Google Analytics 4

Füge in `index.html` hinzu:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Plausible Analytics (Privacy-friendly)

```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

## Custom Domain

### GitHub Pages

1. Gehe zu Settings → Pages
2. Custom Domain: `skyrunner.com`
3. Erstelle CNAME bei Domain-Provider:
   ```
   CNAME: yourusername.github.io
   ```

### Netlify/Vercel

- Automatische Custom Domain Setup im Dashboard
- SSL/HTTPS automatisch konfiguriert

## Monitoring

- [UptimeRobot](https://uptimerobot.com) - Uptime Monitoring
- [PageSpeed Insights](https://pagespeed.web.dev) - Performance
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) - Automated Audits

---

**Happy Deploying! 🚀**


