<template lang='pug'>
.toolbar
	button(v-for='tool in tools'
		v-bind:data-tool='tool.name'
		v-bind:class='{ selected: toolSelected == tool.name}'
		v-on:click='onButtonClick')
		i(:class='tool.icon')
</template>

<script>
const $ = require('jquery')

export default {
	name: 'toolbar',
	data () {
		return {
			toolSelected: 'select',
			tools: [
				{ name: 'select', icon: 'fa-mouse-pointer'},
				{ name: 'hand', icon: 'fa-hand-paper-o'},
				{ name: 'eraser', icon: 'fa-eraser'},
				{ name: 'color', icon: 'fa-paint-brush'},
				{ name: 'path', icon: 'fa-vine'},
				{ name: 'line', icon: 'fa-rotate-90 fa-minus'},
				{ name: 'rectangle', icon: 'fa-square'},
				{ name: 'oval', icon: 'fa-circle'},
				{ name: 'math', icon: 'fa-times'}
			]
		}
	},
	methods: {
		onButtonClick: function (e) {
			const tool = $(e.target).data('tool')
			this.toolSelected = tool
		}
	},
	mounted () {
		console.log($(this.$el))
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
