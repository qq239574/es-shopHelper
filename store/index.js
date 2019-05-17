import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        Jurisdiction:null //权限管理
    },
    mutations: {
        getJurisdiction(state, info) {
            state.Jurisdiction = info
        }
    }
})

export default store