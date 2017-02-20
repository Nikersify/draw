<template lang='pug'>
canvas.fabric
</template>

<script>
import $ from 'jquery'
import bus from '../bus'
import RectangleObject from '../objects/Rectangle'
import store from '../store'

export default {
	name: 'fabric',

	beforeDestroy () {
		$(window).off('resize.fabric')
	},

	data () {
		return {
			ctx: null,
			objects: store.objects
		}
	},

	methods: {
		clearCanvas () {
			const width = this.$el.width
			const height = this.$el.height
			this.ctx.clearRect(0, 0, width, height)
		},
		redraw () {
			this.clearCanvas()
			for (let object of this.objects) {
				object.render(this.ctx)
			}
		},
		onResize () {
			this.$el.width = window.innerWidth
			this.$el.height = window.innerHeight
			this.redraw()
		}
	},

	mounted () {
		this.ctx = this.$el.getContext('2d')
		this.onResize()

		$(window).on('resize.fabric', this.onResize)

		const rect = new RectangleObject({
			x: 100,
			y: 100,
			width: 100,
			height: 100,
			color: 'blue'
		})

		this.objects.push(rect)

		$(this.$el).on('mousedown.e', (e) => {
			bus.$emit('fabric-drag-start', e.offsetX, e.offsetY)

			$(window).on('mousemove.e', (e) => {
				bus.$emit('fabric-drag-move', e.offsetX, e.offsetY)
			})

			$(window).one('mouseup.e', (e) => {
				bus.$emit('fabric-drag-finish', e.offsetX, e.offsetY)

				$(window).off('mousemove.e')
			})
		})

		bus.$on('fabric-do-redraw', this.redraw)

		// temporary
		$(window).on('mousemove', (e) => {
			for (const object of this.objects) {
				if (object.intersects(e.offsetX, e.offsetY))
					object.opts.color = 'red'
				else
					object.opts.color = 'blue'
			}
		})
	},

	watch: {
		objects: {
			handler: function (val, oldVal) {
				this.redraw()
			},
			deep: true
		}
	}
}
</script>

<style lang='sass'>
.fabric
	height: 100%
	width: 100%
	cursor: default
</style>
