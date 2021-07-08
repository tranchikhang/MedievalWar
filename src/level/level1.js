class Level1 extends Level {

    constructor(scene) {
        super(scene, 'level1');

        this.objective = new ObjectiveSystem(this, new ObjectiveKillAll());

        // Path to json file
        this.jsonFile = 'assets/level/level1.json';
        // Load json file into cache
        this.scene.load.tilemapTiledJSON('level1', this.jsonFile);
        this.scene.load.json('level1', this.jsonFile);
    }

    createUnits() {
        this.createAllyUnits();
        this.createEnemyUnits();
    }

    createAllyUnits() {
        // Create ally units
        let pal = new Paladin(this.scene);
        pal.name = 'Paladin 1';
        let pal2 = new Paladin(this.scene);
        pal2.name = 'Paladin 2';

        // Draw character
        pal.drawStanding(Map.getMapValue(2, true), Map.getMapValue(2, true), pal.allyTexture);
        pal.index = 0;
        this.playerUnits.push(pal);
        this.setPlayerUnitMapping(pal.index, pal);
        // Set position on map
        this.drawUnitOnMap(0, 2, 2);

        pal2.drawStanding(Map.getMapValue(3, true), Map.getMapValue(4, true), pal2.allyTexture);
        pal2.index = 1;
        this.playerUnits.push(pal2);
        this.setPlayerUnitMapping(pal2.index, pal2);
        // Set position on map
        this.drawUnitOnMap(1, 3, 4);
    }

    createEnemyUnits() {
        let positionList = [
            [5, 6],
            [6, 7],
            [22, 4],
            [23, 5]
        ];
        for (let i = 0; i < positionList.length; i++) {
            // Draw character
            let pal = new Paladin(this.scene);
            pal.name = 'Enemy ' + (i + 1).toString();
            pal.health = 10;
            pal.currentHealth = 10;
            pal.drawStanding(Map.getMapValue(positionList[i][0], true), Map.getMapValue(positionList[i][1], true), pal.enemyTexture);
            pal.index = Constants.TILE_ENEMY_UNIT_START + i;
            this.enemyUnits.push(pal);
            this.setEnemyUnitMapping(pal.index, pal);
            // Set position on map
            this.drawUnitOnMap(Constants.TILE_ENEMY_UNIT_START + i, positionList[i][0], positionList[i][1]);
        }
    }
}