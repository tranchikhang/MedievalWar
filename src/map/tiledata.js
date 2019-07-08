class TileData {

    static get TILE_TYPE() {
        return {
            '4': {
                'name': 'field',
                'moveType': Constants.TILE_TERRAIN_ABLE_TO_PASS
            },
            '7': {
                'name': 'grove',
                'moveType': Constants.TILE_TERRAIN_ABLE_TO_PASS
            },
            '12': {
                'name': 'moutain',
                'moveType': Constants.TILE_TERRAIN_UNABLE_TO_PASS
            },
            '13': {
                'name': 'peak',
                'moveType': Constants.TILE_TERRAIN_UNABLE_TO_PASS
            },
            '52': {
                'name': 'town',
                'moveType': Constants.TILE_TERRAIN_UNABLE_TO_PASS
            },
            '53': {
                'name': 'town',
                'moveType': Constants.TILE_TERRAIN_UNABLE_TO_PASS
            },
            '59': {
                'name': 'town',
                'moveType': Constants.TILE_TERRAIN_UNABLE_TO_PASS
            },
            '60': {
                'name': 'town',
                'moveType': Constants.TILE_TERRAIN_UNABLE_TO_PASS
            }
        };
    }
}