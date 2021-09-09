/*
 * @Date: 2021-09-02 14:12:56
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-06 18:00:48
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
    res.send({ _id: req.user._id, nickname: req.user.nickname, avatar: req.user.avatar, roles: req.user.roles })
  })

  // 新建用户
  router.post('/create', auth(), async(req, res)=>{
    console.log('[USER: /create]', req.body)
  })
  // 删除用户
  router.delete('/delete/:id', auth(), async (req, res) => {
    console.log(req)
    /* await User.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    }) */
  })
  // 用户列表
  router.get('/list', auth(), async (req, res) => {
    const page = (parseInt(req.query.page) - 1 || 0) // 查询第几页，默认第一页
    const pageSize = (parseInt(req.query.pageSize) || 10) // 查询页大小，默认10
    const start = page * pageSize // 从什么地方开始查
    const reg = new RegExp(req.query.search, 'i');
    // 查出某个参数总条数
    const counts = await User.countDocuments({
      $or: [{
        nickname: {
          $regex: reg
        },
        username: {
          $regex: reg
        },
      }]
    }).exec()
    // 查出内容
    const models = await User.find({
      $or: [{
        nickname: {
          $regex: reg
        },
        username: {
          $regex: reg
        },
      }]
    }, { __v: 0 }).skip(start).limit(pageSize).exec() // 一页的内容
    res.send({
      data: models,
      counts: counts,
    })
  })

  app.use('/admin/api/user', router)
}