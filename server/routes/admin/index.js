

/*
 * @Date: 2021-08-21 20:03:47
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-22 22:48:16
 */
module.exports = app =>{
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const User = require('../../models/User')
  const assert = require('http-assert')
  // 登录校验中间件
  const auth = require('../../middleware/auth')
  // 获取模型中间件
  const resource = require('../../middleware/resource')
  const router = express.Router({
    mergeParams: true
  })
  // token转换秘钥
  app.set('secret', 'maliho123.')

  // 转换id
  function formatId(paramsId){
    var id = paramsId.replace(/id=/g, '')
    id = id.replace(/}/g, '')
    return id
  }

  
  // 创建操作
  router.post('/', async(req, res)=>{
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 查询列表
  router.get('/', async(req, res)=>{
    const start = (parseInt(req.query.page) - 1 || 0) * (parseInt(req.query.pageSize) || 10) // 从什么地方开始查
    const counts = await req.Model.countDocuments(req.query.queryParams || {}).exec() // 查出总条数
    const pageCount = counts / (parseInt(req.query.pageSize) || 10) // 页数
    const models = await req.Model.find(JSON.parse(req.query.params) || {}).skip(start).sort({ updatedAt: -1 } || req.query.sort).limit(parseInt(req.query.pageSize) || 10).exec() // 一页的内容
    res.send({ data: models, pageCount: pageCount})
  })
  // 查询操作
  router.get('/:id', async(req, res)=>{
    var id = formatId(req.params.id)
    const model = await req.Model.findById(id)
    res.send(model)
  })
  // 修改操作
  router.put('/:id', async(req, res)=>{
    var id = formatId(req.params.id)
    const model = await req.Model.findByIdAndUpdate(id, req.body)
    res.send(model)
  })
  // 删除操作
  router.delete('/:id', async(req, res)=>{
    var id = formatId(req.params.id)
    await req.Model.findByIdAndDelete(id)
    res.send({
      success: true
    })
  })

  
  

  app.use('/admin/api/rest/:resource', auth(), resource(), router)

  // 用户登录接口
  app.post('/admin/api/login', async (req, res)=>{
    const { username, password } = req.body
    // 1.根据用户名找用户
    const user = await User.findOne({ username }).select('+password')
    assert(user, 422, '用户不存在')
    
    // 2.校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密码不正确')
    
    // 3.返回token
    const token = jwt.sign({ _id: user._id }, app.get('secret'))
    res.send({token: token, user: user})
  })

  //错误处理函数
  app.use(async ( err, req, res, next)=>{
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}