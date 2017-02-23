import _ from 'lodash'
import Tool from './Tool'
import RectangleObject from '../objects/Rectangle'
import store from '../store'

const ACCURACY = 5

class SelectTool extends Tool {
	constructor () {
		super()

		this.name = 'select'
		this.icon = 'fa-mouse-pointer'
		this.selected = []
		this.points = []

		this.throttled = {
			calculateSelectedTo: _.throttle(this.calculateSelectedTo, 1000/15).bind(this),
			calculatePopPoints: _.throttle(this.calculatePopPoints, 1000/15).bind(this),
		}
	}

	calculateSelectedTo (x, y) {
		let x1 = this.selection.x1
		let x2 = x
		let y1 = this.selection.y1
		let y2 = y

		if (x2 < x1) {
			const xt = x2
			x2 = x1
			x1 = xt
		}

		if (y2 < y1) {
			const yt = y2
			y2 = y1
			y1 = yt
		}

		for (let x = x1 - x1 % ACCURACY; x < x2; x = x + ACCURACY) {
			for (let y = y1 - y1 % ACCURACY; y < y2; y = y + ACCURACY) {
				if (this.points[x] && this.points[x][y]) {
					this.pushToSelected(this.points[x][y])
				} else {
					if (!this.points[x]) this.points[x] = []
					this.points[x][y] = []

					for (const object of store.objects) {
						if (object !== this.ref)
							if (this.selected.indexOf(object) === -1)
								if (object.intersects(x, y)) {
									this.points[x][y].push(object)
									this.pushToSelected(this.points[x][y])
								}
					}
				}
			}
		}
	}

	calculatePopPoints (x, y) {
		let x1 = this.selection.x1
		let x2 = x
		let y1 = this.selection.y1
		let y2 = y

		if (x2 < x1) {
			const xt = x2
			x2 = x1
			x1 = xt
		}

		if (y2 < y1) {
			const yt = y2
			y2 = y1
			y1 = yt
		}

		let c = []

		for (let x = x1 - x1 % ACCURACY; x < x2; x = x + ACCURACY)
			for (let y = y1 - y1 % ACCURACY; y < y2; y = y + ACCURACY)
				if (this.points[x] && this.points[x][y]) {
					for (let obj of this.points[x][y]) {
						if (!c[obj.id]) c[obj.id] = 0
						c[obj.id]++
					}
				}

		for (let sel of this.selected) {
			if (!c[sel.id]) {
				const index = this.selected.indexOf(sel)
				if (index !== -1) {
					this.selected.splice(index, 1)
				}
			}
		}
	}

	pushToSelected (points) {
		if (!Array.isArray(points))
			points = [points]

		for (let object of points) {
			if (this.selected.indexOf(object) === -1)
				this.selected.push(object)
		}
	}

	onDragStart (x, y) {
		this.selection = {
			x1: x,
			y1: y,
			x2: x,
			y2: y
		}

		this.selected = []
		this.points = []

		const r = new RectangleObject({
			x: x,
			y: y,
			width: 0,
			height: 0,
			color: 'orange'
		})

		store.objects.push(r)

		const index = store.objects.indexOf(r)
		const ref = store.objects[index]

		this.ref = ref
		this.ref.color = 'green'
	}

	onDragMove (x, y) {
		this.selection.x2 = x
		this.selection.y2 = y

		this.throttled.calculateSelectedTo(x, y)
		this.throttled.calculatePopPoints(x, y)

		this.ref.opts.width = this.selection.x2 - this.selection.x1
		this.ref.opts.height = this.selection.y2 - this.selection.y1
	}

	onDragFinish (x, y) {
		store.objects.splice(store.objects.indexOf(this.ref), 1)
	}
}

export default SelectTool
