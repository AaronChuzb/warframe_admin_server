/*
 * @Date: 2021-09-01 22:15:06
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-02 16:29:37
 */
import request from '@/utils/request'

export function login(username, password) {
  return request.post('/user/login',{
    username,
    password
  })
}

export function getInfo() {
  return request.get('/user/info')
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
