/*
 * @Date: 2021-09-02 17:25:58
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-13 15:56:19
 */
import request from '@/utils/request'
// 创建分类
export function create(data) {
  return request.post('/category/create',data)
}
// 分类列表
export function list(page, pageSize, search, sort, user) {
  return request.get('/category/list', {params:{
    page, pageSize, search, sort, user
  }})
}
// 选择上级分类搜索选择
export function search(search) {
  return request.get('/category/search', {params:{
    search
  }})
}
// 获取单个分类详细信息
export function getInfo(id) {
  return request.get(`/category/info/${id}`)
}
// 修改分类
export function change(id, data) {
  return request.put(`/category/edit/${id}`, data)
}
// 删除分类
export function deleted(id) {
  return request.delete(`/category/delete/${id}`)
}