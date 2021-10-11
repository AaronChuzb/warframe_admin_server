/*
 * @Date: 2021-09-02 14:12:56
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-11 15:38:24
 */
module.exports = app => {
  const express = require('express')
  const Category = require('../../models/Category')
  const User = require('../../models/User')
  // 登录校验中间件
  const auth = require('../../middleware/auth')
  // 添加用户记录中间件(一定要放在auth之后)
  const actions = require('../../middleware/actionsRecord')

  const permission = require('../../middleware/permission')
  const router = express.Router({
    mergeParams: true
  })
  // 新建分类
  router.post('/create', auth(), actions(), async (req, res) => {
    await Category.create(req.body)
    res.send({
      success: true
    })
  })

  
  // 获取分类列表
  router.get('/list', auth(), async (req, res) => {
    const page = (parseInt(req.query.page) - 1 || 0) // 查询第几页，默认第一页
    const pageSize = (parseInt(req.query.pageSize) || 10) // 查询页大小，默认10
    const start = page * pageSize // 从什么地方开始查
    const reg = new RegExp(req.query.search, 'i'); // 查询通配符
    const users = await User.find({},{nickname: 1}) // 根据用户分类
    let params = {}
    if(req.query.user != ''){
      params = {
        name: {
          $regex: reg
        },
        updater: req.query.user
      }
    } else {
      params = {
        name: {
          $regex: reg
        },
      }
    }
    // 查出某个参数总条数
    const counts = await Category.countDocuments({
      $or: [params]
    }).exec()
    // 查出内容
    const models = await Category.find({
      $or: [params]
    }, { __v: 0 }).populate({ path: 'parent',  select: 'name'}).populate({ path: 'creator', select: 'nickname' }).populate({ path: 'updater', select: 'nickname' }).sort(JSON.parse(req.query.sort)).skip(start).limit(pageSize).exec() // 一页的内容
    res.send({
      data: models,
      counts: counts,
      userOptions: users
    })
  })

  // 填充上级分类搜索分类
  router.get('/search', auth(), async (req, res) => {
    const reg = new RegExp(req.query.search, 'i'); // 查询通配符
    // 查出内容
    const models = await Category.find({
      $or: [{
        name: {
          $regex: reg
        },
      }]
    }, { _id: 1, name: 1 }).sort({ updatedAt: -1 }).limit(10).exec() // 一页的内容
    res.send(models)
  })


  // 修改分类数据获取
  router.get('/info/:id', auth(), async (req, res) => {
    const model = await Category.findById(req.params.id, {_id: 0, name: 1}).populate({
      path: 'parent',
      select: 'name'
    }).populate({
      path: 'creator',
      select: '_id'
    }).populate({
      path: 'updater',
      select: '_id'
    })
    res.send(model)
  })

  // 修改分类
  router.put('/edit/:id', auth(), actions(), async (req, res) => {
    await Category.findByIdAndUpdate(req.params.id, req.body)
    res.send({success: true})
  })

  // 删除分类
  router.delete('/delete/:id', auth(), permission(), async (req, res) => {
    await Category.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })

  app.use('/admin/api/category', router)
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}