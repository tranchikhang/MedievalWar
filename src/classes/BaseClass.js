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

}