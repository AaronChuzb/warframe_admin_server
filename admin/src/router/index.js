/*
 * @Date: 2021-08-20 21:01:12
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-29 15:53:13
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
      { path: '/resource/list', component: ResourceList, meta: { ttile: '资源列表' } },
      { path: '/remain/list', component: RemainList, meta: { ttile: '遗物列表' } },
      { path: '/remain/edit', component: RemainEdit, meta: { ttile: '新增遗物' } },
      { path: '/remain/edit/:id', component: RemainEdit, props: true, meta: { ttile: '编辑遗物' }},
      { path: '/warframe/list', component: WarframeList, meta: { ttile: '战甲列表' } },
      { path: '/warframe/edit', component: WarframeEdit, meta: { ttile: '新增战甲' } },
      { path: '/warframe/edit/:id', component: WarframeEdit, props: true, meta: { ttile: '编辑战甲' }},
      { path: '/weapon/list', component: WeaponList, meta: { ttile: '武器列表' } },
      { path: '/weapon/edit', component: WeaponEdit, meta: { ttile: '新增武器' } },
      { path: '/weapon/edit/:id', component: WeaponEdit, props: true, meta: { ttile: '编辑武器' }},
      { path: '/mod/list', component: ModList, meta: { ttile: 'Mod列表' } },
      { path: '/mod/edit', component: ModEdit, meta: { ttile: '新增Mod' } },
      { path: '/mod/edit/:id', component: ModEdit, props: true, meta: { ttile: '编辑Mod' }},
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
