/*
 * @Date: 2021-08-24 17:00:26
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-24 17:01:45
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  appId: { type: String }, 
  appSecret: { type: String }
})

module.exports = mongoose.model('App', schema)