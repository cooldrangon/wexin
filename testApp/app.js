import { Token } from 'utils/token-model.js';
var scence = 0;
App({
  onLaunch: function () {
    var that = this;
    var url = 'https://wx.knowdao.com/api/login/is_openid';
    wx.login({
      success: function (ress) {
        console.log(ress)
        var code = ress.code
        wx.request({
          url: url,
          method: 'POST',
          data: {
            code: code,
          },
          header: {
            "content-type": "application/x-www-form-urlencoded",
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res)
            wx.setStorageSync('account', res.data.data.account);
            wx.setStorageSync('user_id', res.data.data.userid);
            wx.setStorageSync('openid', res.data.data.openid);
            wx.setStorageSync('session_key', res.data.data.session_key);
            wx.setStorage({
              key: 'openid',
              data: res.data.data.openid,
              success: function (res) {
                console.log(res)
              }
            })
            if (res.data.data.type == 1) {
              wx.redirectTo({
                url: '../login/login',
              })
            }
          }
        })
      }
    })
  },
  globalData: {
    account: '',
    stroge: 0,
    // user_id:null,
    userid:null,
    userInfo: null,
    times: null,
    urls: 'https://wx.knowdao.com',
    urlst: 'http://test.knowdao.com',
    token: ''
  }
})