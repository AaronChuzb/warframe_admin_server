/*
 * @Date: 2021-08-20 23:00:17
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-25 15:35:35
 */
import axios from 'axios'
import Vue from 'vue'
import router from '../router'

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api/'
})

// 响应拦截
http.interceptors.response.use((res)=>{
  return res
}, (err)=>{
  if(err.response.data.message){
    if(err.response.status === 403){
      Vue.prototype.$message({
        type: 'warning',
        message: err.response.data.message
      })
    } else {
      Vue.prototype.$message({
        type: 'error',
        message: err.response.data.message
      })
    }
    
  }
  if(err.response.status === 401){
   router.push('/login')
  }
  return Promise.reject(err)
})
// 请求拦截
http.interceptors.request.use((config)=>{
  if(sessionStorage.getItem('token')){
    config.headers.Authorization = 'Bearer ' + sessionStorage.getItem('token')
  }
  return config
}, (err)=>{
  
  return Promise.reject(err)
})
export default http