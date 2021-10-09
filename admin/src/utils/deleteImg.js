/*
 * @Date: 2021-10-09 16:51:02
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-09 17:09:57
 */
import OSS from 'ali-oss'
import store from '@/store'
import { Message } from 'element-ui'

const deleteImg = async (name) => {
 
  if(store.getters.getOss.oss.accessKeyId == ''){
    await store.dispatch('oss/getOss')
  }
  const { region, accessKeyId, accessKeySecret, bucket } = store.getters.getOss.oss
  const client = new OSS({
    region,
    accessKeyId,
    accessKeySecret,
    bucket
  });
  const result = await client.delete(name)
  console.log(result)
  if (result.res.statusCode === 204) {
    console.log('删除旧图片成功')
  } else {
    Message.error({
      message: '删除图片失败'
    })
  }
}

export default deleteImg 