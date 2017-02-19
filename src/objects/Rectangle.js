import DrawableObject from './Drawable'

class RectangleObject extends DrawableObject {
	constructor (opts) {
		super()

		this.opts = opts

		const { x, y, height, width } = this.opts
		this.points = [
			{ x: x, y: y },
			{ x: x + width, y: y },
			{ x: x + width, y: y + height},
			{ x: x, y: y + height}
		]
	}

	render (ctx) {
		ctx.fillStyle = this.opts.color
		ctx.fillRect(this.opts.x, this.opts.y, this.opts.width, this.opts.height)
	}

	intersects (x, y) { return true }
}

export default RectangleObject
