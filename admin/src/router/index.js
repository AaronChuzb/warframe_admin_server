/*
 * @Date: 2021-08-20 21:01:12
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-26 16:07:20
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
import PartList from '../views/Part/List.vue'
import PartEdit from '../views/Part/Edit.vue'
import RemainList from '../views/Remain/List.vue'
import RemainEdit from '../views/Remain/Edit.vue'

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
      { path: '/', name: 'Dashboard', component: Home, meta: { ttile: '首页' } },
      { path: '/user/list', component: UserList, meta: { ttile: '管理员列表' } },
      { path: '/user/edit', component: UserEdit, meta: { ttile: '新增管理员' } },
      { path: '/user/edit/:id', component: UserEdit, props: true, meta: { ttile: '编辑管理员' } },
      { path: '/secret/miniapp', component: MiniApp, meta: { ttile: '小程序信息' } },
      { path: '/secret/oss', component: Oss, meta: { ttile: 'OSS信息' } },
      { path: '/category/list', component: CategoryList, meta: { ttile: '分类列表' } },
      { path: '/category/edit', component: CategoryEdit, meta: { ttile: '新增分类' } },
      { path: '/category/edit/:id', component: CategoryEdit, props: true, meta: { ttile: '编辑分类' }},
      { path: '/part/list', component: PartList, meta: { ttile: '部件列表' } },
      { path: '/part/edit', component: PartEdit, meta: { ttile: '新增部件' } },
      { path: '/part/edit/:id', component: PartEdit, props: true, meta: { ttile: '编辑部件' }},
      { path: '/remain/list', component: RemainList, meta: { ttile: '遗物列表' } },
      { path: '/remain/edit', component: RemainEdit, meta: { ttile: '新增遗物' } },
      { path: '/remain/edit/:id', component: RemainEdit, props: true, meta: { ttile: '编辑遗物' }},
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
