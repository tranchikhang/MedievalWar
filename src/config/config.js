class Config {
    static get ASSET_PATH() {
        return 'assets/';
    }

    static get FRAME_WIDTH() {
        return 16;
    }

    static get FRAME_HEIGHT() {
        return 16;
    }

    static get SPRITE_FILE() {
        return 'Toens_Medieval_v.1.0';
    }

    static get SPRITE_EXT() {
        return '.png';
    }

    static get WindowWidth() {
        return Map.getMapValue(Constants.VIEW_PORT_WIDTH);
    }

    static get WindowHeight() {
        return Map.getMapValue(Constants.VIEW_PORT_HEIGHT);
    }

    static get DialogTransitionTime() {
        return 1000;
    }
}