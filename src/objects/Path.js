import DrawableObject from './Drawable'

class PathObject extends DrawableObject {
	constructor (opts) {
		super()

		this.opts = opts
		this.points = this.opts.points
	}

	render (ctx) {
		if (this.points.length === 0) return

		ctx.lineWidth = this.opts.width
		ctx.strokeStyle = this.opts.color
		ctx.beginPath()
		ctx.moveTo(this.points[0].x, this.points[0].y)

		for (let i = 1; i < this.points.length; i++) {
			ctx.lineTo(this.points[i].x, this.points[i].y)
		}

		ctx.stroke()
	}

	intersects (x, y) {
		for (const p of this.points) {
			let d = Math.sqrt(Math.pow(p.x - x, 2) + Math.pow(p.y - y, 2))

			if (d <= this.opts.width * 1.5)
				return true
		}

		return false
	}
}

export default PathObject
