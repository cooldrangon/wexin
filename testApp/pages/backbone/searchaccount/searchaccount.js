const app = getApp()
const fetch = require('../../../utils/fetch')
// pages/backbone/searchaccount/searchaccount.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:[],
     search:[
       {img:"../../../image/homes.png",
       name:"张三",
       log:"申请关联"}
       ]
  },
  searcher:function(){
    var that = this
    fetch.PostRequest("/api/children", {
      nickname: this.data.searchValue,
      page: 1,
      pagesize: 10
    },
      // 成功的回调
      res => {
        console.log(res)
        if (res.data.status == 200) {
          this.setData({
            userinfo: res.data.data
          })
          console.log(that.data.squares)
        }
      },
      // 失败的回调
      res => {
        console.log(res)
        console.log('error');
        return false;
      })

  },
  applyrelyeancy:function(e){
    console.log(e)

    var that = this
    fetch.PostRequest("/api/children_user", {
         userid: e.target.dataset.id
       },
      // 成功的回调
      res => {
        console.log(res)
        if (res.data.status == 200) {
          wx.showToast({
            title: "申请发送中",
           })
           wx.reLaunch({
             url: '../backbone',
           })
          console.log(that.data.squares)
        } else if (res.data.status == 0){
          wx.showToast({
            title: "不能绑定的账号",
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
  watchPassWord: function (e) {
    this.setData({
      searchValue: e.detail.value
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