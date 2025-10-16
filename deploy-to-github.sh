#!/bin/bash
# GitHub Deployment Script für Sky Runner

echo "🚀 Sky Runner - GitHub Deployment"
echo "=================================="
echo ""

# Farben
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Repository Name
REPO_NAME="sky-runner"

echo -e "${BLUE}Schritt 1: Git Repository initialisieren${NC}"
git init
git add .
git commit -m "Initial commit: Sky Runner - Mini Flugsimulator PWA

- Vollständiges Side-Scrolling Flugspiel
- PWA mit Offline-Support
- Touch & Desktop Steuerung
- 60 FPS Performance
- Vollständig dokumentiert"

echo ""
echo -e "${GREEN}✅ Git Repository erstellt${NC}"
echo ""

echo -e "${BLUE}Schritt 2: GitHub Repository erstellen${NC}"
echo ""
echo "Bitte öffnen Sie jetzt: ${GREEN}https://github.com/new${NC}"
echo ""
echo "Repository-Name eingeben: ${GREEN}${REPO_NAME}${NC}"
echo "Description: ${GREEN}Mini Flugsimulator - Side-Scrolling PWA Game${NC}"
echo "Public/Private: ${GREEN}Public${NC} (oder Private nach Wunsch)"
echo ""
echo -e "${RED}WICHTIG: Keine README, .gitignore oder License hinzufügen!${NC}"
echo "(Wir haben schon alles)"
echo ""
read -p "Drücken Sie ENTER wenn das Repository erstellt wurde..."

echo ""
echo -e "${BLUE}Schritt 3: Ihr GitHub Username${NC}"
read -p "Geben Sie Ihren GitHub Username ein: " GITHUB_USER

echo ""
echo -e "${BLUE}Schritt 4: Repository verbinden & pushen${NC}"

# Remote hinzufügen
git branch -M main
git remote add origin "https://github.com/${GITHUB_USER}/${REPO_NAME}.git"

# Push
echo ""
echo "Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ Erfolgreich auf GitHub hochgeladen!${NC}"
    echo ""
    echo "📍 Repository URL:"
    echo -e "${BLUE}https://github.com/${GITHUB_USER}/${REPO_NAME}${NC}"
    echo ""
    echo "🌐 GitHub Pages (wird in wenigen Minuten verfügbar sein):"
    echo -e "${BLUE}https://${GITHUB_USER}.github.io/${REPO_NAME}/${NC}"
    echo ""
    echo -e "${BLUE}Nächster Schritt: GitHub Pages aktivieren${NC}"
    echo "1. Gehe zu: https://github.com/${GITHUB_USER}/${REPO_NAME}/settings/pages"
    echo "2. Source: Deploy from a branch"
    echo "3. Branch: main"
    echo "4. Folder: / (root)"
    echo "5. Save"
    echo ""
    echo "Fertig! 🎉"
else
    echo ""
    echo -e "${RED}❌ Fehler beim Push${NC}"
    echo "Möglicherweise müssen Sie sich zuerst bei GitHub authentifizieren."
    echo ""
    echo "Alternative: GitHub CLI verwenden"
    echo "brew install gh"
    echo "gh auth login"
    echo "gh repo create ${REPO_NAME} --public --source=. --push"
fi

