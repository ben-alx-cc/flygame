# GitHub Upload - Manuelle Anleitung

## Schritt 1: Git initialisieren

```bash
cd /Users/bene/Desktop/mac\ juli\ 25/25\ webapp\ septem/hotroad

git init
git add .
git commit -m "Initial commit: Sky Runner PWA"
```

## Schritt 2: GitHub Repository erstellen

1. Gehe zu: **https://github.com/new**

2. Einstellungen:
   - **Repository name**: `sky-runner`
   - **Description**: `Mini Flugsimulator - Side-Scrolling PWA Game`
   - **Public** ✅
   - **WICHTIG**: ❌ Kein README, .gitignore oder License anhaken!

3. Klicke **"Create repository"**

## Schritt 3: Hochladen

Ersetze `IHR-USERNAME` mit Ihrem GitHub Username:

```bash
git branch -M main
git remote add origin https://github.com/IHR-USERNAME/sky-runner.git
git push -u origin main
```

## Schritt 4: GitHub Pages aktivieren

1. Gehe zu: `https://github.com/IHR-USERNAME/sky-runner/settings/pages`
2. **Source**: Deploy from a branch
3. **Branch**: `main`
4. **Folder**: `/ (root)`
5. Klicke **Save**

## Fertig! 🎉

Nach 1-2 Minuten ist Ihr Spiel verfügbar unter:

**https://IHR-USERNAME.github.io/sky-runner/**

---

## Bei Authentifizierungs-Problemen

Wenn Git nach Login fragt:

### Option 1: Personal Access Token
1. Gehe zu: https://github.com/settings/tokens
2. "Generate new token (classic)"
3. Scopes: `repo` anhaken
4. Token kopieren
5. Als Passwort beim `git push` verwenden

### Option 2: SSH verwenden
```bash
git remote set-url origin git@github.com:IHR-USERNAME/sky-runner.git
git push -u origin main
```

