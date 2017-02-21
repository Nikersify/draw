import Tool from './Tool'
import PathObject from '../objects/Path'
import store from '../store'

class PathTool extends Tool {
	constructor () {
		super()

		this.name = 'path'
		this.icon = 'fa-vine'
	}

	onDragStart (x, y) {
		const path = new PathObject({
			points: [
				{ x: x, y: y }
			],
			color: 'green',
			width: 5
		})

		store.objects.push(path)

		const index = store.objects.indexOf(path)
		const ref = store.objects[index]

		this.ref = ref
	}

	onDragMove (x, y) {
		const p = this.ref.points[this.ref.points.length - 1]
		let d = Math.sqrt(Math.pow(p.x - x, 2) + Math.pow(p.y - y, 2))
		if (d > 3)
			this.ref.points.push({
				x: x,
				y: y
			})
	}

	onDragFinish (x, y) {
		this.ref = null
	}
}

export default PathTool
