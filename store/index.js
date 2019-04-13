import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        /**
         * 是否需要强制登录
         */
        forcedLogin: false,
        hasLogin: false,
        userName: "",
        billDetail: {},//订单管理页面跳转详情页面的缓存
    },
    mutations: {
        setBillDetail(state, info) {
            state.billDetail = info
        },
        login(state, userName) {
            state.userName = userName || '新用户';
            state.hasLogin = true;
        }
    }
})

export default store