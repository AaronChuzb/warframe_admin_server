/*
 * @Date: 2021-09-02 12:27:52
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-02 17:01:49
 */

export function getToken() {
  return sessionStorage.getItem('token')
}

export function setToken(token) {
  return sessionStorage.setItem('token', token)
}

export function removeToken() {
  return sessionStorage.removeItem('token')
}
