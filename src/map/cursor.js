/**
 * Cursor on map
 */
class Cursor {

    constructor(scene, level) {
        this.scene = scene;
        this.level = level;
        this.scene.load.image('cursor', Config.ASSET_PATH + 'cursor.png');

        // currentX and currentY are used to store postion on grid
        this.currentX = 0;
        this.currentY = 0;
        // used for animation, temporary disabled
        // this.scene.load.image('cursor', 'assets/small.png');

        // enabled flag
        this.isEnabled = true;
    }

    /**
     * load cursor and set on map
     * @param  {int} x horizontal axis position
     * @param  {int} y vertical axis position
     * @return {none}
     */
    load(x, y) {
        this.cursor = this.scene.add.image(0, 0, 'cursor');
        this.currentX = x;
        this.currentY = y;
        var x = Map.getMapValue(x);
        var y = Map.getMapValue(y);
        this.cursor.setX(x);
        this.cursor.setY(y);
    }

    /**
     * Check if the next cursor position is at map border or not
     * @param  {int} x new x
     * @param  {int} y new y
     * @return {Boolean}
     */
    isOutOfMap(x, y) {
        if (x < 0 || x >= this.level.getWidth() || y < 0 || y >= this.level.getHeight()) {
            return true;
        }
        return false;
    }


    /**
     * move cursor up
     * @return {none}
     */
    moveUp() {
        if (!this.isEnabled) {
            return;
        }
        let y = this.currentY - 1;
        if (this.isOutOfMap(this.currentX, y)) {
            return;
        }
        this.currentY -= 1;
        y = Map.getMapValue(this.currentY);
        this.cursor.setY(y);
    }

    /**
     * move cursor down
     * @return {none}
     */
    moveDown() {
        if (!this.isEnabled) {
            return;
        }
        let y = this.currentY + 1;
        if (this.isOutOfMap(this.currentX, y)) {
            return;
        }
        this.currentY += 1;
        y = Map.getMapValue(this.currentY);
        this.cursor.setY(y);
    }

    /**
     * move cursor left
     * @return {none}
     */
    moveLeft() {
        if (!this.isEnabled) {
            return;
        }
        let x = this.currentX - 1;
        if (this.isOutOfMap(x, this.currentY)) {
            return;
        }
        this.currentX -= 1;
        x = Map.getMapValue(this.currentX);
        this.cursor.setX(x);
    }

    /**
     * move cursor right
     * @return {none}
     */
    moveRight() {
        if (!this.isEnabled) {
            return;
        }
        let x = this.currentX + 1;
        if (this.isOutOfMap(x, this.currentY)) {
            return;
        }
        this.currentX += 1;
        x = Map.getMapValue(this.currentX);
        this.cursor.setX(x);
    }

    /**
     * Get unit position Y
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
     * Enable the cursor
     * @return {none}
     */
    enable() {
        this.isEnabled = true;
    }

    /**
     * Disable the cursor
     * @return {none}
     */
    disable() {
        this.isEnabled = false;
    }
}