class Level {

    constructor(scene, key) {
        this.scene = scene;
        // Map key in cache
        this.key = key;

        // Map
        this.map = [];

        // Store object position on map, including terrain, units etc
        this.mapObject = [];
        // List units
        this.playerUnits = [];
        this.enemyUnits = [];
    }

    load() {
        let data = this.scene.cache.json.get(this.key);
        // Map size
        this.width = data.width;
        this.height = data.height;
        // Create map object

        for (let y = 0; y < this.height; y++) {
            let mapRow = data.layers[1].data.splice(0, this.width);
            this.map.push(mapRow);
            let row = [];
            for (let x = 0; x < this.width; x++) {
                // Depends on type of tile, the unit can cross that tile or not
                row.push(TileData.TILE_TYPE[this.map[y][x]].moveType);
            }
            this.mapObject.push(row);
        }
    }

    /**
     * Get map object
     * @return {array}
     */
    getMapObject() {
        return this.mapObject;
    }

    /**
     * Get value on map object
     * @param {int} x
     * @param {int} y
     */
    getObject(x, y) {
        return this.mapObject[y][x];
    }

    /**
     * Set value on map object
     * @param {int} x
     * @param {int} y
     * @param {int} value
     */
    setMapObject(x, y, value) {
        this.mapObject[y][x] = value;
    }

    /**
     * Get unit object
     * @param  {int} index unit index in units list
     * @return {object}
     */
    getUnitByIndex(index) {
        if (index < Constants.TILE_ENEMY_UNIT_START) {
            return this.playerUnits[index];
        } else {
            return this.enemyUnits[index - Constants.TILE_ENEMY_UNIT_START];
        }
    }

    /**
     * Get unit at specified tile
     * @param  {int} x
     * @param  {int} y
     * @return {object|null} return unit if that tile has a unit, else return null
     */
    getUnit(x, y) {
        if (this.mapObject[y][x] >= Constants.TILE_PLAYER_UNIT_START) {
            return this.getUnitByIndex(this.mapObject[y][x])
        }
        return null;
    }

    /**
     * Set unit position by setting unit index as value on object map
     * @param {object} unit selected unit
     * @param {int} x
     * @param {int} y
     */
    setUnitOnMap(unit, x, y) {
        // Set current unit position to terrain value
        this.setMapObject(unit.getX(), unit.getY(), Constants.TILE_TERRAIN_ABLE_TO_PASS);
        // Set unit index at new position
        this.setMapObject(x, y, unit.index);
    }

    /**
     * Set unit position on map object
     * @param {int} index unit index in units list
     * @param {int} x
     * @param {int} y
     */
    drawUnitOnMap(index, x, y) {
        this.setMapObject(x, y, index);
        if (index < Constants.TILE_ENEMY_UNIT_START) {
            this.playerUnits[index].setPosition(x, y);
        } else {
            this.enemyUnits[index - Constants.TILE_ENEMY_UNIT_START].setPosition(x, y);
        }
    }

    /**
     * Get map width
     * @return {int}
     */
    getWidth() {
        return this.width;
    }

    /**
     * Get map height
     * @return {int}
     */
    getHeight() {
        return this.height;
    }

    /**
     * Highlight all possible moving paths
     * @param  {array} arrPath array of tile
     * @return {arr} arrTiles array of highlighted tiles
     */
    highlightPaths(arrPath) {
        let arrTiles = [];
        for (let i = 0; i < arrPath.length; i++) {
            // Don't highlight allies
            if (this.getObject(arrPath[i].x, arrPath[i].y) >= Constants.TILE_PLAYER_UNIT_START) {
                continue;
            }
            let tile = this.scene.add.text(Map.getMapValue(arrPath[i].x), Map.getMapValue(arrPath[i].y), '', {
                backgroundColor: '#4287F580',
                padding: {
                    left: 10,
                    top: 10
                }
            });
            tile.setFixedSize(Constants.MAP_TILE_SIZE, Constants.MAP_TILE_SIZE);
            arrTiles.push(tile);
        }
        return arrTiles;
    }

    /**
     * Remove all highlighted paths
     * @param  {array} arrTiles array of tile
     * @return {none}
     */
    removeHighlightPaths(arrTiles) {
        for (let i = 0; i < arrTiles.length; i++) {
            arrTiles[i].setVisible(false);
        }
    }

    /**
     * Get player's units
     * @return {array}
     */
    getPlayerUnits() {
        return this.playerUnits;
    }

    /**
     * Get Enemy units
     * @return {array}
     */
    getEnemyUnits() {
        return this.enemyUnits;
    }
    /**
     * Remove player unit from the map (retreat, death etc)
     * @param  {object} unit unit to be removed
     */
    removeUnit(unit) {
        // Set current unit position to terrain value
        this.setMapObject(unit.getX(), unit.getY(), Constants.TILE_TERRAIN_ABLE_TO_PASS);
        if (unit.isEnemy()) {
            let idx = this.enemyUnits.findIndex(u => u.index === unit.index);
            this.enemyUnits.splice(idx, 1);
        } else {
            let idx = this.playerUnits.findIndex(u => u.index === unit.index);
            this.playerUnits.splice(idx, 1);
        }
    }
}