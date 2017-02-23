class DrawableObject {
	constructor () {
		this.id = Math.random().toString(36).substr(2, 26)
	}

	intersects (x, y) {
		return false
	}
}

export default DrawableObject
