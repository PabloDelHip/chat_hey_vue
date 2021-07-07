import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user_name: ''
  },
  mutations: {
    assignUsername(state, user_name) {
      state.user_name = user_name
    }
  },
  actions: {
  },
  modules: {
  }
})
