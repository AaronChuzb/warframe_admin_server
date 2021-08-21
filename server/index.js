/*
 * @Date: 2021-08-20 20:15:53
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-21 18:21:24
 */
const express = require('express')

const app = express()

app.get('/', (req, res)=>{
  res.send('ok')
})

app.listen(3000, ()=>{
  console.log(`Example app listening at http://localhost:${3000}`)
})