/*
 * @Date: 2021-09-01 22:15:06
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-10 01:10:34
 */
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: '',
    name: '',
    _id: '',
    avatar: '',
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ID: (state, _id) => {
    state._id = _id
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) =>{
    state.roles = roles
  }
}

const actions = {
  // 用户登录
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    const res = await login(username, password)
    console.log(res)
    commit('SET_TOKEN', res.token)
    setToken(res.token)
  },

  async userInfo({ commit }) {
    const res = await getInfo()
    commit('SET_NAME', res.nickname)
    commit('SET_ID', res._id)
    commit('SET_AVATAR', res.avatar)
    commit('SET_ROLES', res.roles)
  },

  // 用户登出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 删除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

