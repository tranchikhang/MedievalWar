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
        this.units = [];
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
     * Get unit index at specified tile
     * @param  {int} x
     * @param  {int} y
     * @return {int|null} return unit index if that tile has a unit, else return null
     */
    getUnitOnMap(x, y) {
        if (this.mapObject[y][x] >= Constants.TILE_PLAYER_UNIT_START) {
            return this.mapObject[y][x];
        }
        return null;
    }

    /**
     * Get unit object
     * @param  {int} index unit index in units list
     * @return {object}
     */
    getCurrentUnitObject(index) {
        return this.units[index];
    }

    /**
     * Set unit position by setting unit index as value on object map
     * @param {int} unitIndex current unit index in unit array
     * @param {object} cursor
     * @param {object} control
     */
    setUnitOnMap(unitIndex, cursor, control) {
        // Disable the cursor and control
        cursor.disable();
        control.disable();
        let x = cursor.getX();
        let y = cursor.getY();
        let unit = this.units[unitIndex];
        this.setMapObject(unit.getX(), unit.getY(), Constants.TILE_TERRAIN_ABLE_TO_PASS);

        // Get shortest path
        let path = PathFinding.findShortestPath(this.mapObject, {
            'x': unit.getX(),
            'y': unit.getY()
        }, {
            'x': x,
            'y': y
        });
        // Move the unit at each step
        // Exclude the first step since it's the current position
        let i = 1;
        let timer = this.scene.time.addEvent({
            delay: 100,
            callback: function() {
                unit.move(path[i].x, path[i].y);
                i++;
                if (i == path.length) {
                    // Enable the cursor and control when unit arrived at destination
                    cursor.enable();
                    control.enable();
                }
            },
            callbackScope: this,
            repeat: path.length - 2
        });
        this.setMapObject(x, y, unitIndex);
    }

    /**
     * Set unit position on map object
     * @param {int} index unit index in units list
     * @param {int} x
     * @param {int} y
     */
    setUnitPosition(index, x, y) {
        this.setMapObject(x, y, index);
        this.units[index].setPosition(x, y);
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
}