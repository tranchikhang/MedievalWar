class Turn {

    constructor(currentLevel) {
        this.currentLevel = currentLevel;
        this.enemyUnits = this.currentLevel.getEnemyUnits();
        this.playerUnits = this.currentLevel.getPlayerUnits();
        this.playerUnitsMoved = 0;
    }

    /**
     * A unit has finished an action, move to next one
     * @param  {finished unit}   unit
     * @return {none}
     */
    next(unit) {
        unit.finishAction();
        this.playerUnitsMoved += 1;
        if (this.playerUnitsMoved == this.playerUnits.length) {
            this.playerUnitsMoved = 0;
            for (var i = this.enemyUnits.length - 1; i >= 0; i--) {
                let path = this.enemyUnits[i].checkAvailableAction(this.currentLevel);
                if (path) {
                    this.currentLevel.setUnitOnMap(this.enemyUnits[i], path.x, path.y);
                    this.enemyUnits[i].move(path.x, path.y);
                }
            }
            this.reset();
        }
    }

    /**
     * Reset for new turn
     * @return {none}
     */
    reset() {
        for (var i = this.playerUnits.length - 1; i >= 0; i--) {
            this.playerUnits[i].startAction();
        }
    }
}