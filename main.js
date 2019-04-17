import Vue from 'vue'
import App from './App'
import store from './store'
import graceFullLoading from "./graceUI/components/graceFullLoading.vue";
import mixins from './components/my-components/Mixins.vue'
Vue.config.productionTip = false
Vue.component('pageLoading', graceFullLoading);
Vue.mixin(mixins)
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
