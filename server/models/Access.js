/*
 * @Date: 2021-08-28 22:33:32
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-28 22:33:32
 */
const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  access_token: { type: String }
})

module.exports = mongoose.model('Access', schema)