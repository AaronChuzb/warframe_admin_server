/*
 * @Date: 2021-08-20 23:00:23
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-24 15:59:54
 */
import request from './request'
const api = {
  
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
  }
}

export default api