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

        // Store sprite object
        this.sprite = null;

        // Position
        this.currentX = 0;
        this.currentY = 0;

        // Index
        this.index = -1;

        // Flag to indicate unit has moved
        this.isMoved = false;

        // Flag to indicate unit has finished action
        this.isFinished = false;
    }

    /**
     * Move unit to target position
     * @param  {int} x
     * @param  {int} y
     * @return {none}
     */
    move(x, y) {
        // Get shortest path
        let path = PathFinding.findShortestPath(this.scene.currentLevel.getMapObject(), {
            'x': this.currentX,
            'y': this.currentY
        }, {
            'x': x,
            'y': y
        });
        this.setMoveStatus(true);
        // Move the unit at each step
        // Exclude the first step since it's the current position
        let i = 1;
        return new Promise(resolve => {
            let timer = this.scene.time.addEvent({
                delay: 100,
                callback: function() {
                    this.setPosition(path[i].x, path[i].y);
                    this.sprite.setX(Map.getMapValue(path[i].x, true));
                    this.sprite.setY(Map.getMapValue(path[i].y, true));
                    i++;
                    if (i == path.length) {
                        resolve();
                    }
                },
                callbackScope: this,
                repeat: path.length - 2
            });
        });
    }

    /**
     * Set unit position on map
     * @param {int} x
     * @param {int} y
     */
    setPosition(x, y) {
        this.currentX = x;
        this.currentY = y;
    }

    /**
     * Set unit moving status
     * @param {Boolean} isMoved at init: false, set to True after user selected "Wait"
     */
    setMoveStatus(isMoved) {
        this.isMoved = isMoved;
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
            this.destroySprite();
        }
        this.sprite = this.scene.add.sprite(x, y, this.className, texture).setScale(1.5);
        this.createFinishedText();
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
     * @return {none}
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
        // Unit completed an action
        // reset moving status to false
        this.setMoveStatus(false);
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
     * Destroy unit
     * @return {none}
     */
    destroy() {
        this.sprite.destroy();
    }

    /**
     * Check surrounding if there is any enemy to attack
     * @return {array} array of enemies
     */
    checkAttackable() {
        let s = PathFinding.surroundingTile;
        let lstEnemies = [];
        for (var j = 0; j < s.length; j++) {
            let currentX = this.getX() + s[j].x;
            let currentY = this.getY() + s[j].y;
            let enemy = this.scene.currentLevel.getUnit(currentX, currentY);
            if (enemy !== null && enemy.isEnemy()) {
                lstEnemies.push(enemy);
            }
        }
        return lstEnemies;
    }

    /**
     * Check if unit can move (not blocked from 4 sides)
     * TODO
     * @return {boolean}
     */
    checkMoveable() {
        return true;
    }

    /**
     * Update unit health after damaged
     * @param  {int} damage
     * @return {none}
     */
    onDamage(damage) {
        this.currentHealth -= damage;
    }

    /**
     * Check if unit is dead
     * @return {Boolean} is dead or not
     */
    isDead() {
        return this.currentHealth <= 0;
    }

}