/**
 * Paladin class
 */
class Paladin extends BaseClass {

    constructor(scene) {
        super();
        this.spritePath = Config.ASSET_PATH + 'tilesets/'
        this.spriteFile = 'Toens_Medieval_v.1.0'
        this.standingAnimationKey = 'Paladin_stand'
        this.scene = scene;
        this.className = 'Paladin';
        this.health = 36;
        this.currentHealth = 36;
        this.attack = 15;
        this.magicAttack = 0;
        this.speed = 17;
        this.defense = 12;
        this.magicDefense = 5;
        this.moveRange = 7;

        this.allyTexture = 115;
        this.enemyTexture = 122;

        this.moveType = this.MOVE_TYPE_MOUNTED;
        this.loadSpritesheet();
    }

    /**
     * Draw sprite at specified location
     * @param  {int} x
     * @param  {int} y
     * @param  {int} texture
     * @return {none}
     */
    drawStanding(x, y, texture) {
        if (this.sprite) {
            this.sprite.destroy();
        }
        this.sprite = this.scene.add.sprite(x, y, this.className, texture).setScale(1.5);
    }

    /**
     * Load sprite into cache
     * @return {none}
     */
    loadSpritesheet() {
        this.scene.load.spritesheet(
            this.className,
            this.spritePath + this.spriteFile + this.spriteExtension, {
                frameWidth: this.frameWidth,
                frameHeight: this.frameHeight
            });
    }

    /**
     * Remove sprite
     * @return {none}
     */
    destroy() {
        this.sprite.destroy();
    }
}