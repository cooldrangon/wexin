const app = getApp()
var fetch = require('../../../utils/fetch')
// pages/activdetail/sign/sign.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ajxtrue:false,
    sex:""
  },
  // 手机号验证
  blurPhone: function (e) {
    var phone = e.detail.value;
    let that = this
    if (!(/^1[345678]\d{9}$/.test(phone))) {
      this.setData({
        ajxtrue: false
      })
      if (phone.length >= 11) {
        wx.showToast({
          title: '手机号有误',
          icon: 'success',
          duration: 2000
        })
        return false
      }
     
    } else {
      this.setData({
        ajxtrue: true
      })
      console.log('验证成功', that.data.ajxtrue)
    }
  },
  // 年龄验证
  formSubmit: function (e) {
    let ajxtrue = this.data.ajxtrue
    if (ajxtrue == true) {
      //表单提交进行
    } else {
      wx.showToast({
        title: '手机号有误',
        icon: 'success',
        duration: 2000
      })
      return false
    }
    var username = e.detail.value.name;
    var age = e.detail.value.age;
    var phone = e.detail.value.phone;
    var sex = e.detail.value.gender
    // mobile
    if (username == "" || age== "" || phone == "") {
      wx.showModal({
        title: '提示',
        content: '请输入完整信息！',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    } else {
      // 发送数据给后台 同时 弹出窗口 跳转页面 并调用login获取code 把后台传回来的两个数据还有code传递给报名成功页面
      var that = this
      fetch.PostRequest("/api/activity/add_user_info", {
        activity_id: that.data.activity_id,
        price: that.data.price,
        username: username,
        age: age,
        sex: sex,
        phone: phone
        },
        // 成功的回调
        res => {
            that.setData({
              order_num: res.data.data.order_num,
              price: res.data.data.price
            })
            // const order_num=res.data.data.order_num
            // const price = res.data.data.price
            wx.login({
              success: res => {
                const code = res.code
                wx.request({
                  url: app.globalData.urls + "/api/pay",
                  method: "POST",
                  data: {
                    code: code,
                    order_num: that.data.order_num,
                    money: that.data.price
                  },
                  header: {
                    "content-type": "application/x-www-form-urlencoded",
                    'content-type': 'application/json' // 默认值
                  },
                  success: res => {
                    wx.requestPayment({
                      'timeStamp': res.data.data.timeStamp,
                      'nonceStr': res.data.data.nonceStr,
                      'package': res.data.data.package,
                      'signType': 'MD5',
                      'paySign': res.data.data.paySign,
                      'success': function (res) {
                        if (res.errMsg) {
                          wx.showToast({
                            title: '支付成功',
                            success:res=>{
                              wx.switchTab({
                                url: '../../homepage/homepage',
                              })
                            }
                          })
                        }
                      },
                      'fail': function (res) {
                        if (res.errMsg) {
                          wx.showToast({
                            title: '支付失败',
                          })
                        }
                      }
                    });
                  }
                })
              }
            })
          
        },
        // 失败的回调
        res => {
          console.log('error');
          return false;
        })

      // wx.request({
      //   url: app.globalData.urls +"/api/activity/add_user_info",
      //   method: "POST",
      //   data: {
      //     activity_id: this.data.activity_id,
      //     price:this.data.price,
      //     username:username,
      //     age:age,
      //     sex:sex,
      //     phone:phone
      //   },
      //   header: {
      //     "content-type": "application/x-www-form-urlencoded",
      //     'content-type': 'application/json' // 默认值
      //   },
        // success:res=>{
        //   console.log(res)
        //   this.setData({
        //     order_num:res.data.data.order_num,
        //     price : res.data.data.price
        //   })
        //   // const order_num=res.data.data.order_num
        //   // const price = res.data.data.price
        //  wx.login({
        //    success:res=>{
        //      const code = res.code 
        //      wx.request({
        //        url: app.globalData.urls +"/api/pay",
        //        method: "POST",
        //        data:{
        //          code:code,
        //          order_num:this.data.order_num,
        //          money:this.data.price
        //        },
        //        header: {
        //          "content-type": "application/x-www-form-urlencoded",
        //          'content-type': 'application/json' // 默认值
        //        },
        //        success:res=>{
        //          wx.requestPayment({
        //            'timeStamp': res.data.data.timeStamp,
        //            'nonceStr': res.data.data.nonceStr,
        //            'package': res.data.data.package,
        //            'signType': 'MD5',
        //            'paySign': res.data.data.paySign,
        //            'success': function (res) {
        //              if(res.errMsg){
        //                wx.showToast({
        //                  title: '支付成功',
        //                })
        //              }
        //            },
        //            'fail': function (res) {
        //              if(res.errMsg){
        //                wx.showToast({
        //                  title: '支付失败',
        //                })
        //              }
        //            }
        //          });
        //        }
        //      })
        //    }
        //  })
        // }
      // })


    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
   this.setData({
     activity_id:options.id,
     price:options.price
   })
  
  },
 
  //  * 生命周期函数--监听页面初次渲染完成
  //  */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})