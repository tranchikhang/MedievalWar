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
        this.possibleCells = [];
    }

    preload() {
        this.load.image('Toens_Medieval_v.1.0', '../assets/tilesets/Toens_Medieval_v.1.0.png');
        // Create first level
        this.currentLevel = new Level1(this);
        // Create game control
        this.cursor = new Cursor(this, this.currentLevel);
        this.control = new Control(this);
    }

    create() {
        // Initialize the map
        const map = this.make.tilemap({
            data: this.currentLevel.getMap(),
            tileWidth: Constants.ACTUAL_CELL_SIZE,
            tileHeight: Constants.ACTUAL_CELL_SIZE
        });
        const tiles = map.addTilesetImage('Toens_Medieval_v.1.0');
        const layer = map.createStaticLayer(0, tiles, 0, 0).setScale(2);

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
                // Check if unit can move to this cell or not
                for (let i = 0; i < this.possiblePaths.length; i++) {
                    if (this.possiblePaths[i].x == this.cursor.getX() && this.possiblePaths[i].y == this.cursor.getY()) {
                        // Clear highlighted paths
                        this.currentLevel.removeHighlightPaths(this.possibleCells);
                        // Move unit to selected cell
                        this.currentLevel.setUnitOnMap(this.cursor.getX(), this.cursor.getY(), this.selectedUnit);
                        this.clearMode();
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
                this.currentLevel.removeHighlightPaths(this.possibleCells);
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
                sys.scene.possibleCells = sys.scene.currentLevel.highlightPaths(sys.scene.possiblePaths);
                break;
            default:
        }
    }

    clearMode() {
        this.currentMode = '';
    }
}

class UIScene extends Phaser.Scene {

    constructor() {
        super('UIScene');
        this.contextMenu = null;
        // Game control
        this.control = null;
    }
    init(data) {
        // Position to init menu
        this.positionX = data.positionX;
        this.positionY = data.positionY;
    }
    preload() {
        this.control = new Control(this);
        // Create menu
        this.contextMenu = new ContextMenu(this);
    }
    create() {
        // Show menu
        this.contextMenu.show(this.positionX, this.positionY);
    }
    update() {
        // Context menu is opened
        let isUpDown = Phaser.Input.Keyboard.JustDown(this.control.keyUp);
        if (isUpDown) {
            this.contextMenu.moveCursorUp();
        }

        var isDownDown = Phaser.Input.Keyboard.JustDown(this.control.keyDown);
        if (isDownDown) {
            this.contextMenu.moveCursorDown();
        }

        let isSelectDown = Phaser.Input.Keyboard.JustDown(this.control.keySelect);
        if (isSelectDown) {
            // Check for action
            let action = this.contextMenu.select();
            this.contextMenu.hide();
            this.control.keyCancel.isDown = false;
            this.scene.pause('UIScene');
            this.scene.resume('MainScene', action);
        }

        let isCancelPressed = Phaser.Input.Keyboard.JustDown(this.control.keyCancel);
        if (isCancelPressed) {
            this.contextMenu.hide();
            this.control.keyCancel.isDown = false;
            this.scene.pause('UIScene');
            this.scene.resume('MainScene');
        }
    }
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 400,
    parent: 'main-game',
    scene: [MainScene, UIScene]
};

var game = new Phaser.Game(config);