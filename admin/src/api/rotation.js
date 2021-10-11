/*
 * @Date: 2021-10-10 15:51:51
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-11 14:09:34
 */
import request from '@/utils/request'

export function create(data) {
  return request.post('/rotation/create', data)
}

export function getInfo(id) {
  return request.get(`/rotation/info/${id}`)
}

export function list() {
  return request.get('/rotation/list')
}

export function change(id, data) {
  return request.put(`/rotation/edit/${id}`, data)
}
export function change_rotation(id, data) {
  return request.put(`/rotation/edit_rotation/${id}`, data)
}

export function deleted(id) {
  return request.delete(`/rotation/delete/${id}`)
}