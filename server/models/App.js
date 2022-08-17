/*
 * @Date: 2022-08-17 09:25:54
 * @LastEditors: AaronChu
 * @LastEditTime: 2022-08-17 09:25:55
 */
/*
 * @Date: 2021-09-29 10:54:50
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-29 11:02:48
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  appId: { type: String, unique: true },
  appSecret: { type: String },
  type: {type: String}
}, {
  timestamps: false
})

module.exports = mongoose.model('App', schema)