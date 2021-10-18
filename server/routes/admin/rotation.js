/*
 * @Date: 2021-10-10 15:47:06
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-18 09:31:20
 */
module.exports = app => {
  const express = require('express')
  const Rotation = require('../../models/Rotation')
  // 登录校验中间件
  const auth = require('../../middleware/auth')
  // 添加用户记录中间件(一定要放在auth之后)
  const actions = require('../../middleware/actionsRecord')
  // 定时任务
  const schedule = require('node-schedule');
  const router = express.Router({
    mergeParams: true
  })
  // 新建奖励
  router.post('/create', auth(), actions(), async (req, res) => {
    await Rotation.create(req.body)
    res.send({
      success: true
    })
  })
  // 获取固定奖励列表
  router.get('/list', auth(), async (req, res) => {
    // 查出内容
    // 固定奖励
    const fixedList = await Rotation.find({
      is_rotation: false
    })
    // 轮换奖励
    const rotationCounts = await Rotation.countDocuments({
      is_rotation: true
    })
    const rotationList = await Rotation.find({
      is_rotation: true
    }).sort({
      rank: 1
    }).exec()
    res.send({
      fixedList,
      rotationList,
      rotationCounts
    })

  })

  // 修改奖励数据获取
  router.get('/info/:id', auth(), async (req, res) => {
    const model = await Rotation.findById(req.params.id, {
      __v: 0
    }).populate({
      path: 'creator',
      select: '_id'
    }).populate({
      path: 'updater',
      select: '_id'
    })
    res.send(model)
  })

  // 修改奖励
  router.put('/edit/:id', auth(), actions(), async (req, res) => {
    await Rotation.findByIdAndUpdate(req.params.id, req.body)
    res.send({
      success: true
    })
  })
  // 修改轮换奖励
  router.put('/edit_rotation/:id', auth(), actions(), async (req, res) => {
    // 1.先找出来
    const old = await Rotation.findById(req.params.id)
    // 2.判断顺序是否有改变
    if (old.rank != req.body.rank) {
      // 3.判断变大还是变小
      if (req.body.rank > old.rank) { // 变大
        // 更新所有比原数据大的数据，且小于等于当前数据的数据 进行rank - 1
        await Rotation.updateMany({
          rank: {
            $gt: old.rank,
            $lte: req.body.rank
          }
        }, {
          $inc: {
            rank: -1
          }
        })
      } else {
        await Rotation.updateMany({
          rank: {
            $lt: old.rank,
            $gte: req.body.rank
          }
        }, {
          $inc: {
            rank: 1
          }
        })
      }
    }
    await Rotation.findByIdAndUpdate(req.params.id, req.body)
    res.send({
      success: true
    })
  })
  // 定时任务执行定时更新脚本,每周一上午8点触发
  function scheduleObjectLiteralSyntax() {
    //每周一的上午8：00分触发
    schedule.scheduleJob({
      hour: 8,
      minute: 0,
      dayOfWeek: 1
    }, async function () {
      // 1.将所有的位置往前移一位 rank-1
      await Rotation.updateMany({
        is_rotation: true
      }, {
        $inc: {
          rank: -1
        }
      })
      // 2.找到最大的那一个
      const max = await Rotation.findOne({
        is_rotation: true
      }).sort({
        rank: -1
      })
      // 3.找到最小的哪一个也就是0
      const min = await Rotation.findOne({
        is_rotation: true
      }).sort({
        rank: 1
      })
      // 4.将其放到最后一位
      await Rotation.findByIdAndUpdate(min._id, {
        $set: {
          rank: max.rank + 1
        }
      })
    });
  }
  scheduleObjectLiteralSyntax();

  // 删除奖励
  router.delete('/delete/:id', auth(), async (req, res) => {
    await Rotation.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })

  // 测试用接口
  router.get('/test', auth(), async (req, res) => {
    /* await Rotation.updateMany({
      is_rotation: true
    }, {
      $inc: {
        rank: 1
      }
    }) */
    res.send({
      success: true
    })
  })

  app.use('/admin/api/rotation', router)
  app.use(async (err, req, res, next) => {
    if (err.code == 11000) {
      res.status(403).send({
        message: '已存在条目，请不要重复创建'
      })
    } else {
      res.status(err.statusCode || 500).send({
        message: err.message
      })
    }
  })
}