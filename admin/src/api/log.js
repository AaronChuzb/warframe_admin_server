/*
 * @Date: 2021-09-24 17:44:09
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-24 18:10:59
 */
import request from '@/utils/request'

export function list(page, pageSize, search, type, status) {
  return request.get('/log/list', {
    params: {
      page,
      pageSize,
      search,
      type,
      status
    }
  })
}

export function getType() {
  return request.get('/log/type')
}

export function createLog(data) {
  return request.post('/log/create', data)
}

export function getLogInfo(id) {
  return request.get(`/log/info/${id}`)
}

export function deleteLog(id) {
  return request.delete(`/log/delete/${id}`)
}

export function changeLog(id, data) {
  return request.put(`/log/change/${id}`, data)
}