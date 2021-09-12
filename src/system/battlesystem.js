class BattleSystem {

    constructor(currentLevel, scene) {
        this.scene = scene;
        this.currentLevel = currentLevel;

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
    }

    /**
     * Reset for new turn
     * @return {none}
     */
    reset() {
        // All player units have finished their action
        this.playerUnitsMoved = 0;
        for (var i = this.currentLevel.getPlayerUnits().length - 1; i >= 0; i--) {
            this.currentLevel.getPlayerUnits()[i].startAction();
        }
    }

    /**
     * Check if player finished action on all units
     * @return {boolean}
     */
    isPlayerFinished() {
        return this.playerUnitsMoved == this.currentLevel.getPlayerUnits().length - 1;
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

    /**
     * Process through each enemy unit
     * @return {none} [description]
     */
    async processAITurn(battleInfo) {
        for (var i = 0; i < this.currentLevel.getEnemyUnits().length; i++) {
            let aiDecision = this.currentLevel.getEnemyUnits()[i].checkAvailableAction(this.currentLevel);
            let target = aiDecision.target;
            let path = aiDecision.path;
            if (target) {
                if (path) {
                    // Move next to player unit and attack
                    this.currentLevel.setUnitOnMap(this.currentLevel.getEnemyUnits()[i], path.x, path.y);
                    await this.currentLevel.getEnemyUnits()[i].move(path.x, path.y);
                }
                // Player unit and enemy are next to each other
                await this.executeBattle(this.currentLevel.getEnemyUnits()[i], target, battleInfo);
                await Utils.sleep();
            }
        }
    }

    /**
     * Execute battle between attacker and defender
     * @param  {object} attacker   attacking unit
     * @param  {object} defender   defending unit
     * @param  {object} battleInfo show result
     * @return {none}
     */
    async executeBattle(attacker, defender, battleInfo) {
        let dmgDealt = this.calculateDamage(attacker, defender);
        defender.onDamage(dmgDealt);
        if (defender.isDead()) {
            //remove unit
            defender.destroy();
            // remove status menu
            this.currentLevel.removeUnit(defender);
        }
        await battleInfo.showAttackResult(dmgDealt);
    }
}