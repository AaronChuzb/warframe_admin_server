/*
 * @Date: 2021-09-02 14:12:56
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-02 16:30:00
 */
module.exports = app => {
  const assert = require('http-assert')
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const User = require('../../models/User')
  // 登录校验中间件
  const auth = require('../../middleware/auth')
  const router = express.Router({
    mergeParams: true
  })
  // 用户登录接口
  router.post('/login', async (req, res) => {
    const {
      username,
      password
    } = req.body
    // 1.根据用户名找用户
    const user = await User.findOne({
      username
    }).select('+password')
    assert(user, 422, '用户不存在')
    // 2.校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密码不正确')
    // 3.返回token
    const token = jwt.sign({
      _id: user._id
    }, app.get('secret'))
    res.send({
      token: token
    })
  })

  // 获取用户信息与权限
  router.get('/info', auth(), async (req, res) => {
    res.send({ _id: req.user._id, nickname: req.user.nickname, avatar: req.user.avatar })
  })

  app.use('/admin/api/user', router)
}