/*
 * @Date: 2021-08-20 20:15:53
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-11 13:55:10
 */
const express = require('express')
const app = express()
app.use(express.json())
app.use(require('cors')())
require('./plugins/db')(app)

// 后台管理路由
require('./routes/admin')(app)
// 用户模块
require('./routes/admin/user')(app)
// 遗物组件模块
require('./routes/admin/part')(app)
// 基础分类模块
require('./routes/admin/category')(app)
// 别名转换模块
require('./routes/admin/alias')(app)
// 遗物模块
require('./routes/admin/remain')(app)
// 钢铁奖励模块
require('./routes/admin/rotation')(app)
// 鸣谢人员
require('./routes/admin/people')(app)
// 意见反馈
require('./routes/admin/suggest')(app)
// 日志管理
require('./routes/admin/log')(app)
// 关于管理
require('./routes/admin/about')(app)

// app端路由
require('./routes/app/index')(app)
require('./routes/app/mine')(app)



app.use(express.static(__dirname+"/static",{index:"index.html"}));
app.use('/index/admin', express.static(__dirname+"/web",{index:"index.html"}))
app.listen(3000, ()=>{
  console.log(`服务运行于：http://localhost:${3000}`)
})