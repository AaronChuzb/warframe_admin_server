/*
 * @Date: 2021-09-02 12:27:52
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-16 20:45:00
 */
import router from './router'
import { resetRouter } from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist


router.onReady(async () => {
  const hasToken = getToken()
  if (hasToken) {
    resetRouter()
    const accessRoutes = await store.dispatch('permission/generateRoutes', store.getters.roles)
    router.options.routes = store.getters.permission_route
    accessRoutes.forEach(item=>{
      router.addRoute(item)
    })
  }
  router.addRoute({ path: '*', redirect: '/404', hidden: true })

})

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)
  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // 获取用户信息
          await store.dispatch('user/userInfo')
          // console.log(accessRoutes)
          const accessRoutes = await store.dispatch('permission/generateRoutes', store.getters.roles)
          router.options.routes = store.getters.permission_route
          accessRoutes.forEach(item=>{
            router.addRoute(item)
          })
          next({ ...to, replace: true })
        } catch (error) {
          console.log(error)
          // 失败后代表有人篡改token，删除token后返回登录页
          await store.dispatch('user/resetToken')
          Message.error('用户信息错误，需要重新登录！')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
