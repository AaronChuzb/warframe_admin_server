/*
 * @Date: 2021-08-23 11:37:15
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-23 11:48:57
 */
// 图片上传阿里云oss
import Vue from 'vue'
const OSS = require('ali-oss');
const client = new OSS({
  region: 'oss-cn-shenzhen',
  accessKeyId: 'LTAI5tQD5pRwTeejAHrCgrmo',
  accessKeySecret: 'TDYUw1iNyF75RpBjFISZYTbSWKOhX4',
  bucket: 'img-api'
});

const uploader = e =>{
  return new Promise((resolve, reject)=>{
    try {
      let file = e; // 拿到 file
      let fileName = file.name.substr(0,file.name.lastIndexOf('.'))
      let date = new Date().getTime()
      let fileNames = `${date}_${fileName}` // 拼接文件名，保证唯一，这里使用时间戳+原文件名
      // 上传文件,这里是上传到OSS的 uploads文件夹下
      client.put(fileNames, file).then(res=>{
          if (res.res.statusCode === 200) {
            resolve(res.url)
          } else {
            Vue.prototype.$message.error({
              message: "上传图片失败"
            })
            reject({errorType: "请求失败",})
          }
      })
    } catch (err) {
      reject({errorType: err,})
    }
  })
}

export default uploader