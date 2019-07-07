class PathFinding {
    static get surroundingCell() {
        return [{
            x: 0,
            y: -1
        }, {
            x: 1,
            y: 0
        }, {
            x: 0,
            y: 1
        }, {
            x: -1,
            y: 0
        }];
    }

    /**
     * find shortest path between 2 point using BFS
     * @param  {array} map
     * @param  {object} start
     * @param  {object} end
     * @return {array} travel path
     */
    static findShortestPath(map, start, end) {
        var queue = [{
            x: start.x,
            y: start.y,
            parent: null
        }];
        let visited = [];
        for (let y = 0; y < map.length; y++) {
            let row = [];
            visited.push(row);
        }
        while (queue.length > 0) {
            // Get current position
            let currentPos = queue.shift();

            // Explore surrounding
            for (let i = 0; i < this.surroundingCell.length; i++) {
                let newPos = {
                    x: currentPos.x + this.surroundingCell[i].x,
                    y: currentPos.y + this.surroundingCell[i].y
                };
                if (newPos.x == end.x && newPos.y == end.y) {
                    // Found end position, get full path from start to end
                    newPos.parent = currentPos;
                    return this.traceback(newPos);
                } else if (map[newPos.y][newPos.x] == Constants.CELL_TERRAIN_ABLE_TO_PASS ||
                    map[newPos.y][newPos.x] >= Constants.CELL_PLAYER_UNIT_START) {
                    // if current position is movable
                    if (!visited[newPos.y][newPos.x]) {
                        // and haven't visited
                        queue.push({
                            x: newPos.x,
                            y: newPos.y,
                            parent: currentPos
                        });
                        visited[newPos.y][newPos.x] = 1;
                    }
                }
            }
        }
    }

    /**
     * Trace back to starting position
     * @param  {object} end destination
     * @return {array} array from destination back to start
     */
    static traceback(end) {
        let path = [end];
        do {
            path.push(path[path.length - 1].parent);
        }
        while (path[path.length - 1].parent);
        path.reverse();
        return path;
    }


    /**
     * Find all possible moves from starting position
     * @param  {[type]} map
     * @param  {[type]} start
     * @param  {[type]} range unit move range
     * @return {array} result list of possible moves cell
     */
    static findPathWithinRange(map, start, range) {
        let queue = [{
            x: start.x,
            y: start.y,
            step: 0
        }];
        let result = [];
        let visited = [];
        for (let y = 0; y < map.length; y++) {
            let row = [];
            visited.push(row);
        }
        visited[start.y][start.x] = Constants.CELL_PLAYER_UNIT_START;
        while (queue.length > 0) {
            // Get current position
            let currentPos = queue.shift();
            let stepIndex = currentPos.step + 1;
            if (stepIndex > range)
                break;

            // Explore surrounding
            for (let i = 0; i < this.surroundingCell.length; i++) {
                let newPos = {
                    x: currentPos.x + this.surroundingCell[i].x,
                    y: currentPos.y + this.surroundingCell[i].y
                };
                if (map[newPos.y][newPos.x] == Constants.CELL_TERRAIN_ABLE_TO_PASS ||
                    map[newPos.y][newPos.x] >= Constants.CELL_PLAYER_UNIT_START) {
                    // if current position is movable
                    if (!visited[newPos.y][newPos.x]) {
                        // and haven't visited
                        queue.push({
                            x: newPos.x,
                            y: newPos.y,
                            step: stepIndex
                        });
                        result.push({
                            x: newPos.x,
                            y: newPos.y
                        });
                        visited[newPos.y][newPos.x] = stepIndex;
                    }
                }
            }
        }
        return result;
    }
}