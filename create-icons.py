#!/usr/bin/env python3
"""
Icon Generator mit PIL/Pillow
"""

try:
    from PIL import Image, ImageDraw, ImageFont
    import os
    
    def create_icon(size, filename):
        # Erstelle Image mit Gradient-ähnlicher Farbe
        img = Image.new('RGB', (size, size), color='#87CEEB')
        draw = ImageDraw.Draw(img)
        
        # Background Gradient (vereinfacht)
        for y in range(size):
            color_value = int(135 + (y / size) * (74 - 135))  # Von 87CEEB zu 4A90E2
            draw.line([(0, y), (size, y)], fill=(color_value, color_value + 50, 235))
        
        # Flugzeug (vereinfacht)
        center_x, center_y = size // 2, size // 2
        scale = size / 192
        
        # Body (Ellipse)
        body_rx = int(40 * scale)
        body_ry = int(25 * scale)
        draw.ellipse([
            center_x - body_rx, center_y - body_ry,
            center_x + body_rx, center_y + body_ry
        ], fill='#FF6B6B')
        
        # Wing
        wing_w = int(45 * scale)
        wing_h = int(15 * scale)
        draw.rectangle([
            center_x - int(25 * scale), center_y - int(35 * scale),
            center_x + int(20 * scale), center_y - int(20 * scale)
        ], fill='#FF8787')
        
        # Cockpit
        cockpit_r = int(10 * scale)
        draw.ellipse([
            center_x + int(15 * scale) - cockpit_r, center_y - int(8 * scale) - cockpit_r,
            center_x + int(15 * scale) + cockpit_r, center_y - int(8 * scale) + cockpit_r
        ], fill='white')
        
        # Save
        icons_dir = 'icons'
        os.makedirs(icons_dir, exist_ok=True)
        img.save(os.path.join(icons_dir, filename), 'PNG')
        print(f'✅ {filename} erstellt')
    
    def create_splash():
        img = Image.new('RGB', (640, 1136), color='#87CEEB')
        draw = ImageDraw.Draw(img)
        
        # Gradient
        for y in range(1136):
            r = int(135 + (y / 1136) * (224 - 135))
            g = int(206 + (y / 1136) * (246 - 206))
            b = int(235 + (y / 1136) * (255 - 235))
            draw.line([(0, y), (640, y)], fill=(r, g, b))
        
        # Text (vereinfacht, da Font schwierig)
        try:
            # Versuche System-Font
            font_large = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 80)
            font_small = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 40)
        except:
            font_large = ImageFont.load_default()
            font_small = ImageFont.load_default()
        
        text1 = "Sky Runner"
        text2 = "Mini Flugsimulator"
        
        # Zentrieren
        bbox1 = draw.textbbox((0, 0), text1, font=font_large)
        bbox2 = draw.textbbox((0, 0), text2, font=font_small)
        
        x1 = (640 - (bbox1[2] - bbox1[0])) // 2
        x2 = (640 - (bbox2[2] - bbox2[0])) // 2
        
        draw.text((x1, 450), text1, fill='white', font=font_large)
        draw.text((x2, 550), text2, fill='rgba(255,255,255,0.8)', font=font_small)
        
        img.save('icons/splash-640x1136.png', 'PNG')
        print('✅ splash-640x1136.png erstellt')
    
    # Generiere Icons
    print('Generiere PNG Icons mit PIL/Pillow...')
    create_icon(192, 'icon-192.png')
    create_icon(512, 'icon-512.png')
    create_icon(180, 'apple-touch-icon.png')
    create_splash()
    print('\n✅ Alle PNG Icons erstellt!')
    
except ImportError:
    print('⚠️  PIL/Pillow nicht installiert.')
    print('Installiere mit: pip3 install Pillow')
    print('Oder verwende generate-icons.html im Browser.')


