/*
 * @Date: 2021-09-10 17:21:36
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-24 23:58:41
 */
import OSS from 'ali-oss'
import store from '@/store'
import { Message } from 'element-ui'

const uploader = async (e, path) => {
  let file = e; // 拿到 file
  let fileName = file.name.substr(0,file.name.lastIndexOf('.'))
  let date = new Date().getTime()
  let fileNames = `${path}/${date}_${fileName}` // 拼接文件名，保证唯一，这里使用时间戳+原文件名

  // 上传文件,这里是上传到OSS的 uploads文件夹下
  if(store.getters.getOss.oss.accessKeyId == ''){
    await store.dispatch('oss/getOss')
  }
  
  const { region, accessKeyId, accessKeySecret, bucket } = store.getters.getOss.oss
  console.log(region, accessKeyId, accessKeySecret, bucket)
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