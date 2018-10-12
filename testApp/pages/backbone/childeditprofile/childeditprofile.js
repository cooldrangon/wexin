const app = getApp()
const fetch = require('../../../utils/fetch')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app: [],
    token: app.globalData.token,
    dateTime1: '2017-09-15',
    counter: ["穿搭", "美食", "健康", "玩乐", "亲子", "教育", "人生中的第一次"]

  },
  // 调试生日时间
  changeDateTime1: function (e) {
    console.log(e.detail.value)
    this.setData({ dateTime1: e.detail.value });
  },
  // 点击标签变色
  changColor: function (e) {
    console.log(e)
    let index = e.target.dataset.index
    let id = e.target.dataset.id
    this.data.counter[index].status = !this.data.counter[index].status
    console.log(this.data.counter[index].status)
    this.setData({
      counter: this.data.counter
    })
    if (this.data.counter[index].status == true) {
      this.data.app.push(id)
    } else {
      function arrIntercept(arr, val) {
        var id = arr.indexOf(val)
        if (id > -1) {
          arr.splice(id, 1);
        }
        return arr
      }
      arrIntercept(this.data.app, id)
      console.log(JSON.stringify(this.data.app))
    }
  },
  // 地址输入监听
  address: function (e) {
    this.setData({
      endtime: e.detail.value
    })
  },
  // 个性签名输入监听
  personality: function (e) {
    this.setData({
      personality: e.detail.value
    })
    console.log(this.data.personality)
  },
  // 点击设置输入的地址和个性签名保存到缓存中同时返回我的主页
  keep: function () {
    wx.setStorage({
      key: 'addresschild',
      data: {
        address: this.data.endtime,
        personality: this.data.personality
      },
    }),
      wx.reLaunch({
      url: '../child/child',
      })

    var that = this
    fetch.PostRequest("/api/personal/save_user_info", {
      desc: this.data.personality,
      location: this.data.endtime,
      Birthday: this.data.dateTime1
    },
      // 成功的回调
      res => {
        console.log(res)
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
    this.setData({
      endtime: wx.getStorageSync('locationchild'),
      personality: wx.getStorageSync('personalitychild')
    })
    // 请求标签的回调
    var that = this
    fetch.PostRequest("/api/class", {},
      // 成功的回调
      res => {
        console.log(res)
        if (res.data.status == 200) {
          const counter = res.data.data
          for (let i = 0; i < counter.length; i++) {
            counter[i].status = false
          }
          that.setData({
            counter: counter
          })
          console.log(that.data.counter)
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