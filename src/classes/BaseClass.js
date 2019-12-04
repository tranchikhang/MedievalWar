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

}