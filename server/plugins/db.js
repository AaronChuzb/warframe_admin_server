/*
 * @Date: 2021-08-21 20:09:19
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-17 17:20:38
 */
module.exports = (app) =>{
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://username:password@127.0.0.1:27017/database?authSource=data',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
}
