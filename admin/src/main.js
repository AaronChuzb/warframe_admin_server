/*
 * @Date: 2021-09-01 22:15:06
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-09 16:54:18
 */
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon
import '@/permission' // permission control
import { parseTime } from "@/utils/index"
import uploader from "@/utils/upload"
import deleteImg from "@/utils/deleteImg"
import _ from 'lodash'

Vue.use(ElementUI)

Vue.prototype.$parseTime = parseTime

Vue.prototype.$uploader = uploader
Vue.prototype.$deleteImg = deleteImg
Vue.prototype.$lodash = _

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
