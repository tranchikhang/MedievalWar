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

        this.createAction();

        this.cursor = null;
        this.cursorGeometry = null;
        this.cursorIndex = 0;

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
     * Create context menu action list
     * @return {none}
     */
    createAction() {
        // Graphical menu action list
        // this.actionListMenu = [];

        // Menu action list
        this.actionList = {};
        this.actionList[Constants.ACTION_ATTACK] = new ContextMenuItem(this.scene, lang['action.attack'], Constants.ACTION_ATTACK);
        this.actionList[Constants.ACTION_MOVE] = new ContextMenuItem(this.scene, lang['action.move'], Constants.ACTION_MOVE);
        this.actionList[Constants.ACTION_WAIT] = new ContextMenuItem(this.scene, lang['action.wait'], Constants.ACTION_WAIT);
    }

    /**
     * Update list of actions which selected unit can perform
     * Called when selecting unit or after unit moved
     * @param  {BaseClass} unit selected unit
     * @return {none}
     */
    updateAction(unit) {
        // reset graphical menu action list
        this.actionListMenu = [];

        let lstEnemies = unit.checkAttackable();
        if (lstEnemies.length > 0) {
            this.actionListMenu.push(this.actionList[Constants.ACTION_ATTACK]);
        }

        if (!unit.isMoved && unit.checkMoveable()) {
            this.actionListMenu.push(this.actionList[Constants.ACTION_MOVE]);
        }

        // Menu action list
        this.actionListMenu.push(this.actionList[Constants.ACTION_WAIT]);
    }

    /**
     * Show the context menu
     * @param  {unit} current selected unit
     * @return {none}   [description]
     */
    show(unit) {
        this.updateAction(unit);
        let x = unit.getX();
        let y = unit.getY();
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
        if (this.cursorIndex < this.actionListMenu.length - 1) {
            this.cursorIndex += 1;
            this.cursor.setY(this.cursor.y + Constants.MAP_TILE_SIZE);
        }
    }

    /**
     * Return action selected
     * @return {string} action
     */
    select() {
        return this.actionListMenu[this.cursorIndex].actionValue;
    }
}