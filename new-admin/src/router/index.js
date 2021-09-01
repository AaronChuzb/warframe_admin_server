/*
 * @Date: 2021-09-01 22:15:06
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-01 22:37:27
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/content',
    component: Layout,
    redirect: '/content/category',
    name: 'Content',
    meta: { title: '基础内容', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'category',
        name: 'part',
        component: () => import('@/views/basic/category/list'),
        meta: { title: '基础分类', icon: 'form' }
      },
      {
        path: 'part',
        name: 'part',
        component: () => import('@/views/basic/part/list'),
        meta: { title: '遗物部件', icon: 'form' }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/user/list',
    name: 'Content',
    meta: { title: '设置管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/setting/user/list'),
        meta: { title: '用户管理', icon: 'form' }
      },
      {
        path: 'oss',
        name: 'oss',
        component: () => import('@/views/setting/oss/index'),
        meta: { title: 'oss配置', icon: 'form' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
