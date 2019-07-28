/**
 * Class for handling camera
 */
class Camera {

    constructor(scene) {
        this.scene = scene;
        this.camera = this.scene.cameras.main;
        this.worldView = this.camera.worldView;
    }

    /**
     * Move camera horizontal
     * @param  {int} tile number of tiles to move
     * @return {none}
     */
    scrollX(tile) {
        this.camera.scrollX = this.camera.scrollX + Map.getMapValue(tile);
    }

    /**
     * Move camera vertical
     * @param  {int} tile number of tiles to move
     * @return {none}
     */
    scrollY(tile) {
        this.camera.scrollY = this.camera.scrollY + Map.getMapValue(tile);
    }

    /**
     * get camera offset from left border
     * @return {int}
     */
    getOffsetX() {
        return this.camera.scrollX/Constants.MAP_TILE_SIZE;
    }

    /**
     * Get camera offset from top border
     * @return {int}
     */
    getOffsetY() {
        return this.camera.scrollY/Constants.MAP_TILE_SIZE;
    }
}