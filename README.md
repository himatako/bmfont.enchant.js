BMFont plugin for enchant.js
========================
bmfont.enchant.js is a plugin for [enchant.js][1] that lets you use bitmap font 
generated from [AngelCode's BMFont][2] easily.

How to create a bitmap font
---------------------------
1. Download [AngelCode's BMFont][2]

2. Set the export setting to output XML file

3. Create a font, and you will get font_name.fnt and font_name_0.png, put these files in your game folder

4. To use a font, you have to register a font first. The following code will register the font under the name 'score'
<code>
    enchant.bmfont.createFont('score', 'res/font.fnt', game.assets['res/font_0.png']);
</code>

5. Create an instance of a FontSprite class to use the created bitmap font.
<code>
    var bmLabel = new FontSprite('score', 100, 25, "100pts.");<br/>
    bmLabel.x = 160;<br/>
    bmLabel.y = 64;<br/>
    bmLabel.opacity = 0.5;<br/>
    scene.addChild(bmLabel);<br/>
</code>
