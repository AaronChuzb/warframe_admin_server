/*
 * @Date: 2021-08-24 13:42:17
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-24 17:42:50
 */

module.exports = () =>{
  return async (req, res, next)=>{
    const search = JSON.parse(req.query.search || '{}') // 查询的参数，默认{}
    console.log(search)
    const reg = new RegExp(search.content, 'i');
    let feilds = []
    let find = {}
    if(search.feilds){
      search.feilds.map((e)=>{
        let item = {}
        item[e] = { $regex : reg }
        feilds.push( item )
      })
      find =  { $or: feilds }
    }
    req.find = find
    await next()
  }
}