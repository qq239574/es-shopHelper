import Vue from 'vue'
import App from './App'
import store from './store'
import graceFullLoading from "./graceUI/components/graceFullLoading.vue";
import graceLoading from './graceUI/components/graceLoading.vue';
import mixins from './components/my-components/Mixins.vue'

Vue.config.productionTip = false
Vue.component('pageLoading', graceFullLoading);
Vue.component('loadMore', graceLoading); //底部加载
Vue.mixin(mixins)
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue(Object.assign({
	store
},App))
app.$mount()