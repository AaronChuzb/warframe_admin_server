/*
 * @Date: 2021-09-24 11:08:42
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-24 14:52:14
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String }, 
  avatar: { type: String },
  tips: { type: String },
  rank: { type: Number },
  creator: { type: String, ref: 'User' },
  updater: { type: String, ref: 'User' },
},{
  timestamps: true
})

module.exports = mongoose.model('People', schema)