/*
 * @Date: 2021-08-20 20:15:53
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-21 20:27:27
 */
const express = require('express')
const app = express()

app.use(express.json())
app.use(require('cors')())

// 后台管理路由
require('./routes/admin')(app)
require('./plugins/db')(app)


app.listen(3000, ()=>{
  console.log(`Example app listening at http://localhost:${3000}`)
})