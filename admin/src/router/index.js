/*
 * @Date: 2021-08-20 21:01:12
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-26 11:33:52
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Index from '../views/Index.vue'
import Home from '../views/Home.vue'
import UserList from '../views/User/List.vue'
import UserEdit from '../views/User/Edit.vue'
import MiniApp from '../views/Secret/MiniApp.vue'
import Oss from '../views/Secret/Oss.vue'
import CategoryList from '../views/Category/List.vue'
import CategoryEdit from '../views/Category/Edit.vue'

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
      { path: '/user/list', component: UserList },
      { path: '/user/edit', component: UserEdit },
      { path: '/user/edit/:id', component: UserEdit, props: true },
      { path: '/secret/miniapp', component: MiniApp },
      { path: '/secret/oss', component: Oss },
      { path: '/category/list', component: CategoryList },
      { path: '/category/edit', component: CategoryEdit },
      { path: '/category/edit/:id', component: CategoryEdit, props: true },
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
