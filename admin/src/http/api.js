/*
 * @Date: 2021-08-20 23:00:23
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-26 12:02:09
 */
import request from './request'
const api = {
  /**
   * @description: 获取oss秘钥
   * @return {Promise}  
   */ 
  getOss() {
    return request.get('rest/osses')
  },
  // 新建用户
  createUser(data){
    return request.post('rest/users', data)
  },
  // 获取用户列表
  getUsers(page, pageSize, feilds, serach) {
    return request.get('rest/users', { 
      params: { page: page, pageSize: pageSize, search: { feilds: feilds, content: serach } }
    })
  },
  // 获取单个用户
  getUser(id){
    return request.get(`rest/users/${id}`)
  },
  // 更新用户信息
  updateUser(id, data){
    return request.put(`rest/users/${id}`, data)
  },
  // 删除用户
  deleteUser(id){
    return request.delete(`rest/users/${id}`)
  },

  // 新建分类
  createCategory(data){
    return request.post('rest/categorys', data)
  },
  // 获取分类列表
  getCategorys(page, pageSize, feilds, serach, option) {
    return request.get('rest/categorys', { 
      params: { page: page, pageSize: pageSize, search: { feilds: feilds, content: serach }, option }
    })
  },
  // 获取单个分类
  getCategory(id){
    return request.get(`rest/categorys/${id}`)
  },
  // 更新分类信息
  updateCategory(id, data){
    return request.put(`rest/categorys/${id}`, data)
  },
  // 删除分类
  deleteCategory(id){
    return request.delete(`rest/categorys/${id}`)
  }
}

export default api