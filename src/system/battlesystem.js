class BattleSystem {

    constructor(currentLevel) {
        this.currentLevel = currentLevel;
        this.enemyUnits = this.currentLevel.getEnemyUnits();
        this.playerUnits = this.currentLevel.getPlayerUnits();

        this.lstEnemies = [];

        this.selectEnemyIdx = 0;
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
            this.selectEnemyIdx = this.lstEnemies.length-1;
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