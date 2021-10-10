/*
 * @Date: 2021-10-10 15:51:51
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-10 16:49:53
 */
import request from '@/utils/request'

export function create(data) {
  return request.post('/ratation/create', data)
}

export function getInfo(id) {
  return request.get(`/ratation/info/${id}`)
}

export function list() {
  return request.get('/ratation/list')
}

export function change(id, data) {
  return request.put(`/ratation/edit/${id}`, data)
}

export function deleted(id) {
  return request.delete(`/ratation/delete/${id}`)
}