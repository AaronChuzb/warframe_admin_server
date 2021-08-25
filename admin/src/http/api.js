/*
 * @Date: 2021-08-20 23:00:23
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-25 17:47:39
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
  
  /**
   * @description: 获取战甲列表
   * @param {Number} page 页数
   * @param {Number} pageSize 一页大小
   * @param {Array} feilds 搜索的参数名（例如'['name', 'date']'）
   * @param {String} serach 搜索的内容
   * @return {Promise}  
   */  
  getWarframe(page, pageSize, feilds, serach){
    return request.get('rest/warframe', { 
      params: { page: page, pageSize: pageSize, search: { feilds: feilds, content: serach } }
    })
  },

  /**
   * @description: 根据id删除战甲
   * @param {String} id 战甲的id
   * @return {Promise}
   */
  delWarframe(id){
    return request.delete(`rest/warframe/${id}`)
  },
  /**
   * @description: 获取遗物列表
   * @param {Number} page 页数
   * @param {Number} pageSize 一页大小
   * @param {Array} feilds 搜索的参数名（例如'['name', 'date']'）
   * @param {String} serach 搜索的内容
   * @return {Promise}  
   */  
   getRemain(page, pageSize, feilds, serach){
    return request.get('rest/remains', { 
      params: { page: page, pageSize: pageSize, search: { feilds: feilds, content: serach } }
    })
  },
  /**
   * @description: 根据id删除遗物
   * @param {String} id 遗物的id
   * @return {Promise}
   */
   delRemain(id){
    return request.delete(`rest/remains/${id}`)
  },
  /**
   * @description: 获取类型列表
   * @param { String } url 地址
   * @param {Number} page 页数
   * @param {Number} pageSize 一页大小
   * @param {Array} feilds 搜索的参数名（例如'['name', 'date']'）
   * @param {String} serach 搜索的内容
   * @return {Promise}  
   */  
  getType(url, page, pageSize, feilds, serach){
    return request.get(`rest/${url}`, { 
      params: { page: page, pageSize: pageSize, search: { feilds: feilds, content: serach } }
    })
  },
  /**
   * @description: 根据id删除类型
   * @param {String} id 类型的路径
   * @param {String} id 类型的id
   * @return {Promise}
   */
  delType(type,id){
    return request.delete(`rest/${type}/${id}`)
  },
  getPrimePartType(page, pageSize, feilds, serach){
    return request.get(`rest/prime_part_types`, { 
      params: { page: page, pageSize: pageSize, search: { feilds: feilds, content: serach } }
    })
  },
  getPrimePart(page, pageSize, feilds, serach){
    return request.get(`rest/prime_parts`, { 
      params: { page: page, pageSize: pageSize, search: { feilds: feilds, content: serach } }
    })
  },
  delPrimePart(id){
    return request.delete(`rest/prime_part/${id}`)
  },
}

export default api