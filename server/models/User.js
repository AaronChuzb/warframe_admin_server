/*
 * @Date: 2021-08-22 00:02:55
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-22 00:33:35
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: { type: String }, // 用户名
  password: { 
    type: String,
    select: false,
    set(val){
      return require('bcrypt').hashSync(val, 10)
    } 
  }
})

module.exports = mongoose.model('User', schema)