/*
 * @Date: 2021-08-20 21:01:12
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-25 17:04:48
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
import WarframeList from '../views/Warframe/List.vue'
import WarframeEdit from '../views/Warframe/Edit.vue'
import RemainList from '../views/Remain/List.vue'
import RemainEdit from '../views/Remain/Edit.vue'
import PoleList from '../views/Pole/List.vue'
import PoleEdit from '../views/Pole/Edit.vue'
import TypeList from '../views/Type/List.vue'
import TypeEdit from '../views/Type/Edit.vue'
import PrimePartList from '../views/PrimePart/List.vue'
import PrimePartEdit from '../views/PrimePart/Edit.vue'


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
      { path: '/warframe/list', component: WarframeList },
      { path: '/warframe/edit', component: WarframeEdit },
      { path: '/warframe/edit/:id', component: WarframeEdit, props: true },
      { path: '/user/list', component: UserList },
      { path: '/user/edit', component: UserEdit },
      { path: '/user/edit/:id', component: UserEdit, props: true },
      { path: '/secret/miniapp', component: MiniApp },
      { path: '/secret/oss', component: Oss },
      { path: '/remain/list', component: RemainList },
      { path: '/remain/edit', component: RemainEdit },
      { path: '/remain/edit/:id', component: RemainEdit, props: true },
      { path: '/pole/list', component: PoleList },
      { path: '/pole/edit', component: PoleEdit },
      { path: '/pole/edit/:id', component: PoleEdit, props: true },
      { path: '/type/list', component: TypeList },
      { path: '/type/edit', component: TypeEdit },
      { path: '/type/edit/:id/:type', component: TypeEdit, props: true },
      { path: '/primepart/list', component: PrimePartList },
      { path: '/primepart/edit', component: PrimePartEdit },
      { path: '/primepart/edit/:id', component: PrimePartEdit, props: true },
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
