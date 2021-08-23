/*
 * @Date: 2021-08-23 11:27:08
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-23 13:03:19
 */
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import { VSnackbar, VBtn, VIcon } from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify);
Vue.component("v-snackbar", VSnackbar);
Vue.component("v-btn", VBtn);
Vue.component("v-icon", VIcon);

export default new Vuetify({
  icons: {
    iconfont: 'mdi', // 默认值 - 仅用于展示目的
  },
});
