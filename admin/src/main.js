/*
 * @Date: 2021-08-20 21:01:12
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-21 20:53:07
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import http from './http/request.js'
import './plugins/element.js'
import '@/assets/iconfont/iconfont.css'
import { Message } from 'element-ui'
Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$msg = Message
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
