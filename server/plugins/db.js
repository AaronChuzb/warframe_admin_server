/*
 * @Date: 2021-08-21 20:09:19
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-22 21:30:56
 */
module.exports = app =>{
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://aaronchu:19030125cC@119.29.4.214:27017/data?authSource=data',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
}