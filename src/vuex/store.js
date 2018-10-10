import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    loginInfo: {},
    userInfo: '',
    ifLogin: false,
    loading: false,
    readCount: 0
  }
})
