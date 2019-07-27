class ContextMenu {

    constructor(scene) {
        // Current scene
        this.scene = scene;

        // Menu action list
        this.actionListText = [lang['action.move'], lang['action.wait'], lang['action.attack']];
        this.actionListValue = [Constants.ACTION_MOVE, Constants.ACTION_WAIT, Constants.ACTION_ATTACK];

        // Graphical menu action list
        this.actionListMenu = [];
        // Width is 3 tiles, height is 1 tile
        this.menuWidth = Map.getMapValue(3);
        this.menuHeight = Map.getMapValue(1);
        this.menuOffsetX = Map.getMapValue(3);

        this.cursor = null;
        this.cursorGeometry = null;
        this.cursorIndex = 0;

        // Create list of possible action
        // For now, just load all the default action
        for (var i = 0; i < this.actionListText.length; i++) {
            var option = this.scene.add.text(0, 0 + Map.getMapValue(i), this.actionListText[i], {
                backgroundColor: '#4287f5',
                padding: {
                    left: 10,
                    top: 10
                }
            }).setVisible(false);
            // Set text box size
            option.setFixedSize(this.menuWidth, this.menuHeight);
            option.actionValue = this.actionListValue[i];
            this.actionListMenu.push(option);
        }

        this.cursor = this.scene.add.graphics({
            lineStyle: {
                width: 2,
                color: 0x00ff00
            },
            fillStyle: {
                color: 0xff0000
            }
        });
        this.cursorGeometry = new Phaser.Geom.Rectangle(0, 0, this.menuWidth, Constants.MAP_TILE_SIZE);
        this.cursor.clear();
        this.cursor.strokeRectShape(this.cursorGeometry).setVisible(false);
    }

    /**
     * Show the context menu
     * @param  {int} x selected position's
     * @param  {int} y selected position'y
     * @return {none}   [description]
     */
    show(x, y) {
        let isRightMenu = true;
        if (Map.getMapValue(x) + this.menuWidth + this.menuOffsetX>= Config.WindowWidth) {
            isRightMenu = false;
        }
        for (var i = 0; i < this.actionListMenu.length; i++) {
            // Default menu will show on the right
            // But if there is no space then show the menu on the left
            if (isRightMenu) {
                // -1 to fit with border
                this.actionListMenu[i].setX(Map.getMapValue(x) + this.menuWidth - 1);
            } else {
                // -1 to fit with border
                this.actionListMenu[i].setX(Map.getMapValue(x) - this.menuWidth - this.menuOffsetX - 1);
            }
            this.actionListMenu[i].setY(Map.getMapValue(y) + Map.getMapValue(i) - 1);
            this.actionListMenu[i].setVisible(true);
        }
        this.cursor.setVisible(true);
        if (isRightMenu) {
            this.cursor.setX(Map.getMapValue(x) + this.menuOffsetX);
        } else {
            this.cursor.setX(Map.getMapValue(x) - this.menuWidth - this.menuOffsetX);
        }
        this.cursor.setY(Map.getMapValue(y));
    }

    /**
     * Hide the context menu
     * @return {none}
     */
    hide() {
        for (var i = 0; i < this.actionListMenu.length; i++) {
            this.actionListMenu[i].setVisible(false);
        }
        this.cursor.setVisible(false);
        this.cursor.setY(0);
        this.cursorIndex = 0;
    }

    /**
     * move the cursor up one item
     * @return {none}
     */
    moveCursorUp() {
        if (this.cursorIndex > 0) {
            this.cursorIndex -= 1;
            this.cursor.setY(this.cursor.y - Constants.MAP_TILE_SIZE);
        }
    }

    /**
     * move the cursor down one item
     * @return {none}
     */
    moveCursorDown() {
        if (this.cursorIndex < this.actionListText.length - 1) {
            this.cursorIndex += 1;
            this.cursor.setY(this.cursor.y + Constants.MAP_TILE_SIZE);
        }
    }

    /**
     * Return action selected
     * @return {string} action
     */
    select() {
        return this.actionListValue[this.cursorIndex];
    }
}