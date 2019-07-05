/**
 * Paladin class
 */
class Paladin extends BaseClass {

    constructor(scene) {
        super();
        this.spritePath = '../assets/tilesets/'
        this.spriteFile = 'Toens_Medieval_v.1.0'
        this.standingAnimationKey = 'Paladin_stand'
        this.scene = scene;
        this.name = 'Paladin';
        this.attack = 15;
        this.magicAttack = 0;
        this.speed = 17;
        this.defense = 12;
        this.magicDefense = 5;
        this.moveRange = 9;

        this.moveType = this.MOVE_TYPE_MOUNTED;
        this.loadSpritesheet();
    }

    drawStanding(x, y) {
        if (this.sprite) {
            this.sprite.destroy();
        }
        this.sprite = this.scene.add.sprite(x, y, this.name).play(this.standingAnimationKey).setScale(1.5);
    }

    loadSpritesheet() {
        this.scene.load.spritesheet(
            this.name,
            this.spritePath + this.spriteFile + this.spriteExtension, {
                frameWidth: this.frameWidth,
                frameHeight: this.frameHeight
            });
    }

    createAnimation() {
        this.scene.anims.create({
            key: this.standingAnimationKey,
            frames: this.scene.anims.generateFrameNumbers(this.name, {
                frames: [115]
            }),
            frameRate: 3,
            repeat: -1
        });
    }

    destroy() {
        this.sprite.destroy();
    }
}