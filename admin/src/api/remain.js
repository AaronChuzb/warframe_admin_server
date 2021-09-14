/*
 * @Date: 2021-09-14 15:04:14
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-14 18:27:36
 */
import request from '@/utils/request'


// 获取遗物分类
export function getType() {
  return request.get('/remain/type')
}

// 遗物部件搜索
export function search(search) {
  return request.get('/remain/search', {params:{
    search
  }})
}

// 创建遗物
export function create(data) {
  return request.post('/remain/create',data)
}

// 遗物列表
export function list(page, pageSize, search, sort, user, type) {
  return request.get('/remain/list', {params:{
    page, pageSize, search, sort, user, type
  }})
}

// 获取单个遗物详细信息
export function getInfo(id) {
  return request.get(`/remain/info/${id}`)
}
// 修改遗物
export function change(id, data) {
  return request.put(`/remain/edit/${id}`, data)
}
// 删除遗物
export function deleted(id) {
  return request.delete(`/remain/delete/${id}`)
}