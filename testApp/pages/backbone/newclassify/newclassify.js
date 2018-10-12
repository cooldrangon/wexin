// pages/backbone/newclassify/newclassify.js
const app = getApp()
const fetch = require('../../../utils/fetch')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textinput:''
  },

  setinput: function (e) {
    this.setData({
      endinput: e.detail.value
    })
    console.log(this.data.endinput)
  },
  tesinput: function (e) {
    this.setData({
      textinput: e.detail.value
    })
    console.log(this.data.textinput)
  },
  sendnewclass:function(){

    var that = this
    fetch.PostRequest('/' +that.data.creatapi,{ class_name: this.data.endinput, class_desc: this.data.textinput}, res => {
      console.log(res)
      if (res.data.status == 200) {
        wx.reLaunch({
          url: '../backbone',
        })
      }
    }, res => {
      console.log(res)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      creatapi: options.creatapi
    })
    console.log(this.data.creatapi)    
    return false;
   
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