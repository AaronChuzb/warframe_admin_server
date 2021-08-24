/*
 * @Date: 2021-08-20 21:01:12
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-24 15:53:58
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import http from './http/request.js'
import api from './http/api.js'
import './plugins/element.js'
import '@/assets/iconfont/iconfont.css'
import { Message } from 'element-ui'
import util from './utils/index'
Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$api = api
Vue.prototype.$msg = Message
Vue.prototype.$util = util
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
