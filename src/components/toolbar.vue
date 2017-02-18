<template lang="pug">
button
	.hello hi
</template>

<script>
console.log('hello from compoenrt')

export default {
	name: 'toolbar',
	methods: {
		log: () => { console.log('hah') }
	}
}
</script>

