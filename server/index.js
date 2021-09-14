/*
 * @Date: 2021-08-20 20:15:53
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-14 14:54:48
 */
const express = require('express')
const app = express()

app.use(express.json())
app.use(require('cors')())

// 后台管理路由
require('./routes/admin')(app)
// 用户模块
require('./routes/admin/user')(app)
// 遗物组件模块
require('./routes/admin/part')(app)
// 基础分类模块
require('./routes/admin/category')(app)
// 遗物模块
require('./routes/admin/remain')(app)

require('./plugins/db')(app)

app.use(express.static(__dirname+"/static",{index:"index.html"}));
app.use('/index/admin', express.static(__dirname+"/web",{index:"index.html"}))

app.listen(3000, ()=>{
  console.log(`服务运行于：http://localhost:${3000}`)
})