class StatusMenu {

    constructor(scene, level) {
        // Current scene
        this.scene = scene;
        this.level = level;

        this.isVisible = true;

        this.menuWidth = Map.getMapValue(3);
        this.menuHeight = Map.getMapValue(1);
        this.menuOffsetSide = 0;
        this.menuOffsetTop = 0;

        this.unitName = this.scene.add.text(0, 0, '', {
            backgroundColor: '#4287f5',
            padding: {
                left: 5,
                top: 5
            }
        }).setVisible(false);
        // Set text box size
        this.unitName.setFixedSize(this.menuWidth, this.menuHeight);

        this.unitHp = this.scene.add.text(0, 0, '', {
            backgroundColor: '#4287f5',
            padding: {
                left: 5,
                top: 5
            }
        }).setVisible(false);
        // Set text box size
        this.unitHp.setFixedSize(this.menuWidth, this.menuHeight);
    }

    /**
     * Show the status menu
     * @param  {int} x current cursor position x
     * @param  {int} y current cursor position y
     * @param  {object} focused unit
     * @return {none}   [description]
     */
    show(x, y, unit) {
        this.isVisible = true;
        let isRightMenu = true;

        if (Map.getMapValue(x) + this.menuWidth >= Config.WindowWidth) {
            isRightMenu = false;
        }
        if (isRightMenu) {
            this.menuOffsetSide = Map.getMapValue(Constants.VIEW_PORT_WIDTH - 4 + this.scene.camera.getOffsetX());
        } else {
            this.menuOffsetSide = Map.getMapValue(1 + this.scene.camera.getOffsetX());
        }
        this.unitName.setX(this.menuOffsetSide);
        this.unitHp.setX(this.menuOffsetSide);
        this.menuOffsetTop = Map.getMapValue(1 + this.scene.camera.getOffsetY());
        this.unitName.setY(this.menuOffsetTop);
        this.unitName.setVisible(true);
        this.unitName.text = unit.name;
        this.unitHp.setY(this.menuOffsetTop + Map.getMapValue(1));
        this.unitHp.setVisible(true);
        this.unitHp.text = unit.currentHealth + '/' + unit.health;
    }

    /**
     * Hide the status menu
     * @return {none}
     */
    hide() {
        this.isVisible = false;
        this.unitName.setVisible(false);
        this.unitHp.setVisible(false);
    }
}