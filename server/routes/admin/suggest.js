/*
 * @Date: 2021-09-24 15:45:34
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-24 16:42:43
 */
module.exports = app => {
  const express = require('express')
  const Suggest = require('../../models/Suggest')
  // 登录校验中间件
  const auth = require('../../middleware/auth')
  // 添加用户记录中间件(一定要放在auth之后)
  const router = express.Router({
    mergeParams: true
  })
  // 获取反馈列表
  router.get('/list', auth(), async (req, res) => {
    const page = (parseInt(req.query.page) - 1 || 0) // 查询第几页，默认第一页
    const pageSize = (parseInt(req.query.pageSize) || 10) // 查询页大小，默认10
    const start = page * pageSize // 从什么地方开始查
    const reg = new RegExp(req.query.search, 'i');
    let params = {
      text: {
        $regex: reg
      },
    }
    if(req.query.type != ''){
      params['type'] = req.query.type
    }
    console.log(req.query.status)
    if(req.query.status != ''){
      params['handle'] = parseInt(req.query.status)
    }
    // 查出某个参数总条数
    const counts = await Suggest.countDocuments(params).exec()
    // 查出内容
    const models = await Suggest.find(params, {
      __v: 0
    }).populate({
      path: 'updater',
      select: 'nickname'
    }).sort({ createdAt: -1 }).skip(start).limit(pageSize).exec() // 一页的内容
    res.send({
      data: models,
      counts: counts
    })
  })

  // 修改反馈信息
  router.put('/change/:id', auth(), (req, res, next)=>{
    req.body.updater = req.user._id
    next()
  }, async (req, res) => {
    console.log(req.body)
    await Suggest.findByIdAndUpdate(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  // 删除反馈
  router.delete('/delete/:id', auth(), async (req, res) => {
    await Suggest.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })

  app.use('/admin/api/suggest', router)
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}