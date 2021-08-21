/*
 * @Date: 2021-08-20 23:00:10
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-21 00:17:20
 */
import axios from 'axios'
import { Message } from 'element-ui'
const uploader = e =>{
  return new Promise((resolve, reject) => {
    var formData = new FormData()
    formData.append('image', e.file)
    formData.append('apiType', 'bilibili')
    formData.append('token', '714795f91c16e3e2a98345d2534b0775')
    let config = {
      'Content-type': 'multipart/form-data'
    }
    axios.post(e.action, formData, config).then(res=>{
      if(res.data.code == 200){
        resolve(res.data.data)
      } else {
        Message.error({
          message: '上传图片失败'
        })
        reject({
          errorType: "请求失败",
        });
      }
    })
  })
}
export default uploader