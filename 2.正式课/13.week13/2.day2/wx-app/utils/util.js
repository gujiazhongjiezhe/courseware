//封装小程序的二次请求
const baseUrl = 'http://localhost:3000';
const http = function (options) {
  let {url,data,method} = options
  return new Promise((resolve, reject) => {
    wx.request({
      url:baseUrl + url, //仅为示例，并非真实的接口地址
      data,
      method,
      success(res) {
        resolve(res)
      },
      fail(res){
        reject(res)
      }
    })
  })
}

http.get = function(url,data){
  return http({url,data,method:'GET'});
}
http.post = function(url,data){
  return http({url,data,method:'POST'});
}
module.exports = {
  http
}
