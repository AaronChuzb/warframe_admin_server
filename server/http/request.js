/*
 * @Date: 2021-08-28 01:09:38
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-28 22:30:38
 */

var request = require('request')

function httpRequest(method, url, data) {
  if (method == "get") {
    return new Promise((resolve, reject) => {
      request({
          url: url,
          method: "GET",
          data
        },
        function (error, response, body) {
          var data = JSON.parse(body)
          if(response.statusCode == 200){
            resolve(data)
          } else {
            reject(error)
          }
        }
      )
    })

  } else if (method == "post") {
    return new Promise((resolve, reject)=>{
      request({
        url: url,
        method: "POST",
        form: JSON.stringify(data)
      }, function (error, response, body) {
        var data = JSON.parse(body)
        if(response.statusCode == 200){
          resolve(data)
        } else {
          reject(error)
        }
      });
    })
  }
}
module.exports = httpRequest;