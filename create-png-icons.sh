#!/bin/bash
# PNG Icon Generator mit ImageMagick (falls installiert)

ICONS_DIR="./icons"

# Prüfe ob ImageMagick installiert ist
if command -v convert &> /dev/null; then
    echo "ImageMagick gefunden - konvertiere SVG zu PNG..."
    
    convert "$ICONS_DIR/icon-192.svg" "$ICONS_DIR/icon-192.png"
    convert "$ICONS_DIR/icon-512.svg" "$ICONS_DIR/icon-512.png"
    convert "$ICONS_DIR/apple-touch-icon.svg" "$ICONS_DIR/apple-touch-icon.png"
    convert "$ICONS_DIR/splash-640x1136.svg" "$ICONS_DIR/splash-640x1136.png"
    
    echo "✅ PNG Icons erstellt!"
else
    echo "⚠️  ImageMagick nicht installiert."
    echo "Verwende generate-icons.html im Browser zum Erstellen der PNG-Icons."
    echo "Oder installiere ImageMagick: brew install imagemagick"
fi


