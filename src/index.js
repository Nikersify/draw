const $ = require('jquery')
const Vue = require('vue')
window._ = require('lodash')

// const Toolbar = require('./components/toolbar.vue')
import App from './components/App.vue'

let vm = new Vue({
	el: '#app',
	render: h => h(App)
})
