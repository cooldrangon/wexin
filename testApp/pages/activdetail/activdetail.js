// pages/activdetail/activdetail.js


var WxParse = require('../../utils/wxParse/wxParse.js');
var fetch = require('../../utils/fetch')

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focusman: [],
    article_content:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var id = options.id;
    const status = options.status
    this.setData({
      status : status
    })
    if (!id) {
      return false;
    }
    var that = this
    fetch.PostRequest("/api/activity/detail", { id: id },
      // 成功的回调
      res => {
        console.log(res)
        if (res.data.status == 200) {
          that.setData({
            focusman: res.data.data,
            article_content: WxParse.wxParse('article_content', 'html', res.data.data.detailcontent, that, 5)
          })
          console.log(that.data.focusman)
        }
      },
      // 失败的回调
      res => {
        console.log('error');
        return false;
      })

  },
  // 去报名
  gosign: function () {
    const id = this.data.focusman.id
    const price = this.data.focusman.price
    wx.navigateTo({
      url: "/pages/activdetail/sign/sign?id="+id+"&price="+price,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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