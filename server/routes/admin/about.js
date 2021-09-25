/*
 * @Date: 2021-09-25 00:09:06
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-25 00:16:29
 */
module.exports = app => {
  const express = require('express')
  const About = require('../../models/About')
  // 登录校验中间件
  const auth = require('../../middleware/auth')
  // 添加用户记录中间件(一定要放在auth之后)
  const actions = require('../../middleware/actionsRecord')
  const router = express.Router({
    mergeParams: true
  })
  // 新建关于
  router.post('/create', auth(), actions(), async (req, res) => {
    await About.create(req.body)
    res.send({
      success: true
    })
  })
  // 获取关于
  router.get('/info', auth(), async (req, res) => {
    const model = await About.findOne({}, { __v: 0 })
    res.send(model)
  })
  // 修改关于
  router.put('/edit/:id', auth(), actions(), async (req, res) => {
    await About.findByIdAndUpdate(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  app.use('/admin/api/about', router)
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}