/*
 * @Date: 2021-08-22 02:36:55
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-24 10:35:02
 */

module.exports = () =>{
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')
  const User = require('../models/User')
  return async(req, res, next)=>{
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token, 401, '请先登录')
    const { _id } = jwt.verify(token, req.app.get('secret'))
    assert(_id, 401, '请先登录')
    req.user = await User.findById(_id)
    assert(req.user, 401, '请先登录')
    await next()
  }
}