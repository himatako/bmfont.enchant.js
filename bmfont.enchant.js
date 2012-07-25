/**
 * bmfont.enchant.js
 * @version 0.1
 * @require enchant.js v0.4.3 or later
 * @require jkl-parsexml.js v0.22 or later
 * @author Hima  
 * @contact himatako@gmail.com
 *
 * @example
 * enchant.bmfont.createFont('score', 'res/font.fnt', game.assets['res/font_0.png']);
 * var bmLabel = new FontSprite('score', 100, 25, "100pts.");
 * bmLabel.x = 160;
 * bmLabel.y = 64;
 * bmLabel.opacity = 0.5;
 * scene.addChild(bmLabel);
 *
 **/

 /**
 * plugin namespace object
 */
enchant.bmfont = {};

 /**
 * Font dictionary
 */
enchant.bmfont.fonts = {};

/**
 * Create a font and add it to the font dictionary
 * @param fontName Font ID
 * @param xmlFile Font's metadata
 * @param surface Font's graphic
 */
enchant.bmfont.createFont = function(fontName, xmlFile, surface)
{
    if(enchant.bmfont.getFont(fontName) === undefined)
    {
        var font = new Font(fontName, xmlFile, surface);
        enchant.bmfont.fonts[fontName] = font;
    }
};

/**
 * Get a font object from the dictionary
 * @param fontName name of the font you want to retrieve
 */
enchant.bmfont.getFont = function (fontName) {
    return enchant.bmfont.fonts[fontName];
}

/**
 * @scope enchant.bmfont.Font
 */
enchant.bmfont.Font = enchant.Class.create({
    /**
     * Font class. Keep all the metadata about the font,
     * according to the xml file generated by BMFont
     * @constructs
     * @param fontName name of the font
     * @param xmlFile metadata file
     * @param surface font's graphic
     */
    initialize: function(fontName, xmlFile, surface){
        var xml = new JKL.ParseXML(xmlFile);
        var data = xml.parse();
        var characters = data.font.chars.char;

        this.fontName = fontName;
        this.charactersCount = characters.length;
        this.characters = {};

        // Create characters dictionary
        for (var i = characters.length - 1; i >= 0; i--) {
        	this.characters[characters[i].id] = characters[i];
        };
        this.fontTexture = surface;
    },
});

/**
 * @scope enchant.bmfont.FontSprite
 */
enchant.bmfont.FontSprite = enchant.Class.create(enchant.Sprite, {
    /**
     * Sprite for drawing bitmap font. Inherit from enchant's Sprite
     * class, and use surface to draw the font texture     
     * @constructs
     * @extends enchant.Sprite
     * @param font Can be either the font name or Font object
     * @param width The width of the sprite
     * @param height The height of the sprite
     * @param text Text to be drawn by this sprite
     */    
    initialize: function(font, width, height, text) {
        var game = enchant.Game.instance;
        if(typeof(font) === "string")
        {
            this.font = enchant.bmfont.getFont(font);
        }else
        {
            this.font = font;            
        }
        this._text = "";
        this._textWidth = 0;        
        enchant.Sprite.call(this, width, height);
        this.image = new Surface(width, height);
        this.text = text;
    },

    /**
     * Text to display.
     * @type {String}
     */
    text: {
        get: function() {
            return this._text;
        },
        set: function(text) {
            this._text = text;            
            this.draw(text);
        }
    },
    /**
     * Width of the text to be rendered.
     * @type {Number}
     */
    textWidth: {
        get: function(){
            return this._textWidth;
        }
    },

    /**
     * Draw text to the surface.
     * @param txt Text to be drawn on the surface
     */
    draw: function(txt) {
        var i, srcX, srcY, srcW, srcH, charCode, charPos;
        var srcOffsetY, srcOffsetX, xAdvance;
        var destX = 0;
        var game = enchant.Game.instance;

        this.image.clear();

        // Loop through each character and draw each character
        // onto the surface according to its metadata
        for(i=0; i<txt.length; i++) {
            // Retrieve font's metadata
            charCode = txt.charCodeAt(i);
            var characterData = this.font.characters[charCode.toString()];

            srcX = parseInt(characterData.x);
            srcY = parseInt(characterData.y);
            srcW = parseInt(characterData.width);
            srcH = parseInt(characterData.height);
            srcOffsetX = parseInt(characterData.xoffset);
            srcOffsetY = parseInt(characterData.yoffset);
            xAdvance = parseInt(characterData.xadvance);

            // Draw the character on the label's surface
            this.image.draw( this.font.fontTexture, 
                // src
                srcX, srcY, srcW, srcH,
                // dest
                destX + srcOffsetX, srcOffsetY, srcW, srcH);   
            // Move the position for drawing the next character
            destX += xAdvance;
            //console.log(xAdvance)
        }
        this._textWidth = destX;
        //console.log(this._textWidth);
    }
});