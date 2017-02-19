class DrawableObject {
	constructor (ctx) {
		console.log('called', ctx)
	}

	intersects (x, y) {
		return false
	}
}

export default DrawableObject
