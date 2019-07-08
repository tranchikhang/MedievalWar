class ContextMenu {

    constructor(scene) {
        // Current scene
        this.scene = scene;
        this.positionX = Constants.MAP_TILE_SIZE * 3;
        this.positionY = 0;

        // Menu action list
        this.ACTION_MOVE = 'Move'
        this.ACTION_WAIT = 'Wait'
        this.actionListText = [Constants.ACTION_MOVE, Constants.ACTION_WAIT];

        // Graphical menu action list
        this.actionListMenu = [];
        this.width = Constants.MAP_TILE_SIZE * 3;
        this.height = Constants.MAP_TILE_SIZE;

        this.cursor = null;
        this.cursorGeometry = null;
        this.cursorIndex = 0;

        // Create list of possible action
        // For now, just load all the default action
        for (var i = 0; i < this.actionListText.length; i++) {
            var option = this.scene.add.text(this.positionX, this.positionY + Constants.MAP_TILE_SIZE * i, this.actionListText[i], {
                backgroundColor: 'rgb(66, 135, 245)',
                padding: {
                    left: 10,
                    top: 10
                }
            }).setVisible(false);
            // Set text box size
            option.setFixedSize(this.width, this.height);
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
        this.cursorGeometry = new Phaser.Geom.Rectangle(this.positionX, this.positionY, this.width, Constants.MAP_TILE_SIZE);
        this.cursor.clear();
        this.cursor.strokeRectShape(this.cursorGeometry).setVisible(false);
    }

    /**
     * Show the context menu
     * @return {none}
     */
    show(x, y) {
        // -1 to fit with border
        for (var i = 0; i < this.actionListMenu.length; i++) {
            this.actionListMenu[i].setX(x * Constants.MAP_TILE_SIZE + this.width - 1);
            this.actionListMenu[i].setY(y * Constants.MAP_TILE_SIZE + i * Constants.MAP_TILE_SIZE - 1);
            this.actionListMenu[i].setVisible(true);
        }
        this.cursor.setVisible(true);
        this.cursor.setX(Map.getMapValue(x, false));
        this.cursor.setY(Map.getMapValue(y, false));
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
        return this.actionListText[this.cursorIndex];
    }
}