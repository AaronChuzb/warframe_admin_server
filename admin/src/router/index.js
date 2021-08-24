/*
 * @Date: 2021-08-20 21:01:12
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-24 17:31:15
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Index from '../views/Index.vue'
import Home from '../views/Home.vue'
import WaframeList from '../views/Warframe/List.vue'
import WaframeEdit from '../views/Warframe/Edit.vue'
import UserList from '../views/User/List.vue'
import UserEdit from '../views/User/Edit.vue'
import MiniApp from '../views/Secret/MiniApp.vue'
import Oss from '../views/Secret/Oss.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { isPublic: true }
  },
  {
    path: '/',
    name: 'Index',
    component: Index,
    children:[
      { path: '/', component: Home },
      { path: '/warframe/list', component: WaframeList },
      { path: '/warframe/edit', component: WaframeEdit },
      { path: '/warframe/edit/:id', component: WaframeEdit, props: true },
      { path: '/user/list', component: UserList },
      { path: '/user/edit', component: UserEdit },
      { path: '/user/edit/:id', component: UserEdit, props: true },
      { path: '/secret/miniapp', component: MiniApp },
      { path: '/secret/oss', component: Oss },
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next)=>{
  if( !to.meta.isPublic && !sessionStorage.getItem('token')){
    return next('/login')
  }
  next()
})
export default router
