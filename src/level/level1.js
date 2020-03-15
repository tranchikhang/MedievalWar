class Level1 extends Level {

    constructor(scene) {
        super(scene, 'level1');

        // Path to json file
        this.jsonFile = 'assets/level/level1.json';
        // Load json file into cache
        this.scene.load.tilemapTiledJSON('level1', this.jsonFile);
        this.scene.load.json('level1', this.jsonFile);

        // Create ally units
        this.pal = new Paladin(this.scene);
        this.pal.name = 'Paladin 1';
        this.pal2 = new Paladin(this.scene);
        this.pal2.name = 'Paladin 2';
    }

    createUnits() {
        this.createAllyUnits();
        this.createEnemyUnits();
    }

    createAllyUnits() {
        // Draw character
        this.pal.drawStanding(Map.getMapValue(2, true), Map.getMapValue(2, true), this.pal.allyTexture);
        this.pal.index = 0;
        this.playerUnits.push(this.pal);
        // Set position on map
        this.setUnitPosition(0, 2, 2);

        this.pal2.drawStanding(Map.getMapValue(3, true), Map.getMapValue(4, true), this.pal2.allyTexture);
        this.pal2.index = 1;
        this.playerUnits.push(this.pal2);
        // Set position on map
        this.setUnitPosition(1, 3, 4);
    }

    createEnemyUnits() {
        let positionList = [
            [11, 12],
            [13, 12],
            [22, 4],
            [23, 5]
        ];
        for (let i = 0; i < positionList.length; i++) {
            // Draw character
            let pal = new Paladin(this.scene);
            pal.name = 'Enemy ' + (i+1).toString();
            pal.drawStanding(Map.getMapValue(positionList[i][0], true), Map.getMapValue(positionList[i][1], true), pal.enemyTexture);
            pal.index = Constants.TILE_ENEMY_UNIT_START + i;
            this.enemyUnits.push(pal);
            // Set position on map
            this.setUnitPosition(Constants.TILE_ENEMY_UNIT_START + i, positionList[i][0], positionList[i][1]);
        }
    }
}