#!/usr/bin/env node
/**
 * Icon Generator Script
 * Generiert Icons mit Node Canvas (falls verfügbar) oder als Fallback
 */

const fs = require('fs');
const path = require('path');

// Einfache SVG-Icons als Fallback (werden zu PNG wenn möglich)
function generateSVGIcon(size) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#4A90E2;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="${size}" height="${size}" fill="url(#bg)"/>
  
  <!-- Plane -->
  <g transform="translate(${size/2}, ${size/2})">
    <!-- Body -->
    <ellipse cx="0" cy="0" rx="${size*0.2}" ry="${size*0.13}" fill="#FF6B6B"/>
    
    <!-- Wing -->
    <rect x="${-size*0.13}" y="${-size*0.18}" width="${size*0.23}" height="${size*0.08}" fill="#FF8787"/>
    
    <!-- Cockpit -->
    <circle cx="${size*0.08}" cy="${-size*0.04}" r="${size*0.05}" fill="white"/>
    
    <!-- Propeller -->
    <line x1="${size*0.21}" y1="${-size*0.08}" x2="${size*0.21}" y2="${size*0.08}" 
          stroke="white" stroke-width="${size*0.02}" stroke-linecap="round"/>
    
    <!-- Trail -->
    <circle cx="${-size*0.26}" cy="0" r="${size*0.04}" fill="rgba(255,255,255,0.6)"/>
    <circle cx="${-size*0.34}" cy="0" r="${size*0.03}" fill="rgba(255,255,255,0.5)"/>
    <circle cx="${-size*0.42}" cy="0" r="${size*0.02}" fill="rgba(255,255,255,0.4)"/>
  </g>
</svg>`;
}

function generateSplashSVG() {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="640" height="1136" viewBox="0 0 640 1136" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="splashBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#E0F6FF;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <rect width="640" height="1136" fill="url(#splashBg)"/>
  
  <text x="320" y="500" font-family="-apple-system, BlinkMacSystemFont, sans-serif" 
        font-size="80" font-weight="bold" fill="white" text-anchor="middle">
    🛩️ Sky Runner
  </text>
  
  <text x="320" y="600" font-family="-apple-system, BlinkMacSystemFont, sans-serif" 
        font-size="40" fill="rgba(255,255,255,0.8)" text-anchor="middle">
    Mini Flugsimulator
  </text>
</svg>`;
}

// Erstelle Icons-Ordner
const iconsDir = path.join(__dirname, 'icons');
if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir);
}

// Generiere SVG-Icons
console.log('Generiere Icons...');

fs.writeFileSync(path.join(iconsDir, 'icon-192.svg'), generateSVGIcon(192));
fs.writeFileSync(path.join(iconsDir, 'icon-512.svg'), generateSVGIcon(512));
fs.writeFileSync(path.join(iconsDir, 'apple-touch-icon.svg'), generateSVGIcon(180));
fs.writeFileSync(path.join(iconsDir, 'splash-640x1136.svg'), generateSplashSVG());

console.log('✅ SVG Icons erstellt in ./icons/');
console.log('');
console.log('Für PNG-Icons:');
console.log('1. Öffne generate-icons.html im Browser');
console.log('2. Lade die generierten PNGs herunter');
console.log('3. Verschiebe sie in den icons/ Ordner');
console.log('');
console.log('Alternativ: SVG-Icons funktionieren auch (update manifest.webmanifest auf .svg)');


