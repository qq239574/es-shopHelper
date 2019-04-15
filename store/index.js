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
        billDetail: {}, //订单管理页面跳转详情页面的缓存
        goodDetail: {}, //商品页面操作的商品信息缓存
    },
    mutations: {
        setBillDetail(state, info) {
            state.billDetail = info
        },
        setGoodDetail(state, info) {
            state.goodDetail = info;
        },
        login(state, userName) {
            state.userName = userName || '新用户';
            state.hasLogin = true;
        }
    }
})

export default store