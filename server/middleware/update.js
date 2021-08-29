/*
 * @Date: 2021-08-29 00:26:34
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-29 00:54:52
 */
module.exports = () => {
  return async (req, res, next) => {
    if(req.body.option){
      if(req.body.option == 'remain'){
        console.log(req.params.id)
        console.log(req.body.status)
        await req.Model.updateOne({_id:req.params.id},{stock:req.body.status}, (err, docs)=>{
          if(err){
            res.send({success: false})
          } else {
            console.log('done')
            res.send({success: true})
          }
        }).lean()
      }
    } else {
      next()
    }
    // next()
  }
}