import Vue from 'vue'
import App from './components/App.vue'

import $ from 'jquery'
window.$ = $

let vm = new Vue({
	el: '#app',
	render: h => h(App)
})
