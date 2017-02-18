<template lang="pug">
.toolbar
	button#select
		i.fa-mouse-pointer
	button#hand.selected
		i.fa-hand-paper-o
	button#eraser
		i.fa-eraser
	button#color
		i.fa-paint-brush
	button#path 
		// getting desperate here
		i.fa-vine 
	button#line
		i.fa-rotate-90.fa-minus
	button#rectangle
		i.fa-square
	button#oval
		i.fa-circle
	button#math
		i.fa-times
</template>

<script>
export default {
	name: 'toolbar'
}
</script>

