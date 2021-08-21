/*
 * @Date: 2021-08-20 21:01:12
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-20 22:44:59
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import WaframeList from '../views/Warframe/List.vue'
import WaframeEdit from '../views/Warframe/Edit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    children:[
      { path: '/warframe/list', component: WaframeList },
      { path: '/warframe/edit', component: WaframeEdit },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
