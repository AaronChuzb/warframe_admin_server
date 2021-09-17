/*
 * @Date: 2021-09-01 22:15:06
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-17 15:05:24
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: ()=> import('@/views/redirect/index')
      }
    ]
  },
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
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard', affix: true }
    }]
  },
  
  // {
  //   path: '/setting',
  //   component: Layout,
  //   redirect: '/setting/user/list',
  //   name: 'Content',
  //   meta: { title: '设置管理', icon: 'el-icon-set-up' },
  //   children: [
  //     {
  //       path: 'user',
  //       name: 'user',
  //       component: () => import('@/views/setting/user/list'),
  //       meta: { title: '管理员管理', icon: 'admin' }
  //     },
  //     {
  //       path: 'oss',
  //       name: 'oss',
  //       component: () => import('@/views/setting/oss/index'),
  //       meta: { title: 'oss配置', icon: 'oss' }
  //     }
  //   ]
  // },
  // 404 page must be placed at the end !!!
  
]

// 动态路由
export const asyncRoutes = [
  {
    path: '/content',
    component: Layout,
    redirect: '/content/category',
    name: 'Content',
    meta: { title: '基础内容', icon: 'basic', role: 'basic' },
    children: [
      {
        path: 'category',
        name: 'category',
        component: () => import('@/views/basic/category/list'),
        meta: { title: '基础分类', icon: 'category', role: 'category' }
      },
      {
        path: 'part',
        name: 'part',
        component: () => import('@/views/basic/part/list'),
        meta: { title: '遗物部件', icon: 'part', role: 'part' }
      }
    ]
  },
  {
    path: '/advanced',
    component: Layout,
    redirect: '/advanced/remain',
    name: 'Advanced',
    meta: { title: '进阶内容', icon: 'advanced', role: 'advanced' },
    children: [
      {
        path: 'remain',
        name: 'remain',
        component: () => import('@/views/advanced/remain/list'),
        meta: { title: '遗物', icon: 'remain', role: 'advanced' }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/user',
    name: 'Setting',
    meta: { title: '设置管理', icon: 'setting', role: 'setting' },
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/setting/user/list'),
        meta: { title: '管理员管理', icon: 'admin', role: 'user' }
      },
      {
        path: 'oss',
        name: 'oss',
        component: () => import('@/views/setting/oss/index'),
        meta: { title: 'oss配置', icon: 'oss', role: 'oss' }
      }
    ]
  }
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
