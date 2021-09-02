/*
 * @Date: 2021-08-28 02:50:47
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-02 14:31:37
 */

const httpRequest = require('../../http/request')

/*
 * @Date: 2021-08-21 20:03:47
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-28 02:18:21
 */
module.exports = app => {
  const express = require('express')
  const httpRequest = require('../../http/request')
  // 登录校验中间件
  const auth = require('../../middleware/auth')

  const Access = require('../../models/Access')
  const router = express.Router({
    mergeParams: true
  })
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