/*
 * @Date: 2022-08-17 13:43:12
 * @LastEditors: AaronChu
 * @LastEditTime: 2022-08-17 14:05:48
 */

module.exports = app => {
  const assert = require('http-assert')
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const ClientUser = require('../../models/ClientUser')
  // 登录校验中间件
  const auth = require('../../middleware/auth')
  const router = express.Router({
    mergeParams: true
  })

  // 用户列表
  router.get('/list',  async (req, res) => {
    const page = (parseInt(req.query.page) - 1 || 0) // 查询第几页，默认第一页
    const pageSize = (parseInt(req.query.pageSize) || 10) // 查询页大小，默认10
    const start = page * pageSize // 从什么地方开始查
    const reg = new RegExp(req.query.search, 'i');
    let params = {}
    params.$and = [
      {
        $or: [
          {
            nickName: {
              $regex: reg
            }
          },
          {
            gameId: {
              $regex: reg
            },
          }
        ]
      }
    ]
    if(req.query.platform){
      params.$and.push({
        platForm: req.query.platform
      })
    }
    if(req.query.canLogin){
      params.$and.push({
        canLogin: req.query.canLogin == 1 ? true: false
      })
    }
    console.log(params)
    // 查出某个参数总条数
    const counts = await ClientUser.countDocuments(params).exec()
    // 查出内容
    const models = await ClientUser.find(params, {
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

  app.use('/admin/api/client_user', router)
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}