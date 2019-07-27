class Constants {
    static get ACTUAL_TILE_SIZE() {
        return 16;
    }

    static get MAP_TILE_SIZE() {
        return 32;
    }

    static get TILE_TERRAIN_UNABLE_TO_PASS() {
        return -1;
    }
    static get TILE_TERRAIN_ABLE_TO_PASS() {
        return -2;
    }

    // Use index to mark unit on map
    // Player units index will start from zero
    // Unit with index = 0 will have 0 as value on map object
    static get TILE_PLAYER_UNIT_START() {
        return 0;
    }

    static get ACTION_MOVE() {
        return 1;
    }

    static get ACTION_WAIT() {
        return 2;
    }

    static get ACTION_ATTACK() {
        return 3;
    }

    static get MODE_UNIT_MOVE() {
        return 'MoveMode';
    }

    static get MODE_UNIT_ATTACK() {
        return 'AttackMode';
    }

    static get VIEW_PORT_WIDTH() {
        return 24;
    }

    static get VIEW_PORT_HEIGHT() {
        return 12;
    }
}