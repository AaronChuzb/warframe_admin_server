/*
 * @Date: 2021-08-20 21:01:12
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-21 00:14:35
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './plugins/element.js'
import '@/assets/iconfont/iconfont.css'
import { Message } from 'element-ui'
Vue.config.productionTip = false
Vue.http = Vue.prototype.$http = axios
Vue.prototype.$msg = Message
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
