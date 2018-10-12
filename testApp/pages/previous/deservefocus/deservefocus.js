

const app = getApp()
var fetch = require('../../../utils/fetch')
Page({
  /**
   * 页面的初始数据 
   */
  data: {
    list: [],
  },

  nextgo: function () {
    wx.reLaunch({
      url: '../../homepage/homepage',
    })
  },
  clickfocus: function (e) {

    var id = e.target.dataset.id;
    console.log(id)
    var ii = e.target.dataset.index
    console.log(ii)
    
    
    var that = this
  
    fetch.PostRequest("/api/follow/followuser", { follow_id: id },
      // 成功的回调
      res => {
        console.log(res)
          if (res.data.status == 200) {
            const list = that.data.list
            for (let i = 0; i < list.length; i++) {
              console.log(res.data.data.is_follow)
              list[ii].is_follow = res.data.data.is_follow
            }
            that.setData({
              list: list
            })
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          }
        
      },
      // 失败的回调
      res => {
        console.log('error');
        return false;
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    fetch.PostRequest("/api/follow/userlist", { page: 1, pagesize: 10 },
      // 成功的回调
      res => {
        console.log(res)
        if (res.data.status == 200) {
            that.setData({
              list: res.data.data
            })
          } else {
            console.log('error')
          }
    
      },
      // 失败的回调
      res => {
        console.log('error');
        return false;
      })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(1111)
    this.onPullDownRefresh()

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
    console.log(1111)
    var a = 0;
    var time;
    if (a < 10) {
      time = setInterval(function () { a++; }, 1000)
    } else {
      clearInterval(time)
      console.log(a)
      wx.stopPullDownRefresh()
    }

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
