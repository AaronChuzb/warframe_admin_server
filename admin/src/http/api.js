/*
 * @Date: 2021-08-20 23:00:23
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-25 19:37:32
 */
import request from './request'
const api = {
  /**
   * @description: 获取oss秘钥
   * @return {Promise}  
   */ 
  getOss() {
    return request.get('rest/osses')
  },
}

export default api