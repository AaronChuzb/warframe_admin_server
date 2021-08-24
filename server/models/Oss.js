/*
 * @Date: 2021-08-24 17:02:11
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-24 17:03:18
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  accessKeyId: { type: String }, 
  accessKeySecret: { type: String },
  bucket: { type: String },
  region: { type: String }
})

module.exports = mongoose.model('Oss', schema)