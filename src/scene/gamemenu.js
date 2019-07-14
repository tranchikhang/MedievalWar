class GameMenu extends Phaser.Scene {

    constructor() {
        super('GameMenu');
        // Game control
        this.control = null;

        // Guide on screen
        this.guideText = [lang['start.screen.guide.1'], lang['start.screen.guide.2'], lang['start.screen.guide.3']];
    }

    preload() {
        this.control = new Control(this);
    }

    create() {

        let graphics = this.add.graphics({
            fillStyle: {
                color: 0xc06f2a,
                alpha: 1
            }
        });
        graphics.fillRect(0, 0, Config.WindowWidth, Config.WindowHeight);

        let startOption = this.add.text(200, 100, lang['start.screen.enter'], {
            color: '#fcd498',
            fontSize: 30,
            align: 'center',
        }).setFixedSize(400, 50);

        for (var i = 0; i < this.guideText.length; i++) {
            let guide = this.add.text(300, 160 + i * 40, this.guideText[i], {
                align: 'center',
            });
        }
    }

    update() {
        let isSelectDown = Phaser.Input.Keyboard.JustDown(this.control.keyEnter);
        if (isSelectDown) {
            this.scene.stop('GameMenu');
            this.scene.launch('MainScene');
        }
    }
}