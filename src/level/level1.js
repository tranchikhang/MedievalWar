class Level1 extends Level {

    constructor(scene) {
        let map = [
            [12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
            [12, 12, 11, 11, 11, 11, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 11, 12, 12],
            [12, 3, 3, 3, 11, 11, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 11, 12],
            [12, 3, 3, 3, 3, 11, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 12],
            [12, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 12],
            [12, 3, 3, 5, 5, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 12],
            [12, 3, 3, 3, 5, 3, 3, 3, 3, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 12],
            [12, 3, 3, 3, 3, 5, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 12],
            [12, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 12],
            [12, 11, 11, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 12],
            [12, 12, 11, 11, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 12],
            [12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
        ];
        super(scene, map);
        this.width = 23;
        this.height = 12;

        this.pal = new Paladin(this.scene);
        this.pal2 = new Paladin(this.scene);
    }

    createUnits() {
        // Draw character
        this.pal.createAnimation();
        this.pal.drawStanding(Map.getMapValue(2), Map.getMapValue(2));
        this.units.push(this.pal);
        // Set position on map
        this.setUnitPosition(0, 2, 2);

        this.pal2.createAnimation();
        this.pal2.drawStanding(Map.getMapValue(3), Map.getMapValue(4));
        this.units.push(this.pal2);
        // Set position on map
        this.setUnitPosition(1, 3, 4);
    }
}