/*
 * @Date: 2021-09-29 11:29:57
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-29 11:33:35
 */
import request from '@/utils/request'

export function create(data) {
  return request.post('/alias/create', data)
}

export function list(page, pageSize, search, user) {
  return request.get('/alias/list', {params:{
    page, pageSize, search, user
  }})
}

export function change(id, data) {
  return request.put(`/alias/edit/${id}`, data)
}

export function deleted(id) {
  return request.delete(`/alias/delete/${id}`)
}