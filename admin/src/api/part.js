/*
 * @Date: 2021-09-02 17:25:58
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-20 22:08:56
 */
import request from '@/utils/request'

export function create(data) {
  return request.post('/part/create', data)
}

export function list(page, pageSize, search, sort, user) {
  return request.get('/part/list', {params:{
    page, pageSize, search, sort, user
  }})
}

export function change(id, data) {
  return request.put(`/part/edit/${id}`, data)
}

export function deleted(id) {
  return request.delete(`/part/delete/${id}`)
}