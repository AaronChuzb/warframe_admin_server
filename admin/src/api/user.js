/*
 * @Date: 2021-09-01 22:15:06
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-28 15:00:39
 */
import request from '@/utils/request'

export function login(username, password) {
  return request.post('/user/login', {
    username,
    password
  })
}

export function getInfo() {
  return request.get('/user/info')
}

export function list(page, pageSize, search) {
  return request.get('/user/list', {
    params: {
      page,
      pageSize,
      search
    }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function getOssInfo() {
  return request.get('/oss')
}

export function changeStatus(id, status) {
  return request.put(`/user/stop/${id}`, {
    status
  })
}

export function creatUser(data) {
  return request.post('/user/create', data)
}

export function getUserInfo(id) {
  return request.get(`/user/userinfo/${id}`)
}

export function deleteUser(id) {
  return request.delete(`/user/delete/${id}`)
}

export function changeUser(id, data) {
  return request.put(`/user/change/${id}`, data)
}


// 用户自行操作部分
export function changeMyPass(oldPass, newPass) {
  return request.put(`/user/change_my_pass`, {
    oldPass,
    newPass
  })
}