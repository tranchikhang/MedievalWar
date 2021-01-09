class BattleInfo {

    constructor(scene) {
        // Current scene
        this.scene = scene;

        this.content = this.scene.add.text(Config.WindowWidth / 4, Config.WindowHeight / 3, '', {
            backgroundColor: '#4287f5',
            padding: {
                left: Map.getMapValue(5),
                top: Map.getMapValue(1),
                fontSize: '24px',
            }
        }).setVisible(false);
        this.content.setFixedSize(Config.WindowWidth / 2, Config.WindowHeight / 4);
    }

    /**
     * Set text content
     * @param {string} text
     */
    setText(text) {
        this.content.text = text;
    }

    /**
     * Show battle information
     * @param {string} text content to show
     */
    async show(text = '') {
        let x = this.scene.camera.getOffsetX();
        let y = this.scene.camera.getOffsetY();
        if (text) {
            this.setText(text);
        }
        if (x != null) {
            this.content.setX(Config.WindowWidth / 5 + Map.getMapValue(x));
        }
        if (y != null) {
            this.content.setY(Config.WindowHeight / 3 + Map.getMapValue(y));
        }
        this.content.setVisible(true);
        return new Promise(resolve => {
            let timer = this.scene.time.addEvent({
                delay: Config.DialogTransitionTime,
                callback: function() {
                    this.hide();
                    console.log('resolve ' + new Date().getSeconds())
                    resolve();
                },
                callbackScope: this
            });
        });

    }

    async showAttackResult(dmgDealt) {
        await this.show(lang['damage.dealt'].replace('%s', dmgDealt)););
        console.log('After sleep: ' + new Date().getSeconds())
    }

    /**
     * Hide the transition menu
     * @return {none}
     */
    hide() {
        this.content.setVisible(false);
    }
}