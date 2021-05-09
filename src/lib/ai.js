class Ai {

    /**
     * Check all available action at each tile
     * If there is a player unit nearby,
     * move to the tile next to them, then attack
     * TODO To improve AI logic
     * @param  {currentLevel} current level
     * @param  {currentUnit} current unit position
     * @return {array} targeted unit and best tile to move to
     */
    static checkWithinRange(currentLevel, currentUnit) {
        let map = currentLevel.getMapObject();
        let queue = [{
            x: currentUnit.getX(),
            y: currentUnit.getY(),
            step: 0
        }];
        let result = {
            'target': null,
            'path': null
        };
        let visited = [];
        for (let y = 0; y < map.length; y++) {
            let row = [];
            visited.push(row);
        }
        visited[currentUnit.getY()][currentUnit.getX()] = Constants.TILE_PLAYER_UNIT_START;
        while (queue.length > 0) {
            // Get current position
            let currentPos = queue.shift();
            let stepIndex = currentPos.step + 1;
            if (stepIndex > currentUnit.moveRange)
                break;

            // Explore surrounding
            for (let i = 0; i < PathFinding.surroundingTile.length; i++) {
                let newPos = {
                    x: currentPos.x + PathFinding.surroundingTile[i].x,
                    y: currentPos.y + PathFinding.surroundingTile[i].y
                };
                // if current position is movable
                if (map[newPos.y][newPos.x] == Constants.TILE_TERRAIN_ABLE_TO_PASS ||
                    // or player unit and enemy are next to each other
                    (map[newPos.y][newPos.x] >= Constants.TILE_PLAYER_UNIT_START &&
                        map[newPos.y][newPos.x] < Constants.TILE_ENEMY_UNIT_START)) {
                    // if this tile hasn't been checked
                    if (!visited[newPos.y][newPos.x]) {
                        queue.push({
                            x: newPos.x,
                            y: newPos.y,
                            step: stepIndex
                        });
                        visited[newPos.y][newPos.x] = stepIndex;
                        let unit = currentLevel.getUnit(newPos.x, newPos.y);
                        if (unit !== null) {
                            if (unit.isPlayer()) {
                                // Found player unit
                                // Calculating shortest path
                                let p = PathFinding.findShortestPath(currentLevel.getMapObject(), {
                                    x: currentUnit.getX(),
                                    y: currentUnit.getY(),
                                    step: 0
                                }, {
                                    x: newPos.x,
                                    y: newPos.y
                                });
                                // Player unit and enemy are next to each other
                                if (p.length == 2) {
                                    result.target = unit;
                                    return result;
                                }
                                p.splice(0, 1);
                                p.splice(p.length - 1, 1);
                                if (!result.path || (result.path && p.length < result.path.length)) {
                                    result.target = unit;
                                    result.path = p[p.length - 1];
                                }
                            }
                        }
                    }
                }
            }
        }
        return result;
    }
}