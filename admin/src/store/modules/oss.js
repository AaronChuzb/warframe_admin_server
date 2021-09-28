/*
 * @Date: 2021-09-10 17:23:37
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-28 15:42:15
 */
/*
 * @Date: 2021-09-01 22:15:06
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-02 00:31:12
 */
import { getOssInfo } from '@/api/user'
const state = {
  oss: {
    _id: "",
    region: "",
    accessKeyId: "",
    accessKeySecret: "",
    bucket: "",
  }

}

const mutations = {
  CHANGE_OSS: (state, oss) => {
    state.oss = oss
  }
}

const actions = {
  async getOss({ commit }){
    const res = await getOssInfo()
    let oss = res
    commit('CHANGE_OSS', oss)
  },
  
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}