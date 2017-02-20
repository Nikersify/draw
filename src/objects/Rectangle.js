import DrawableObject from './Drawable'

class RectangleObject extends DrawableObject {
	constructor (opts) {
		super()

		this.opts = opts
		this.calculatePoints()
	}

	calculatePoints () {
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

	intersects (x, y) {
		// refactor this
		let cx, cy
		if (this.opts.width > 0)
			cx = (x - this.opts.x > 0
				&& x - this.opts.x < this.opts.width)
		else
			cx = (x - this.opts.x < 0
				&& x - this.opts.x > this.opts.width)

		if (!cx) return cx

		if (this.opts.height > 0)
			cy = (y - this.opts.y > 0
				&& y - this.opts.y < this.opts.height)
		else
			cy = (y - this.opts.y < 0
				&& y - this.opts.y > this.opts.height)

		return cy
	}
}

export default RectangleObject
