/*
 * @Date: 2021-09-24 10:56:08
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-24 16:38:51
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  type: { type: String }, 
  text: { type: String },
  handle: { type: Number },
  updater: { type: String, ref: 'User' }
},{
  timestamps: true
})

module.exports = mongoose.model('Suggest', schema)