/**
 * Paladin class
 */
class Paladin extends BaseClass {

    constructor(scene) {
        super();
        this.scene = scene;
        this.className = 'Paladin';
        this.health = 36;
        this.currentHealth = 36;
        this.attack = 15;
        this.magicAttack = 0;
        this.speed = 17;
        this.defense = 12;
        this.magicDefense = 5;
        this.moveRange = 7;

        this.allyTexture = 115;
        this.enemyTexture = 122;

        this.moveType = this.MOVE_TYPE_MOUNTED;
    }
}