/*
 * @Date: 2021-10-09 18:05:19
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-11 14:22:00
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String }, 
  img: { type: String },
  price: { type: Number },
  is_rotation: { type: Boolean }, // 是否是轮换
  rank: { type: Number }, // 排序，非轮换没有此字段
  creator: { type: String, ref: 'User' },
  updater: { type: String, ref: 'User' },
},{
  timestamps: true
})

module.exports = mongoose.model('Rotation', schema)