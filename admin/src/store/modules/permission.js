/*
 * @Date: 2021-09-09 18:18:44
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-11 21:25:55
 */
import { asyncRoutes, constantRoutes } from '@/router'
import store from '@/store'
const state = {
  routes: [],
  addRoutes: []
}

// 匹配权限
function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.includes(route.meta.role)
  } else {
    return true
  }
}
// 筛选
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes) // 将过滤后的路由和constantRoutes存起来
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      // 如果是超级管理员直接拼
      if(store.getters.id == '61250a30e66c9709dc2082bb'){
        accessedRoutes = asyncRoutes
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
