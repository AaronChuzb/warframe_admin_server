/*
 * @Date: 2021-08-22 00:02:55
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-18 14:27:53
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  nickname: { type: String }, // 用户昵称
  avatar: { type: String }, // 用户头像
  username: { type: String, unique: true }, // 用户名
  password: { 
    type: String,
    select: false,
    set(val){
      return require('bcrypt').hashSync(val, 10)
    } 
  },
  remark: { type: String }, // 用户备注
  game_id: { type: String }, // 游戏中的ID
  contact: { type: String }, // 联系方式
  roles: { type: Array }, // 用户权限列表
  status: { type: Boolean }, // 是否可以进行登录的状态
  creator: { type: String, ref: 'User' }, // 创建者id
  updater: { type: String, ref: 'User' } // 更新者id
}, {
  timestamps: true
  
})

module.exports = mongoose.model('User', schema)