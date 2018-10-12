// pages/news/likeCollect/likeCollect.js
const app = getApp()
const fetch = require('../../../utils/fetch')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focusman: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    fetch.PostRequest('/api/get/get_fabulous_num', { page: 1, pagesize: '10' }, res => {
      console.log(res)
      if (res.data.status == 200) {
        that.setData({
          focusman: res.data.data
        })
      }
    }, res => {
      console.log(res)
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