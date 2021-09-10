/*
 * @Date: 2021-09-01 22:15:06
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-10 17:29:14
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import tagsView from './modules/tagsView'
import permission from './modules/permission'
import oss from './modules/oss'

Vue.use(Vuex)


const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    tagsView,
    permission,
    oss
  },
  getters
})

export default store
