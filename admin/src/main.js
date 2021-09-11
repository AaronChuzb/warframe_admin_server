/*
 * @Date: 2021-09-01 22:15:06
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-11 17:19:46
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

Vue.use(ElementUI)

Vue.prototype.$parseTime = parseTime

Vue.prototype.$uploader = uploader

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
