// pages/backbone/backbone.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meanslist: [{
      img: "../../../image/1.png",
      title: "课外班",
      depict: "高考英语145分分享英语学习技巧"
    }, {
      img: "../../../image/1.png",
      title: "学校",
      depict: "高考英语145分分享英语学习技巧"
    }, {
      img: "../../../image/1.png",
      title: "亲子",
      depict: "高考英语145分分享英语学习技巧"
      }, {
        img: "../../../image/1.png",
        title: "亲子",
        depict: "高考英语145分分享英语学习技巧"
      }],
    personality: "添加个人描述,让大家更好的认识你",
    location: "完善你的位置信息",
    noterecord: ["关联已有账号", "创建新账号"],
    tabArr: {
      currentId: 1,
      currentBdid: 1
    },
    oneselfurl: "../../../assets/tabs/add.png",
    // headercontext:"https://wx.knowdao.com/uploads/20180905/154d4032d2bc71e85bcb65b891ebed1d.png"
    headercontext: "../../../image/rectangle.png"
  },
  tab: function (e) {
    var dataid = e.currentTarget.id
    var obj = {}
    obj.currentId = dataid
    obj.currentBdid = dataid
    this.setData({
      tabArr: obj
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