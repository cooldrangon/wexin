
var app = getApp();

function PostRequest(url, data, success, fail) {  
  // console.log(wx.getStorageSync('account'))
  // console.log(wx.getStorageSync('token'))
  // wx.getStorage({ key: 'token'})
  
   wx.request({
     url: app.globalData.urls + url, 
     method: "POST",
     header: {
       "content-type": "application/x-www-form-urlencoded",
       'content-type': 'application/json', // 默认值
        account: wx.getStorageSync('account'),
        token: wx.getStorageSync('token')
      //  'user_id': wx.getStorageSync('user_id')
     },
      data: data,
      success(res) {
        success(res);
      },
      fail(res) {
        fail(res);
      }
   });
 }
module.exports = {
  PostRequest: PostRequest
}