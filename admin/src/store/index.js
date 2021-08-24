/*
 * @Date: 2021-08-24 18:06:51
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-24 18:25:53
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    oss: {
      region: '',
      accessKeyId: '',
      accessKeySecret: '',
      bucket: ''
    }
  },
  getters: {
    getOss(state) {
      return state.oss
    }
  },
  mutations: {
    updataOss(state, obj) {
      const { region, accessKeyId, accessKeySecret, bucket } = obj
      state.oss = { region, accessKeyId, accessKeySecret, bucket }
    }
  }
})

export default store