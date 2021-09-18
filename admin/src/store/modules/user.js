/*
 * @Date: 2021-09-01 22:15:06
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-18 15:01:59
 */
import { login, logout, getInfo } from '@/api/user'
import { setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: '',
    name: '',
    username: '',
    _id: '',
    avatar: '',
    contact: '',
    game_id: '',
    remark: '',
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
  SET_NUM: (state, username) => {
    state.username = username
  },
  SET_ID: (state, _id) => {
    state._id = _id
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_CONTACT: (state, contact)=>{
    state.contact = contact
  },
  SET_GAME: (state, game_id)=>{
    state.game_id = game_id
  },
  SET_REMARK: (state, remark)=>{
    state.remark = remark
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
    commit('SET_NUM', res.username)
    commit('SET_ID', res._id)
    commit('SET_AVATAR', res.avatar)
    commit('SET_CONTACT', res.contact)
    commit('SET_REMARK', res.remark)
    commit('SET_GAME', res.game_id)
    commit('SET_ROLES', res.roles)
  },

  // 用户登出
  logout({ commit, state }) {
    removeToken() // must remove  token  first
    resetRouter()
    commit('RESET_STATE')
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

