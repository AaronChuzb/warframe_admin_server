/*
 * @Date: 2021-08-28 02:50:47
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-28 23:41:30
 */

const httpRequest = require('../../http/request')

/*
 * @Date: 2021-08-21 20:03:47
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-28 02:18:21
 */
module.exports = app => {
  const express = require('express')
  const assert = require('http-assert')
  const httpRequest = require('../../http/request')
  // 定时任务组件
  const schedule = require('node-schedule');
  // 登录校验中间件
  const auth = require('../../middleware/auth')

  const Access = require('../../models/Access')
  const router = express.Router({
    mergeParams: true
  })

  // 定时任务，每小时执行一遍获取access_token任务
  var rule = new schedule.RecurrenceRule();
  var times = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  rule.hour = times;
  schedule.scheduleJob(rule, async ()=> {
    const Model = require('../../models/App')
    const model = await Model.find()
    const Access = require('../../models/Access')
    // 如果不存在配置信息
    if(model.length > 0){
      let url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${model[0].appId}&secret=${model[0].appSecret}`
      const wechat = await httpRequest('get', url, '' )
      const access = await Access.find()
      if(access.length > 0){
        await Access.findByIdAndUpdate(access[0]._id, { access_token: wechat.access_token })
      } else {
        await Access.create({ access_token: wechat.access_token })
      }
    }
  });



  router.post('/daily', async (req, res) => {
    console.log(req.body)
    const access = await Access.find()
    if (access.length > 0) {
      let url = `https://api.weixin.qq.com/datacube/getweanalysisappiddailyvisittrend?access_token=${access[0].access_token}`
      const wechat = await httpRequest('post', url, {
        begin_date: "20210827",
        end_date: "20210827"
      })
      res.send(wechat)
    } else {
      res.send({
        list: []
      })
    }
  })
  router.get('/total', async(req, res)=>{
    const Remain = require('../../models/Remain')
    const Part = require('../../models/Part')
    const remains = await Remain.countDocuments().exec()
    const parts = await Part.countDocuments().exec()
    res.send({ remains,parts })
  })


  app.use('/admin/api/analysis', router)

}