class Transition {

    constructor(scene) {
        // Current scene
        this.scene = scene;


        this.content = this.scene.add.text(Config.WindowWidth / 4, Config.WindowHeight / 3, 'End Turn', {
            backgroundColor: '#4287f5',
            padding: {
                left: Map.getMapValue(5),
                top: Map.getMapValue(1),
                fontSize: '24px',
            }
        }).setVisible(false);
        this.content.setFixedSize(Config.WindowWidth / 2, Config.WindowHeight / 4);
    }

    /**
     * Show the transition menu
     * @return {none}
     */
    show() {
        this.content.setVisible(true);
    }

    /**
     * Hide the transition menu
     * @return {none}
     */
    hide() {
        this.content.setVisible(false);
    }
}