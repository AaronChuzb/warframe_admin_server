/*
 * @Date: 2021-09-01 22:15:06
 * @LastEditors: AaronChu
 * @LastEditTime: 2022-08-17 14:11:48
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
export const constantRoutes = [{
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path(.*)',
      component: () => import('@/views/redirect/index')
    }]
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
      meta: {
        title: '首页',
        icon: 'dashboard',
        affix: true
      }
    }]
  },
  {
    path: '/mine',
    component: Layout,
    redirect: '/mine/index',
    children: [{
      path: 'index',
      component: () => import('@/views/setting/mine/index'),
      meta: {
        title: '个人中心',
        icon: 'dashboard'
      },
      hidden: true
    }]
  },

]

// 动态路由
export const asyncRoutes = [
  {
    path: '/feed',
    component: Layout,
    redirect: '/feed',
    meta: {
      title: '内容反馈',
      icon: 'feed',
      role: 'feed'
    },
    children: [{
      path: 'feed',
      name: 'feed',
      component: () => import('@/views/feed/index'),
      meta: {
        title: '内容反馈',
        icon: 'feed',
        role: 'feed'
      }
    }]
  },
  {
    path: '/content',
    component: Layout,
    redirect: '/content/category',
    name: 'Content',
    meta: {
      title: '基础内容',
      icon: 'basic',
      role: 'basic'
    },
    children: [{
        path: 'category',
        name: 'category',
        component: () => import('@/views/basic/category/list'),
        meta: {
          title: '基础分类',
          icon: 'category',
          role: 'category'
        }
      },
      {
        path: 'part',
        name: 'part',
        component: () => import('@/views/basic/part/list'),
        meta: {
          title: '遗物部件',
          icon: 'part',
          role: 'part'
        }
      },
      {
        path: 'alias',
        name: 'alias',
        component: () => import('@/views/basic/alias/index'),
        meta: {
          title: '别名转换',
          icon: 'alias',
          role: 'alias'
        }
      }
    ]
  },
  {
    path: '/advanced',
    component: Layout,
    redirect: '/advanced/remain',
    name: 'Advanced',
    meta: {
      title: '进阶内容',
      icon: 'advanced',
      role: 'advanced'
    },
    children: [{
      path: 'remain',
      name: 'remain',
      component: () => import('@/views/advanced/remain/list'),
      meta: {
        title: '遗物',
        icon: 'remain',
        role: 'remain'
      }
    }, {
      path: 'rotation',
      name: 'rotation',
      component: () => import('@/views/advanced/rotation/index'),
      meta: {
        title: '钢铁奖励轮换',
        icon: 'rotation',
        role: 'rotation'
      }
    }]
  },
  {
    path: '/users',
    component: Layout,
    redirect: '/users',
    meta: {
      title: '用户列表',
      icon: 'users',
      role: 'users'
    },
    children: [{
      path: 'users',
      name: 'users',
      component: () => import('@/views/users/index'),
      meta: {
        title: '用户列表',
        icon: 'users',
        role: 'users'
      }
    }]
  },
  {
    path: '/client',
    component: Layout,
    redirect: '/client/people',
    name: 'Client',
    meta: {
      title: '客户端管理',
      icon: 'client',
      role: 'client'
    },
    children: [{
        path: 'people',
        name: 'people',
        component: () => import('@/views/client/people/index'),
        meta: {
          title: '鸣谢人员',
          icon: 'people',
          role: 'people'
        }
      },
      {
        path: 'suggest',
        name: 'suggest',
        component: () => import('@/views/client/suggest/index'),
        meta: {
          title: '意见反馈',
          icon: 'suggest',
          role: 'suggest'
        }
      },
      {
        path: 'log',
        name: 'log',
        component: () => import('@/views/client/log/index'),
        meta: {
          title: '日志管理',
          icon: 'log',
          role: 'log'
        }
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/client/about/index'),
        meta: {
          title: '关于内容',
          icon: 'about',
          role: 'about'
        }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/user',
    name: 'Setting',
    meta: {
      title: '设置管理',
      icon: 'setting',
      role: 'setting'
    },
    children: [{
        path: 'user',
        name: 'user',
        component: () => import('@/views/setting/user/list'),
        meta: {
          title: '管理员管理',
          icon: 'admin',
          role: 'user'
        }
      },
      {
        path: 'oss',
        name: 'oss',
        component: () => import('@/views/setting/oss/index'),
        meta: {
          title: 'oss配置',
          icon: 'oss',
          role: 'oss'
        }
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router