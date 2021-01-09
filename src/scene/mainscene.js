class MainScene extends Phaser.Scene {

    constructor() {
        super('MainScene');
        // Game control
        this.control = null;
        this.cursor = null;

        // Store map, units list
        this.currentLevel = null;

        // Indicate which mode the game is running (select unit, move unit etc)
        this.currentMode = '';

        // Index to store player selected unit
        this.selectedUnit = null;

        // Variable to store array of possible moving paths in unit moving mode
        this.possiblePaths = [];
        this.possibleTiles = [];

        this.battleSystem = null;

        this.contextMenu = null;

        this.transition = null;
        this.battleInfo = null;

        this.unitOriginalPosition = {};
    }

    preload() {
        this.load.image('Toens_Medieval_v.1.0', Config.ASSET_PATH + 'tilesets/Toens_Medieval_v.1.0.png');
        // Create level
        this.currentLevel = new Level1(this);
        // Create game control
        this.cursor = new Cursor(this);
        this.control = new Control(this);
        // camera
        this.camera = new Camera(this.cameras.main);
        this.battleSystem = new BattleSystem(this.currentLevel, this);
    }

    create() {
        // Load level
        this.currentLevel.load();
        // Initialize the map
        let map = this.add.tilemap('level1');
        var tileset = map.addTilesetImage('Toens_Medieval_Strategy', 'Toens_Medieval_v.1.0');
        var backgroundLayer = map.createStaticLayer('Background', tileset).setScale(2);
        var backgroundLayer2 = map.createStaticLayer('Top', tileset).setScale(2);

        // Init unit on this level
        this.currentLevel.createUnits();

        // Load cursor, set starting position
        this.cursor.load(1, 1);

        // Create menu
        this.contextMenu = new ContextMenu(this);

        this.transition = new Transition(this);
        this.battleInfo = new BattleInfo(this);
    }

    update() {
        var isUpDown = this.input.keyboard.checkDown(this.control.keyUp, 100);
        if (isUpDown) {
            if (this.currentMode == Constants.MODE_CONTEXT_MENU) {
                this.contextMenu.moveCursorUp();
            } else if (this.currentMode == Constants.MODE_UNIT_ATTACK) {
                // Switch to next enemy
                let e = this.battleSystem.getNextEnemyInList();
                this.cursor.set(e.getX(), e.getY());
                this.onCursorMoved();
            } else {
                this.cursor.moveUp();
                this.onCursorMoved();
            }
        }

        var isDownDown = this.input.keyboard.checkDown(this.control.keyDown, 100);
        if (isDownDown) {
            if (this.currentMode == Constants.MODE_CONTEXT_MENU) {
                this.contextMenu.moveCursorDown();
            } else if (this.currentMode == Constants.MODE_UNIT_ATTACK) {
                // Switch to previous enemy
                let e = this.battleSystem.getPrevEnemyInList();
                this.cursor.set(e.getX(), e.getY());
                this.onCursorMoved();
            } else {
                this.cursor.moveDown();
                this.onCursorMoved();
            }
        }

        var isLeftDown = this.input.keyboard.checkDown(this.control.keyLeft, 100);
        if (isLeftDown) {
            if (this.currentMode == Constants.MODE_CONTEXT_MENU) {
                return;
            }
            if (this.currentMode == Constants.MODE_UNIT_ATTACK) {
                // Switch to previous enemy
                let e = this.battleSystem.getPrevEnemyInList();
                this.cursor.set(e.getX(), e.getY());
                this.onCursorMoved();
            } else {
                this.cursor.moveLeft();
                this.onCursorMoved();
            }
        }

        var isRightDown = this.input.keyboard.checkDown(this.control.keyRight, 100);
        if (isRightDown) {
            if (this.currentMode == Constants.MODE_CONTEXT_MENU) {
                return;
            }
            if (this.currentMode == Constants.MODE_UNIT_ATTACK) {
                // Switch to next enemy
                let e = this.battleSystem.getNextEnemyInList();
                this.cursor.set(e.getX(), e.getY());
                this.onCursorMoved();
            } else {
                this.cursor.moveRight();
                this.onCursorMoved();
            }
        }

        let isSelectDown = Phaser.Input.Keyboard.JustDown(this.control.keySelect);
        if (isSelectDown) {
            this.onSelectDown();
        }

        let isCancelPressed = Phaser.Input.Keyboard.JustDown(this.control.keyCancel);
        if (isCancelPressed) {
            if (this.currentMode == Constants.MODE_CONTEXT_MENU) {
                this.contextMenu.hide();
                this.clearMode();
                if (this.unitOriginalPosition.x && this.unitOriginalPosition.y) {
                    if (this.selectedUnit.getX() != this.unitOriginalPosition.x || this.selectedUnit.getY() != this.unitOriginalPosition.y) {
                        // Move unit back
                        this.selectedUnit.move(this.unitOriginalPosition.x, this.unitOriginalPosition.y);
                        this.currentLevel.setUnitOnMap(this.selectedUnit, this.unitOriginalPosition.x, this.unitOriginalPosition.y);
                        this.unitOriginalPosition = {};
                    }
                }
            } else if (this.currentMode == Constants.MODE_UNIT_MOVE) {
                // Exit unit moving action
                // Reset mode flag
                this.clearMode();
                // Clear highlighted paths
                this.currentLevel.removeHighlightPaths(this.possibleTiles);
            } else if (this.currentMode == Constants.MODE_UNIT_ATTACK) {
                // Exit unit moving action
                // Reset mode flag
                this.clearMode();
                if (this.unitOriginalPosition.x && this.unitOriginalPosition.y) {
                    if (this.selectedUnit.getX() != this.unitOriginalPosition.x || this.selectedUnit.getY() != this.unitOriginalPosition.y) {
                        // Move unit back
                        this.selectedUnit.move(this.unitOriginalPosition.x, this.unitOriginalPosition.y);
                        this.currentLevel.setUnitOnMap(this.selectedUnit, this.unitOriginalPosition.x, this.unitOriginalPosition.y);
                        this.unitOriginalPosition = {};
                    }
                }
            }
        }
    }

    onSelectDown() {
        if (this.currentMode == Constants.MODE_CONTEXT_MENU) {
            // Check for action
            let action = this.contextMenu.select();
            this.contextMenu.hide();
            switch (action) {
                case Constants.ACTION_MOVE:
                    // Switch to unit moving mode
                    this.currentMode = Constants.MODE_UNIT_MOVE;
                    // Get all possible moving paths
                    this.possiblePaths = PathFinding.findPathWithinRange(
                        this.currentLevel.getMapObject(), {
                            'x': this.cursor.getX(),
                            'y': this.cursor.getY()
                        },
                        this.selectedUnit.moveRange);
                    // Highlight all paths
                    this.possibleTiles = this.currentLevel.highlightPaths(this.possiblePaths);
                    break;
                case Constants.ACTION_WAIT:
                    this.endUnitTurn();
                    break;
                case Constants.ACTION_ATTACK:
                    let lstEnemies = this.selectedUnit.checkAttackable();
                    if (lstEnemies.length > 0) {
                        this.battleSystem.setEnemiesList(lstEnemies);
                        // Move cursor around enemies
                        this.currentMode = Constants.MODE_UNIT_ATTACK;
                    }
                    break;
                default:
            }
        } else if (this.currentMode == Constants.MODE_UNIT_MOVE) {
            // Player is moving unit
            // Check if there is already an unit there
            let unit = this.currentLevel.getUnit(this.cursor.getX(), this.cursor.getY());
            if (unit !== null) {
                return;
            }
            // Check if unit can move to this tile or not
            for (let i = 0; i < this.possiblePaths.length; i++) {
                if (this.possiblePaths[i].x == this.cursor.getX() && this.possiblePaths[i].y == this.cursor.getY()) {
                    this.moveUnit();
                    this.clearMode();
                    break;
                }
            }
            //
        } else if (this.currentMode == Constants.MODE_UNIT_ATTACK) {
            // Attack selected unit
            let enemy = this.currentLevel.getUnit(this.cursor.getX(), this.cursor.getY());
            if (enemy == null) {
                // Just to make sure...
                return;
            }
            this.battleSystem.executeBattle(this.selectedUnit, enemy, this.battleInfo);
            // End unit turn
            this.endUnitTurn();
        } else {
            // Check if user selected a character
            this.selectedUnit = this.currentLevel.getUnit(this.cursor.getX(), this.cursor.getY());
            if (this.selectedUnit !== null && !this.selectedUnit.isEnemy() && this.selectedUnit.isAvailable()) {
                this.showContextMenu(this.selectedUnit);
            }
        }
        this.control.keySelect.isDown = false;
    }

    async moveUnit() {
        // Clear highlighted paths
        this.currentLevel.removeHighlightPaths(this.possibleTiles);
        this.unitOriginalPosition = {
            x: this.selectedUnit.getX(),
            y: this.selectedUnit.getY()
        }
        // Move unit to selected tile
        this.control.disable();
        this.currentLevel.setUnitOnMap(this.selectedUnit, this.cursor.getX(), this.cursor.getY());
        // this.selectedUnit.move(this.cursor.getX(), this.cursor.getY());
        await this.selectedUnit.move(this.cursor.getX(), this.cursor.getY());
        // Enable control
        this.control.enable();
        if (this.unitOriginalPosition.x && this.unitOriginalPosition.y) {
            this.showContextMenu(this.selectedUnit);
        }
    }

    clearMode() {
        this.currentMode = '';
    }

    showContextMenu(unit) {
        this.currentMode = Constants.MODE_CONTEXT_MENU;
        // Show menu
        this.contextMenu.show(unit);
    }

    onCursorMoved() {
        let unit = this.currentLevel.getUnit(this.cursor.getX(), this.cursor.getY());
        if (unit === null) {
            if (this.statusMenu && this.statusMenu.isVisible) {
                this.statusMenu.hide();
            }
            return;
        }
        if (!this.statusMenu) {
            this.statusMenu = new StatusMenu(this, this.currentLevel);
        }
        this.statusMenu.show(this.cursor.getX(), this.cursor.getY(), unit);
    }

    /**
     * End unit's turn
     * @return {none}
     */
    endUnitTurn() {
        this.selectedUnit.finishAction();
        this.selectedUnit = null;
        this.unitOriginalPosition = {};
        if (this.battleSystem.isPlayerFinished()) {
            this.battleSystem.reset();
            // Enemy turn
            this.transition.show(lang['end.turn'], this.camera.getOffsetX(), this.camera.getOffsetY());
            let timer = this.time.addEvent({
                delay: Config.DialogTransitionTime,
                callback: function() {
                    this.transition.hide();
                    this.battleSystem.processAITurn(this.battleInfo);
                    // Reset mode flag
                    this.clearMode();
                },
                callbackScope: this
            });
        } else {
            this.battleSystem.nextUnit();
            // Reset mode flag
            this.clearMode();
        }
    }
}