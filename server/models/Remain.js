/*
 * @Date: 2021-08-25 10:24:38
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-25 15:21:07
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {type: String, unique: true }, // 名称
  type: { type: String }, // 类型
  cu: { type: Array }, // 铜档
  ag: { type: Array }, // 银档
  au: { type: Array }, // 金档
  gets: { type: Array }, // 获取方式
  in_bound: { type: Boolean }, // 是否入库
  creator: { type: String, ref: 'User' }, // 创建者id
  updater: { type: String, ref: 'User' } // 更新者id
}, {
  timestamps: true
  
})

module.exports = mongoose.model('Remain', schema)