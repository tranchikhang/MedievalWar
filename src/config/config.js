class Config {
    static get ASSET_PATH() {
        return 'assets/';
    }

    static get WindowWidth() {
        return Map.getMapValue(Constants.VIEW_PORT_WIDTH);
    }

    static get WindowHeight() {
        return Map.getMapValue(Constants.VIEW_PORT_HEIGHT);
    }
}