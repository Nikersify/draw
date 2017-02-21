<template lang='pug'>
.toolbar
	button(v-for='tool in tools'
		v-bind:data-tool='tool.name'
		v-bind:class='{ selected: toolSelectedName == tool.name}'
		v-on:click='onButtonClick')
		i(:class='tool.icon')
</template>

<script>
import $ from 'jquery'
import bus from '../bus'
import RectangleTool from '../tools/Rectangle'
import PathTool from '../tools/Path'

export default {
	name: 'toolbar',
	computed: {
		toolSelectedName: function () {
			if (this.toolSelected)
				return this.toolSelected.name
			else return null
		}
	},
	data () {
		return {
			toolSelected: null,
			tools: [
				new RectangleTool(),
				new PathTool()
				// { name: 'select', icon: 'fa-mouse-pointer'},
				// { name: 'hand', icon: 'fa-hand-paper-o'},
				// { name: 'eraser', icon: 'fa-eraser'},
				// { name: 'color', icon: 'fa-paint-brush'},
				// { name: 'path', icon: 'fa-vine'},
				// { name: 'line', icon: 'fa-rotate-90 fa-minus'},
				// { name: 'rectangle', icon: 'fa-square'},
				// { name: 'oval', icon: 'fa-circle'},
				// { name: 'math', icon: 'fa-times'}
			]
		}
	},
	methods: {
		onButtonClick (e) {
			const tool = $(e.target).data('tool')
			this.selectTool(tool)
		},
		selectTool (tool) {
			for (const t of this.tools) {
				if (t.name === tool) {
					this.toolSelected = t
					return this.toolSelected
				}
			}
			return null
		}
	},
	mounted () {
		bus.$on('fabric-drag-start', (x, y) => {
			if (this.toolSelected)
				this.toolSelected.onDragStart(x, y)
		})
		bus.$on('fabric-drag-move', (x, y) => {
			if (this.toolSelected)
				this.toolSelected.onDragMove(x, y)
		})
		bus.$on('fabric-drag-finish', (x, y) => {
			if (this.toolSelected)
				this.toolSelected.onDragFinish(x, y)
		})

		this.selectTool('rectangle')
	}
}
</script>

<style lang='scss'>
.toolbar
	margin: 5px
	position: absolute
	opacity: 0.5
	transition: ease-in 0.2s

	&:hover
		opacity: 1

	button
		font-size: 20
		width: 2em
		height: 2em
		color: white
		background: none
		border: 0
		outline: 0
		cursor: pointer
		transition: ease-in 0.1s

		&:hover
			background-color: rgba(white, 0.5)

		&.selected
			box-shadow: 0px -3px 0px rgba(white, 0.5) inset

		i
			pointer-events: none

</style>
