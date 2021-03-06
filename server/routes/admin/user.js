/*
 * @Date: 2021-09-02 14:12:56
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-28 17:07:22
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
    // 2.判断是否停用
    let status = user.status
    assert(status, 422, '该账户已停用')
    // 3.校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密码不正确')
    // 4.返回token
    const token = jwt.sign({
      _id: user._id
    }, app.get('secret'))
    res.send({
      token: token
    })
  })

  // 获取用户信息与权限
  router.get('/info', auth(), async (req, res) => {
    res.send({
      _id: req.user._id,
      username: req.user.username,
      nickname: req.user.nickname,
      avatar: req.user.avatar,
      roles: req.user.roles,
      contact: req.user.contact,
      game_id: req.user.game_id
    })
  })

  // 新建用户
  router.post('/create', auth(), async (req, res) => {
    const model = await User.create(req.body)
    res.send(model)
  })

  // 删除用户
  router.delete('/delete/:id', auth(), async (req, res) => {
    assert(!(req.params.id == '61250a30e66c9709dc2082bb'), 403, {
      message: '不允许操作超级用户'
    })
    await User.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })
  // 修改用户获取用户信息
  router.get('/userinfo/:id', auth(), async (req, res) => {
    const model = await User.findById(req.params.id, {
      __v: 0,
      _id: 0,
      createdAt: 0,
      updatedAt: 0
    })
    res.send(model)
  })
  // 修改用户信息
  router.put('/change/:id', auth(), async (req, res) => {
    const model = await User.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
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
        game_id: {
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
        game_id: {
          $regex: reg
        },
      }]
    }, {
      __v: 0
    }).skip(start).limit(pageSize).exec() // 一页的内容
    res.send({
      data: models,
      counts: counts,
    })
  })

  // 停用用户的登录权限
  router.put('/stop/:id', auth(), async (req, res) => {
    assert(!(req.params.id == '61250a30e66c9709dc2082bb'), '不允许操作超级用户', 403)
    await User.updateOne({
      _id: req.params.id
    }, {
      status: req.body.status
    }, (err, docs) => {
      if (err) {
        res.send({
          success: false
        })
      } else {
        res.send({
          success: true
        })
      }
    }).lean()
  })


  // 用户自行操作的部分
  // 修改密码
  router.put('/change_my_pass', auth(), async (req, res) => {
    const {
      oldPass,
      newPass
    } = req.body
    // 1.先获取用户校验密码
    const user = await User.findById(req.user._id).select('+password')
    // 2.对比原密码
    const isValid = require('bcrypt').compareSync(oldPass, user.password)
    assert(isValid, 422, '原密码不正确')
    // 3.验证通过修改密码
    await User.findByIdAndUpdate(req.user._id, {
      $set: {
        password: newPass
      }
    })
    res.send({
      type: 'success',
      message: '修改密码成功！'
    })
  })
  // 修改联系方式
  router.put('/change_my_contact', auth(), async (req, res) => {
    const {
      contact
    } = req.body
    await User.findByIdAndUpdate(req.user._id, {
      $set: {
        contact: contact
      }
    })
    res.send({
      type: 'success',
      message: '修改联系方式成功！'
    })
  })
  // 修改角色ID
  router.put('/change_my_game_id', auth(), async (req, res) => {
    const {
      game_id
    } = req.body
    await User.findByIdAndUpdate(req.user._id, {
      $set: {
        game_id: game_id
      }
    })
    res.send({
      type: 'success',
      message: '修改角色ID成功！'
    })
  })

  app.use('/admin/api/user', router)
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}