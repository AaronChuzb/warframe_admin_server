/*
 * @Date: 2021-08-20 21:01:12
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-22 02:56:44
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Index from '../views/Index.vue'
import WaframeList from '../views/Warframe/List.vue'
import WaframeEdit from '../views/Warframe/Edit.vue'
import UserList from '../views/User/List.vue'
import UserEdit from '../views/User/Edit.vue'

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
    redirect: '/warframe/list',
    children:[
      { path: '/warframe/list', component: WaframeList },
      { path: '/warframe/edit', component: WaframeEdit },
      { path: '/warframe/edit/:id', component: WaframeEdit, props: true },
      { path: '/user/list', component: UserList },
      { path: '/user/edit', component: UserEdit },
      { path: '/user/edit/:id', component: UserEdit, props: true },
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
