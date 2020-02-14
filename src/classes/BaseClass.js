/**
 * Base class
 */
class BaseClass {

    constructor() {
        this.MOVE_TYPE_NORMAL = 0;
        this.MOVE_TYPE_MOUNTED = 1;
        this.MOVE_TYPE_FLYING = 2;

        this.name = 'Base';

        this.health = 0;
        this.currentHealth = 0;
        this.attack = 0;
        this.magicAttack = 0;
        this.speed = 0;
        this.defense = 0;
        this.magicDefense = 0;
        this.moveRange = 0;

        this.moveType = this.MOVE_TYPE_NORMAL;

        this.frameWidth = 16;
        this.frameHeight = 16;
        this.spriteExtension = '.png'

        // Store sprite object
        this.sprite = null;

        // Position
        this.currentX = 0;
        this.currentY = 0;

        // Index
        this.index = -1;

        // Flag to indicate unit has finished action
        this.isFinished = false;
    }

    move(x, y) {
        this.currentX = x;
        this.currentY = y;
        x = Map.getMapValue(x, true);
        y = Map.getMapValue(y, true);
        this.sprite.setX(x);
        this.sprite.setY(y);
    }

    /**
     * Set unit position on map
     * @param {int} x [description]
     * @param {int} y [description]
     */
    setPosition(x, y) {
        this.currentX = x;
        this.currentY = y;
    }

    /**
     * Get unit position X
     * @return {int}
     */
    getX() {
        return this.currentX;
    }

    /**
     * Get unit position Y
     * @return {int}
     */
    getY() {
        return this.currentY;
    }

    /**
     * Check if this unit is enemy
     * @return {Boolean}
     */
    isEnemy() {
        if (this.index >= Constants.TILE_ENEMY_UNIT_START) {
            return true;
        }
        return false;
    }

    /**
     * Check if this unit is player's unit
     * @return {Boolean}
     */
    isPlayer() {
        if (this.index < Constants.TILE_ENEMY_UNIT_START) {
            return true;
        }
        return false;
    }

    /**
     * Check all available action for this unit
     * @param  {object} level current level
     * @return {object} best tile to move to
     */
    checkAvailableAction(level) {
        return Ai.checkWithinRange(level, this);
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
        this.createFinishedText();
    }

    /**
     * Load sprite into cache
     * @return {none}
     */
    loadAsset() {
        this.scene.load.spritesheet(
            this.className,
            this.spritePath + this.spriteFile + this.spriteExtension, {
                frameWidth: this.frameWidth,
                frameHeight: this.frameHeight
            });
    }

    /**
     * Check if unit is available to act
     * @return {Boolean}
     */
    isAvailable() {
        return !this.isFinished;
    }

    /**
     * Create "E" letter after unit has finished action
     * @return {none}
     */
    createFinishedText() {
        this.waitText = this.scene.add.text(Map.getMapValue(this.getX()), Map.getMapValue(this.getY()), 'E', {
            padding: {
                left: 10,
                top: 10
            }
        }).setVisible(false);
    }

    /**
     * Show "E" letter after unit has finished action
     * @return {none} [description]
     */
    setFinishedText() {
        this.waitText.setX(Map.getMapValue(this.getX()));
        this.waitText.setY(Map.getMapValue(this.getY()));
        this.waitText.setVisible(true);
    }

    /**
     * Finished turn
     * @return {none}
     */
    finishAction() {
        this.isFinished = true;
        this.setFinishedText();
    }

    /**
     * Start turn
     * @return {none}
     */
    startAction() {
        this.isFinished = false;
        this.waitText.setVisible(false);
    }

    /**
     * Remove sprite
     * @return {none}
     */
    destroy() {
        this.sprite.destroy();
    }

}