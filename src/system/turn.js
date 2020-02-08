class Turn {

    constructor(scene) {
        this.control = scene.control;
        this.currentLevel = scene.currentLevel;
        this.enemyUnits = this.currentLevel.getEnemyUnits();
        this.playerUnits = this.currentLevel.getPlayerUnits();
        this.playerUnitsMoved = 0;
    }

    next(unit) {
        unit.isFinished = true;
        this.playerUnitsMoved += 1;
        if (this.playerUnitsMoved == this.playerUnits.length) {
            this.playerUnitsMoved = 0;
            this.reset();
            for (var i = this.enemyUnits.length - 1; i >= 0; i--) {
                let path = this.enemyUnits[i].checkAvailableAction(this.currentLevel);
                if (path) {
                    this.currentLevel.setUnitOnMap(this.enemyUnits[i], path.x, path.y, this.control);
                }
            }
        }
    }

    reset() {
        for (var i = this.playerUnits.length - 1; i >= 0; i--) {
            this.playerUnits[i].isFinished = false;
        }
    }
}