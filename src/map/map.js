/**
 * Handle basic event on map
 */
class Map {

	/**
	 * Get postion in pixel on map
	 * for example grid map value is 2, then the result is 34*2
	 * @param  {int} gridValue grid value
	 * @param  {Boolean} isCenter if true, then get the center position of a cell
	 * @return {int} map value in pixel
	 */
	static getMapValue(gridValue, isCenter = true) {
		if (isCenter) {
			return Constants.MAP_CELL_SIZE * gridValue + Constants.MAP_CELL_SIZE / 2;
		}
		return Constants.MAP_CELL_SIZE * gridValue;
	}
}