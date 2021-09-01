/*
 * @Date: 2021-08-20 21:01:12
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-31 19:39:44
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
import RemainList from '../views/Remain/List.vue'
import RemainEdit from '../views/Remain/Edit.vue'
import WarframeList from '../views/Warframe/List.vue'
import WarframeEdit from '../views/Warframe/Edit.vue'
import WeaponList from '../views/Weapon/List.vue'
import WeaponEdit from '../views/Weapon/Edit.vue'
import ModList from '../views/Mod/List.vue'
import ModEdit from '../views/Mod/Edit.vue'
import ResourceList from '../views/Resource/List.vue'

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
      { path: '/', name: 'Dashboard', component: Home, meta: { title: '首页' } },
      { path: '/user/list', component: UserList, meta: { title: '管理员列表' } },
      { path: '/user/edit', component: UserEdit, meta: { title: '新增管理员' } },
      { path: '/user/edit/:id', component: UserEdit, props: true, meta: { title: '编辑管理员' } },
      { path: '/secret/miniapp', component: MiniApp, meta: { title: '小程序信息' } },
      { path: '/secret/oss', component: Oss, meta: { title: 'OSS信息' } },
      { path: '/category/list', component: CategoryList, meta: { title: '分类列表' } },
      { path: '/category/edit', component: CategoryEdit, meta: { title: '新增分类' } },
      { path: '/category/edit/:id', component: CategoryEdit, props: true, meta: { title: '编辑分类' }},
      { path: '/part/list', component: PartList, meta: { title: '部件列表' } },
      { path: '/resource/list', component: ResourceList, meta: { title: '资源列表' } },
      { path: '/remain/list', component: RemainList, meta: { title: '遗物列表' } },
      { path: '/remain/edit', component: RemainEdit, meta: { title: '新增遗物' } },
      { path: '/remain/edit/:id', component: RemainEdit, props: true, meta: { title: '编辑遗物' }},
      { path: '/warframe/list', component: WarframeList, meta: { title: '战甲列表' } },
      { path: '/warframe/edit', component: WarframeEdit, meta: { title: '新增战甲' } },
      { path: '/warframe/edit/:id', component: WarframeEdit, props: true, meta: { title: '编辑战甲' }},
      { path: '/weapon/list', component: WeaponList, meta: { title: '武器列表' } },
      { path: '/weapon/edit', component: WeaponEdit, meta: { title: '新增武器' } },
      { path: '/weapon/edit/:id', component: WeaponEdit, props: true, meta: { title: '编辑武器' }},
      { path: '/mod/list', component: ModList, meta: { title: 'Mod列表' } },
      { path: '/mod/edit', component: ModEdit, meta: { title: '新增Mod' } },
      { path: '/mod/edit/:id', component: ModEdit, props: true, meta: { title: '编辑Mod' }},
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
