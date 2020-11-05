class BattleSystem {

    constructor(currentLevel) {
        this.currentLevel = currentLevel;
        this.enemyUnits = this.currentLevel.getEnemyUnits();
        this.playerUnits = this.currentLevel.getPlayerUnits();

        this.lstEnemies = [];

        this.selectEnemyIdx = 0;
        this.playerUnitsMoved = 0;
    }

    /**
     * A unit has finished an action, move to next one
     * @param  {finished unit}   unit
     * @return {none}
     */
    nextUnit(unit) {
        this.playerUnitsMoved += 1;
        // if (this.isPlayerFinished()) {
        //     // this.processAITurn();
        //     this.reset();
        // } else {
        // }
    }

    /**
     * Reset for new turn
     * @return {none}
     */
    reset() {
        // All player units have finished their action
        this.playerUnitsMoved = 0;
        for (var i = this.playerUnits.length - 1; i >= 0; i--) {
            this.playerUnits[i].startAction();
        }
    }

    /**
     * Check if player finished action on all units
     * @return {boolean}
     */
    isPlayerFinished() {
        return this.playerUnitsMoved == this.playerUnits.length - 1;
    }

    /**
     * set list of enemies which can be attacked in temp memory
     * @param {array} lstEnemies
     */
    setEnemiesList(lstEnemies) {
        this.lstEnemies = lstEnemies;
    }

    /**
     * get next enemy which can be attacked in temp memory
     * @return {object} enemy object
     */
    getNextEnemyInList() {
        this.selectEnemyIdx += 1;
        if (this.selectEnemyIdx == this.lstEnemies.length) {
            this.selectEnemyIdx = 0;
        }
        return this.lstEnemies[this.selectEnemyIdx];
    }

    /**
     * get previous enemy which can be attacked in temp memory
     * @return {object} enemy object
     */
    getPrevEnemyInList() {
        this.selectEnemyIdx -= 1;
        if (this.selectEnemyIdx == -1) {
            this.selectEnemyIdx = this.lstEnemies.length - 1;
        }
        return this.lstEnemies[this.selectEnemyIdx];
    }

    /**
     * Calculate damage deal
     * @param  {object} attacker
     * @param  {object} defender
     * @return {int}
     */
    calculateDamage(attacker, defender) {
        return attacker.attack - defender.defense;
    }

    /**
     * Calculate hit rate
     * TODO
     * @param  {object} attacker
     * @param  {object} defender
     * @return {[type]}
     */
    calculateHitRate(attacker, defender) {}
}