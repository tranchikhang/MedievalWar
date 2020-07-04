class ContextMenuItem {
    constructor(scene, action, actionValue) {
        this.action = action;
        this.actionValue = actionValue;

        this.item = scene.add.text(0, 0, action, {
            backgroundColor: '#4287f5',
            padding: {
                left: 10,
                top: 10
            }
        }).setVisible(false);
        // Set text box size
        this.item.setFixedSize(Constants.CONTEXT_MENU_WIDTH, Constants.CONTEXT_MENU_HEIGHT);
    }

    setX(x) {
        this.item.setX(x);
    }

    setY(y) {
        this.item.setY(y);
    }

    setVisible(val) {
        this.item.setVisible(val);
    }
}

class ContextMenu {

    constructor(scene) {
        // Current scene
        this.scene = scene;

        // Menu action list
        this.dfActionListText = [lang['action.move'], lang['action.wait'], lang['action.attack']];
        this.actionListText = this.dfActionListText;
        this.dfActionListValue = [Constants.ACTION_MOVE, Constants.ACTION_WAIT, Constants.ACTION_ATTACK];
        this.actionListValue = this.dfActionListValue;

        // Graphical menu action list
        this.actionListMenu = [];

        this.cursor = null;
        this.cursorGeometry = null;
        this.cursorIndex = 0;

        // Create list of possible action
        // For now, just load all the default action
        for (var i = 0; i < this.actionListText.length; i++) {
            var option = new ContextMenuItem(scene, this.actionListText[i], this.actionListValue[i]);
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
        this.cursorGeometry = new Phaser.Geom.Rectangle(0, 0, Constants.CONTEXT_MENU_WIDTH, Constants.MAP_TILE_SIZE);
        this.cursor.clear();
        this.cursor.strokeRectShape(this.cursorGeometry).setVisible(false);
    }

    /**
     * Show the context menu
     * @param  {int} x selected position x
     * @param  {int} y selected position y
     * @return {none}   [description]
     */
    show(x, y) {
        let isRightMenu = true;
        if (Map.getMapValue(x) + Constants.CONTEXT_MENU_WIDTH + Constants.CONTEXT_MENU_OFFSET_X >= Config.WindowWidth) {
            isRightMenu = false;
        }

        // Calculate which option to display
        for (var i = 0; i < this.actionListMenu.length; i++) {
            // Default menu will show on the right
            // But if there is no space then show the menu on the left
            if (isRightMenu) {
                // -1 to fit with border
                this.actionListMenu[i].setX(Map.getMapValue(x) + Constants.CONTEXT_MENU_WIDTH - 1);
            } else {
                // -1 to fit with border
                this.actionListMenu[i].setX(Map.getMapValue(x) - Constants.CONTEXT_MENU_WIDTH - Constants.CONTEXT_MENU_OFFSET_X - 1);
            }
            this.actionListMenu[i].setY(Map.getMapValue(y) + Map.getMapValue(i) - 1);
            this.actionListMenu[i].setVisible(true);
        }
        this.cursor.setVisible(true);
        if (isRightMenu) {
            this.cursor.setX(Map.getMapValue(x) + Constants.CONTEXT_MENU_OFFSET_X);
        } else {
            this.cursor.setX(Map.getMapValue(x) - Constants.CONTEXT_MENU_WIDTH - Constants.CONTEXT_MENU_OFFSET_X);
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
     * Move the cursor up one item
     * @return {none}
     */
    moveCursorUp() {
        if (this.cursorIndex > 0) {
            this.cursorIndex -= 1;
            this.cursor.setY(this.cursor.y - Constants.MAP_TILE_SIZE);
        }
    }

    /**
     * Move the cursor down one item
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