class Level {

    constructor(scene, map) {
        this.scene = scene;
        // Map data
        this.map = map;
        // Map size
        this.width = null;
        this.height = null;
        // Store object position on map, including terrain, units etc
        this.mapObject = [];
        // List units
        this.units = [];

        // Create map object
        for (var y = 0; y < this.map.length; y++) {
            var row = [];
            for (var x = 0; x < this.map[y].length; x++) {
                // Depends on type of cell, the unit can cross that cell or not
                row.push(CellData.CELL_TYPE[this.map[y][x]].moveType);
            }
            this.mapObject.push(row);
        }
    }

    /**
     * return map width cell data
     * @return {array}
     */
    getMap() {
        return this.map;
    }

    /**
     * Get map object
     * @return {array}
     */
    getMapObject() {
        return this.mapObject;
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
     * Get unit index at specified cell
     * @param  {int} x
     * @param  {int} y
     * @return {int|null} return unit index if that cell has a unit, else return null
     */
    getUnitOnMap(x, y) {
        if (this.mapObject[y][x] >= Constants.CELL_PLAYER_UNIT_START) {
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
     * Set unit postion by setting unit index as value on object map
     * @param {int} x
     * @param {int} y
     * @param {int} unitIndex
     */
    setUnitOnMap(x, y, unitIndex) {
        let unit = this.units[unitIndex];
        this.setMapObject(unit.getX(), unit.getY(), Constants.CELL_TERRAIN_ABLE_TO_PASS);

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
     * @param  {array} arrPath array of cell
     * @return {arr} arrCells array of highlighted cells
     */
    highlightPaths(arrPath) {
        let arrCells = [];
        for (let i = 0; i < arrPath.length; i++) {
            let cell = this.scene.add.text(Map.getMapValue(arrPath[i].x, false), Map.getMapValue(arrPath[i].y, false), '', {
                backgroundColor: 'rgb(66, 135, 245, 0.5)',
                padding: {
                    left: 10,
                    top: 10
                }
            });
            cell.setFixedSize(Constants.MAP_CELL_SIZE, Constants.MAP_CELL_SIZE);
            arrCells.push(cell);
        }
        return arrCells;
    }

    /**
     * Remove all highlighted paths
     * @param  {array} arrPath array of cell
     * @return {none}
     */
    removeHighlightPaths(arrCells) {
        for (let i = 0; i < arrCells.length; i++) {
            arrCells[i].setVisible(false);
        }
    }
}