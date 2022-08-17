/*
 * @Date: 2022-08-17 09:04:38
 * @LastEditors: AaronChu
 * @LastEditTime: 2022-08-17 12:38:01
 */
module.exports = app => {
  const express = require('express')
  const request = require('../../http/request')
  const Apps = require('../../models/App')
  const jwt = require('jsonwebtoken')
  const ClientUser = require('../../models/ClientUser')
  const router = express.Router({
    mergeParams: true
  })

  // 提交反馈
  router.post('/login', async (req, res) => {
    console.log(req.body)
    const userInfo = JSON.parse(req.body.rawData)
    const appInfo = await Apps.findOne({
      type: req.body.provider
    }, {
      _id: 0,
      appId: 1,
      appSecret: 1
    })
    // 微信登录
    let url = ''
    if (req.body.provider == 'weixin') {
      url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appInfo.appId}&secret=${appInfo.appSecret}&js_code=${req.body.code}&grant_type=authorization_code`
    } else if(req.body.provider == 'qq') {
      url = `https://api.q.qq.com/sns/jscode2session?appid=${appInfo.appId}&secret=${appInfo.appSecret}&js_code=${req.body.code}&grant_type=authorization_code`
    }
    const loginRes = await request('get', url, {})
    // 获取openid成功后，查找用户
    let user = await ClientUser.findOne({
      openid: loginRes.openid
    })
    // 没有这个用户，新增用户信息
    if (user == null) {
      let data = {
        nickName: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl,
        openid: loginRes.openid,
        platForm: req.body.provider,
        gameId: '',
        level: 0,
        remark: '',
        canLogin: true
      }
      user =  await ClientUser.create(data)
    } else {
      // 更新用户信息
      user.nickName = userInfo.nickName
      user.avatarUrl = userInfo.avatarUrl
      user.gender = userInfo.gender
      await ClientUser.findByIdAndUpdate(user._id, user)
      // 判断此用户有没有被封禁
      if (!user.canLogin) {
        res.send({
          message: '您已被限制登录'
        })
      }
    }
    // 根据openid生成token
    const token = jwt.sign({
      openid: loginRes.openid
    }, app.get('secret'))
    // console.log(token)
    delete user.canLogin
    res.send({
      code: 200,
      token,
      user,
      message: '登录成功'
    })
  })


  app.use('/app/api/user', router)
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}