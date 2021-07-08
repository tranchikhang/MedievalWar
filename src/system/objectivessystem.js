class ObjectiveSystem {

    constructor(currentLevel, objective) {
        this.currentLevel = currentLevel;
        this.objective = objective;
    }

    /**
     * check if objective of level is achieved or not
     * @return {none}
     */
    checkAchieved() {
        return this.objective.checkAchieved(this.currentLevel);
    }
}

class ObjectiveKillBoss extends ObjectiveSystem {

    /**
     * check if objective of level is achieved or not
     * @return {boolean}
     */
    checkAchieved(currentLevel) {
        if (currentLevel.getBoss().isDead()) {
            return true;
        }
        return false;
    }
}

class ObjectiveKillAll extends ObjectiveSystem {

    /**
     * check if objective of level is achieved or not
     * @return {boolean}
     */
    checkAchieved(currentLevel) {
        if (this.currentLevel.getEnemyUnits().length == 0) {
            return true;
        }
        return false;
    }
}