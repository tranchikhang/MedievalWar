/**
 * Handle basic event on map
 */
class Map {

	/**
	 * Get postion in pixel on map
	 * for example grid map value is 2, then the result is 34*2
	 * @param  {int} gridValue grid value
	 * @param  {Boolean} isCenter if true, then get the center position of a tile
	 * @return {int} map value in pixel
	 */
	static getMapValue(gridValue, isCenter = false) {
		if (isCenter) {
			return Constants.MAP_TILE_SIZE * gridValue + Constants.MAP_TILE_SIZE / 2;
		}
		return Constants.MAP_TILE_SIZE * gridValue;
	}
}