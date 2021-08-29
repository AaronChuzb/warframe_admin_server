/*
 * @Date: 2021-08-20 23:00:23
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-29 16:28:16
 */
import request from './request'
const api = {

  // 首页统计数据
  getTotal(){
    return request.get('analysis/total')
  },
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
  },
  
  


  // 新建部件
  createPart(data){
    return request.post('rest/parts', data)
  },
  // 获取部件列表
  getParts(page, pageSize, feilds, serach) {
    return request.get('rest/parts', { 
      params: { page: page, pageSize: pageSize, search: { feilds: feilds, content: serach } }
    })
  },
  // 获取单个部件
  getPart(id){
    return request.get(`rest/parts/${id}`)
  },
  // 更新部件信息
  updatePart(id, data){
    return request.put(`rest/parts/${id}`, data)
  },
  // 删除部件
  deletePart(id){
    return request.delete(`rest/parts/${id}`)
  },


  // 新建资源
  createResource(data){
    return request.post('rest/resources', data)
  },
  // 获取资源列表
  getResources(page, pageSize, feilds, serach) {
    return request.get('rest/resources', { 
      params: { page: page, pageSize: pageSize, search: { feilds: feilds, content: serach } }
    })
  },
  // 获取资源分类
  getResourcesTypeAndFrom() {
    return request.get('rest/categorys', {
      params: { page: 1, pageSize: 99, search: { feilds: ['name'], content: '资源-来源' }, option: 'resourceTypeAndFrom' }
    })
  },
  
  // 获取单个资源
  getResource(id){
    return request.get(`rest/resources/${id}`)
  },
  // 更新资源信息
  updateResource(id, data){
    return request.put(`rest/resources/${id}`, data)
  },
  // 删除资源
  deleteResource(id){
    return request.delete(`rest/resources/${id}`)
  },




  // 新建遗物
  createRemain(data){
    return request.post('rest/remains', data)
  },
  // 获取遗物列表
  getRemains(page, pageSize, feilds, serach, option) {
    return request.get('rest/remains', { 
      params: { page: page, pageSize: pageSize, search: { feilds: feilds, content: serach }, option }
    })
  },
  // 获取遗物分类
  getRemainsType() {
    return request.get('rest/categorys', {
      params: { page: 1, pageSize: 99, search: { feilds: ['name'], content: '遗物' }, option: 'remainType' }
    })
  },
  // 获取单个遗物
  getRemain(id, option){
    return request.get(`rest/remains/${id}`,{
      params: { option }
    })
  },
  // 更新遗物信息
  updateRemain(id, data){
    return request.put(`rest/remains/${id}`, data)
  },
  // 更新遗物入库状态
  updateRemainStatus(id, option, status){
    return request.put(`rest/remains/${id}`, { option, status } )
  },
  // 删除遗物
  deleteRemain(id){
    return request.delete(`rest/remains/${id}`)
  },


   // 新建战甲
   createWarframe(data){
    return request.post('rest/warframes', data)
  },
  // 获取战甲列表
  getWarframes(page, pageSize, feilds, serach, option) {
    return request.get('rest/warframes', { 
      params: { page: page, pageSize: pageSize, search: { feilds: feilds, content: serach }, option }
    })
  },
  // 获取战甲分类
  getWarframesType() {
    return request.get('rest/categorys', {
      params: { page: 1, pageSize: 99, search: { feilds: ['name'], content: '战甲' }, option: 'WarframeType' }
    })
  },
  // 获取单个战甲
  getWarframe(id, option){
    return request.get(`rest/warframes/${id}`,{
      params: { option }
    })
  },
  // 更新战甲信息
  updateWarframe(id, data){
    return request.put(`rest/warframes/${id}`, data)
  },
  // 更新战甲入库状态
  updateWarframeStatus(id, option, status){
    return request.put(`rest/warframes/${id}`, { option, status } )
  },
  // 删除战甲
  deleteWarframe(id){
    return request.delete(`rest/warframes/${id}`)
  }
}

export default api