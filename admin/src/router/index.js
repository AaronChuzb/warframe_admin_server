/*
 * @Date: 2021-08-23 11:08:42
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-23 16:47:22
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index'
import Login from '../views/Login'
import WarframeEdit from '../views/Warframe/Edit.vue'
import WarframeList from '../views/Warframe/List.vue'

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
    name: 'Home',
    component: Index,
    redirect: '/warframe/list',
    children: [
      { path: '/warframe/list', component: WarframeList },
      { path: '/warframe/edit', component: WarframeEdit },
    ]
  },
]

const router = new VueRouter({
  routes
})
// 路由守卫
/* router.beforeEach((to, from, next)=>{
  if( !to.meta.isPublic && !sessionStorage.getItem('token')){
    return next('/login')
  }
  next()
}) */
export default router
