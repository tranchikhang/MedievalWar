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
        var x = Map.getMapValue(x, true);
        var y = Map.getMapValue(y, true);
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
        if (x == -1 || x == this.level.getWidth() || y == -1 || y == this.level.getHeight()) {
            return true;
        }
        return false;
    }

    /**
     * Move cursor up
     * @return {none}
     */
    moveUp() {
        if (!this.isEnabled) {
            return;
        }
        // New position
        let y = this.currentY - 1;
        // Check if new position is out of map
        if (this.isOutOfMap(this.currentX, y)) {
            return;
        }
        // If new position is at map border, then no need to move the camera
        if (0 < y && y < this.level.getHeight() - 1) {
            if (Map.getMapValue(y) == (this.scene.camera.worldView.top)) {
                // Move viewport up
                this.scene.camera.scrollY = this.scene.camera.scrollY - Map.getMapValue(1);
            }
        }
        this.currentY -= 1;
        y = Map.getMapValue(this.currentY, true);
        this.cursor.setY(y);
    }

    /**
     * Move cursor down
     * @return {none}
     */
    moveDown() {
        if (!this.isEnabled) {
            return;
        }
        // New position
        let y = this.currentY + 1;
        // Check if new position is out of map
        if (this.isOutOfMap(this.currentX, y)) {
            return;
        }
        // If new position is at map border, then no need to move the camera
        if (0 < y && y < this.level.getHeight() - 1) {
            if (Map.getMapValue(y) == (this.scene.camera.worldView.bottom - Map.getMapValue(1))) {
                // Move viewport down
                this.scene.camera.scrollY = this.scene.camera.scrollY + Map.getMapValue(1);
            }
        }
        this.currentY += 1;
        y = Map.getMapValue(this.currentY, true);
        this.cursor.setY(y);
    }

    /**
     * Move cursor left
     * @return {none}
     */
    moveLeft() {
        if (!this.isEnabled) {
            return;
        }
        // New position
        let x = this.currentX - 1;
        // Check if new position is out of map
        if (this.isOutOfMap(x, this.currentY)) {
            return;
        }
        // If new position is at map border, then no need to move the camera
        if (0 < x && x < this.level.getWidth() - 1) {
            if (Map.getMapValue(x) == (this.scene.camera.worldView.left)) {
                // Move viewport left
                this.scene.camera.scrollX = this.scene.camera.scrollX - Map.getMapValue(1);
            }
        }
        this.currentX -= 1;
        x = Map.getMapValue(this.currentX, true);
        this.cursor.setX(x);
    }

    /**
     * Move cursor right
     * @return {none}
     */
    moveRight() {
        if (!this.isEnabled) {
            return;
        }
        // New position
        let x = this.currentX + 1;
        // Check if new position is out of map
        if (this.isOutOfMap(x, this.currentY)) {
            return;
        }
        // If new position is at map border, then no need to move the camera
        if (0 < x && x < this.level.getWidth() - 1) {
            // Move viewport right
            if (Map.getMapValue(x) == (this.scene.camera.worldView.right - Map.getMapValue(1))) {
                this.scene.camera.scrollX = this.scene.camera.scrollX + Map.getMapValue(1);
            }
        }
        this.currentX += 1;
        x = Map.getMapValue(this.currentX, true);
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