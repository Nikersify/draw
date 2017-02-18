<template lang='pug'>
#app
	toolbar
	fabric
</template>

<script>
import Toolbar from './Toolbar.vue'
import Fabric from './Fabric.vue'

export default {
	name: 'app',
	components: { Toolbar, Fabric }
}
</script>
