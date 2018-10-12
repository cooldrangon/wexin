// pages/news/receiveComments/receiveComments.js
var fetch = require('../../../utils/fetch')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focusman:[],
  },

  reviewDetail:function(event){
    // 笔记id
    const id = event.currentTarget.dataset.id
  
    console.log(event.currentTarget.dataset)
    wx.navigateTo({
      url: '../../homepage/gcfocuse/gcfocuse?note_id=' + id,
      // url: 'pages/homepage/bjfocuse/bjfocuse?note_id=' + id
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const page = 1;
    const pagesize = 10;
    var that = this
    fetch.PostRequest("/api/get_msg/comment_list", { page: page, pagesize: pagesize }, res => {
      console.log(res)
      if (res.data.status == 200) {
        this.setData({
          focusman: res.data.data
        })
        console.log(that.data.focusman)
      }
    }, res => {
      console.log(res)
      console.log('error');
      return false;
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