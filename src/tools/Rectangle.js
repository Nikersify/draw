import Tool from './Tool'
import RectangleObject from '../objects/Rectangle'
import store from '../store'

class RectangleTool extends Tool {
	constructor () {
		super()

		this.name = 'rectangle'
		this.icon = 'fa-square'
	}

	onDragStart (x, y) {
		const rect = new RectangleObject({
			x: x,
			y: y,
			width: 0,
			height: 0,
			color: 'blue'
		})

		store.objects.push(rect)

		const index = store.objects.indexOf(rect)
		const ref = store.objects[index]

		this.ref = ref
	}

	onDragMove (x, y) {
		this.ref.opts.width = x - this.ref.opts.x
		this.ref.opts.height = y - this.ref.opts.y
	}

	onDragFinish (x, y) {
		this.ref = null
	}
}

export default RectangleTool
