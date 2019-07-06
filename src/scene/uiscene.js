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