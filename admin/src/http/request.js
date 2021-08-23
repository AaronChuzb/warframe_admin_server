/*
 * @Date: 2021-08-23 11:29:12
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-23 12:14:48
 */
import axios from 'axios'
import router from '../router'
import { Notify } from "vuetify-message-snackbar";

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})

// 响应拦截
http.interceptors.response.use((res)=>{
  return res
}, (err)=>{
  if(err.response.data.message){
    Notify.error(err.response.data.message)
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