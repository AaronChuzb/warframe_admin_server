/*
 * @Date: 2021-08-21 16:11:42
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-25 09:45:52
 */

// 图片上传阿里云oss

import { Message } from 'element-ui'
import OSS from 'ali-oss'
import Vue from 'vue'
import store from '../store'

const uploader = async e => {
  let file = e; // 拿到 file
  let fileName = file.name.substr(0,file.name.lastIndexOf('.'))
  let date = new Date().getTime()
  let fileNames = `${date}_${fileName}` // 拼接文件名，保证唯一，这里使用时间戳+原文件名
  // 看看store里边有没有配置信息，没有就请求一次
  if(store.getters.getOss.accessKeyId === ''){
    const res = await Vue.prototype.$api.getOss()
    store.commit('updataOss', res.data.data[0])
  }
  const { region, accessKeyId, accessKeySecret, bucket } = store.getters.getOss
  const client = new OSS({
    region,
    accessKeyId,
    accessKeySecret,
    bucket
  });
  const result = await client.put(fileNames, file)
  if (result.res.statusCode === 200) {
    return result.url
  } else {
    Message.error({
      message: '上传图片失败'
    })
  }
}

export default uploader