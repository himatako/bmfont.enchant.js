BMFont plugin for enchant.js
========================
bmfont.enchant.js is a plugin for [enchant.js][1] that lets you use bitmap font 
generated from [AngelCode's BMFont][2] easily.

How to use bmfont.enchant.js
---------------------------
1. Download [AngelCode's BMFont][2]

2. Set the export setting to output XML file

3. Create a font, and you will get font_name.fnt and font_name_0.png, put these files in your game folder

4. Include bmfont.enchant.js into your HTML file.

5. To use a font, you have to register a font first. The following code will register the font under the name 'score'
<code>
    enchant.bmfont.createFont('score', 'res/font.fnt', game.assets['res/font_0.png']);
</code>

6. Create an instance of a FontSprite class to use the created bitmap font.
```javascript
var bmLabel = new FontSprite('score', 100, 25, "100pts.");
bmLabel.x = 160;
bmLabel.y = 64;
bmLabel.opacity = 0.5;
scene.addChild(bmLabel);
```

[1]:http://enchantjs.com "enchant.js"
[2]:http://www.angelcode.com/products/bmfont/ "AngelCode's BMFont"