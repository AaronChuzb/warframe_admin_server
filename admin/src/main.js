/*
 * @Date: 2021-08-23 11:08:42
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-23 18:13:26
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import http from './http/request.js'
import message from 'vuetify-message-snackbar';
Vue.use(message,{});
Vue.config.productionTip = false
Vue.prototype.http = http
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
