<template lang='pug'>
canvas.fabric
</template>

<script>
import $ from 'jquery'
import bus from '../bus'
import RectangleObject from '../objects/Rectangle'

export default {
	name: 'fabric',

	beforeDestroy () {
		$(window).off('resize.fabric')
	},

	data () {
		return {
			ctx: null,
			objects: []
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
	},

	watch: {
		objects: function (val, oldVal) {
			this.redraw()
		}
	}
}
</script>

<style lang='sass'>
.fabric
	height: 100%
	width: 100%
</style>
