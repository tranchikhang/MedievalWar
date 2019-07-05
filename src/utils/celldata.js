class CellData {

    static get CELL_TYPE() {
        return {
            '3': {
                'name': 'field',
                'moveType': Constants.CELL_TERRAIN_ABLE_TO_PASS
            },
            '5': {
                'name': 'grove',
                'moveType': Constants.CELL_TERRAIN_ABLE_TO_PASS
            },
            '11': {
                'name': 'moutain',
                'moveType': Constants.CELL_TERRAIN_UNABLE_TO_PASS
            },
            '12': {
                'name': 'peak',
                'moveType': Constants.CELL_TERRAIN_UNABLE_TO_PASS
            }
        };
    }
}