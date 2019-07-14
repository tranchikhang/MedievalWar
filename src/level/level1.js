class Level1 extends Level {

    constructor(scene) {
        super(scene, 'level1');

        // Path to json file
        this.jsonFile = 'assets/level/level1.json';
        // Load json file into cache
        this.scene.load.tilemapTiledJSON('level1', this.jsonFile);
        this.scene.load.json('level1', this.jsonFile);

        // Create units
        this.pal = new Paladin(this.scene);
        this.pal2 = new Paladin(this.scene);
    }

    createUnits() {
        // Draw character
        this.pal.drawStanding(Map.getMapValue(2), Map.getMapValue(2));
        this.units.push(this.pal);
        // Set position on map
        this.setUnitPosition(0, 2, 2);

        this.pal2.drawStanding(Map.getMapValue(3), Map.getMapValue(4));
        this.units.push(this.pal2);
        // Set position on map
        this.setUnitPosition(1, 3, 4);
    }
}