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
    }

    preload() {
        this.load.image('Toens_Medieval_v.1.0', Config.ASSET_PATH + 'tilesets/Toens_Medieval_v.1.0.png');
        this.load.tilemapTiledJSON('level1', 'src/level/level1.json');
        // Create level
        this.currentLevel = new Level1(this);
        // Create game control
        this.cursor = new Cursor(this, this.currentLevel);
        this.control = new Control(this);
    }

    create() {
        // Load level
        this.currentLevel.load();
        // Initialize the map
        let map = this.add.tilemap('level1');
        var tileset = map.addTilesetImage('Toens_Medieval_Strategy','Toens_Medieval_v.1.0');
        var backgroundLayer = map.createStaticLayer('Background', tileset).setScale(2);
        var backgroundLayer2 = map.createStaticLayer('Top', tileset).setScale(2);

        // Init unit on this level
        this.currentLevel.createUnits();

        // Load cursor, set starting position
        this.cursor.load(1, 1);

        // Screen resume event handling
        this.events.on('resume', this.afterResume);
    }
    update() {
        var isUpDown = this.input.keyboard.checkDown(this.control.keyUp, 100);
        if (isUpDown) {
            this.cursor.moveUp();
        }

        var isDownDown = this.input.keyboard.checkDown(this.control.keyDown, 100);
        if (isDownDown) {
            this.cursor.moveDown();
        }

        var isLeftDown = this.input.keyboard.checkDown(this.control.keyLeft, 100);
        if (isLeftDown) {
            this.cursor.moveLeft();
        }

        var isRightDown = this.input.keyboard.checkDown(this.control.keyRight, 100);
        if (isRightDown) {
            this.cursor.moveRight();
        }

        let isSelectDown = Phaser.Input.Keyboard.JustDown(this.control.keySelect);
        if (isSelectDown) {
            if (this.currentMode == Constants.MODE_UNIT_MOVE) {
                // PLayer is moving unit
                // Check if there is already an unit there
                let unit = this.currentLevel.getUnitOnMap(this.cursor.getX(), this.cursor.getY());
                if (unit !== null) {
                    return;
                }
                // Check if unit can move to this tile or not
                for (let i = 0; i < this.possiblePaths.length; i++) {
                    if (this.possiblePaths[i].x == this.cursor.getX() && this.possiblePaths[i].y == this.cursor.getY()) {
                        // Disable the cursor
                        // NOT WORKING
                        this.cursor.disable();
                        // Clear highlighted paths
                        this.currentLevel.removeHighlightPaths(this.possibleTiles);
                        // Move unit to selected tile
                        this.currentLevel.setUnitOnMap(this.cursor.getX(), this.cursor.getY(), this.selectedUnit);
                        this.clearMode();
                        // Enable the cursor
                        this.cursor.enable();
                        break;
                    }
                }
                //
            } else {
                // Check if user selected a character
                this.selectedUnit = this.currentLevel.getUnitOnMap(this.cursor.getX(), this.cursor.getY());
                if (this.selectedUnit !== null) {
                    this.scene.pause('MainScene');
                    this.scene.run('UIScene', {
                        'positionX': this.cursor.getX(),
                        'positionY': this.cursor.getY()
                    });
                }
            }
            this.control.keySelect.isDown = false;
        }

        let isCancelPressed = Phaser.Input.Keyboard.JustDown(this.control.keyCancel);
        if (isCancelPressed) {
            if (this.currentMode == Constants.MODE_UNIT_MOVE) {
                // Exit unit moving action
                // Reset mode flag
                this.clearMode();
                // Clear highlighted paths
                this.currentLevel.removeHighlightPaths(this.possibleTiles);
            }
        }
    }

    afterResume(sys, data) {
        switch (data) {
            case Constants.ACTION_MOVE:
                // Switch to unit moving mode
                sys.scene.currentMode = Constants.MODE_UNIT_MOVE;
                // Get all possible moving paths
                sys.scene.possiblePaths = PathFinding.findPathWithinRange(
                    sys.scene.currentLevel.getMapObject(), {
                        'x': sys.scene.cursor.getX(),
                        'y': sys.scene.cursor.getY()
                    },
                    sys.scene.currentLevel.getCurrentUnitObject(sys.scene.selectedUnit).moveRange);
                // Hightlight all paths
                sys.scene.possibleTiles = sys.scene.currentLevel.highlightPaths(sys.scene.possiblePaths);
                break;
            default:
        }
    }

    clearMode() {
        this.currentMode = '';
    }
}