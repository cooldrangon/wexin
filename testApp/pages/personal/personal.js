var data = require('../../utils/data.js');
var severs = require('../../utils/severjs.js');
const fetch = require('../../utils/fetch') 
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgsrc:'',
    name:'name',
    dateTime1: '2017-09-15',
    sex:'男',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  changeDateTime1: function (e) {
    console.log(e.detail.value)
    this.setData({ dateTime1: e.detail.value });
  },
  nextgo:function(){
    var that = this
    console.log(that.data.keyword)
    fetch.PostRequest("/api/login/update_user_info", {
      Birthday: that.data.dateTime1,
    },
      // 成功的回调
      res => {
        console.log(res)
        if (res.data.status == 200) {
          wx.redirectTo({
            url: '../index/index?id=1',
          })
        } 
      },
      // 失败的回调
      res => {
        console.log(res)
        console.log('error');
        return false;
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      console.log(app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this;
    var time = setInterval(function(){
      that.setData({
        imgsrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532347783401&di=c2c3fd754e12d06e93a7e4024a260acc&imgtype=0&src=http%3A%2F%2Fuserimages14.51sole.com%2F20170406%2Fb_3971625_201704061559435214.jpg'
      })

    },3000)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    console.log(wx.getSystemInfoSync())
    var a = wx.getSystemInfoSync().platform
    if (a.toLowerCase().indexOf("dev") >= 0) {
    
    }
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
    
    wx.stopPullDownRefresh()
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