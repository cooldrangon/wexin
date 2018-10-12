const app = getApp()
import {
  Token
} from '../../utils/token-model.js';
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {

    // var token = new Token();
    // token.verify();
    var that = this;
    //     console.log(res)
    //     if (res.authSetting['scope.userInfo']) {
    //       console.log('授权成功')
    //       wx.getUserInfo({
    //         success: function (res) {
    //           console.log(res)
    //           //从数据库获取用户信息
    //           that.queryUsreInfo();
    //           //用户已经授权过
    //           wx.switchTab({
    //             url: '../homepage/homepage'
    //           })
    //         }
    //       }); 
    //     }
    //   }
    // })
  },
  onShow: function () {

  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      var account = wx.getStorageSync('account')
      console.log(wx.getStorageSync('openid'))
      wx.getStorage({
        key: 'openid',
        success: function (res) {
          console.log(res)
          var openids = res
          var url = "https://wx.knowdao.com/api/login/get_openid";
          wx.request({
            url: url,
            method: 'POST',
            data: {
              account: wx.getStorageSync('account'),
              nickname: e.detail.userInfo.nickName,
              gender: e.detail.userInfo.gender,
              avatarUrl: e.detail.userInfo.avatarUrl,
              city: e.detail.userInfo.city,
              userid: wx.getStorageSync('user_id'),
              openid: openids.data,
            },
            header: {
              "content-type": "application/x-www-form-urlencoded",
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res)
              if (res.data.status == 200) {
                wx.setStorageSync('token', res.data.data.token);
                wx.setStorageSync('success', 1);
                const status = res.data.data.status
                if (status == 1) {
                  wx.switchTab({
                    url: '../homepage/homepage'
                  })
                  wx.setStorageSync('status', 1)
                } else {
                  wx.redirectTo({
                    url: '../personal/personal',
                  })
                }
              }
            }
          })
        }
      })

    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },

  //获取用户信息接口
  queryUsreInfo: function () {
    wx.request({
      url: getApp().globalData.urlPath + 'hstc_interface/queryByOpenid',
      data: {
        openid: getApp().globalData.openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        getApp().globalData.userInfo = res.data;
      }
    })
  },

})
