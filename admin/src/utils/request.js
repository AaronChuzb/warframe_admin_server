/*
 * @Date: 2021-09-01 22:15:06
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-11 18:52:21
 */
import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000 // request timeout
})

// 请求拦截
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    const res = response
    console.log(res)
    if (res.status !== 200) {
      if(res.status === 402){
        Message({
          message: '请先登录',
          type: 'error',
          duration: 5 * 1000
        })
      } else {
        Message({
          message: res.message || '请求失败',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res.data
    }
  },
  error => {
    console.log(error.response.data)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
