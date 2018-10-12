// pages/backbone/myfocuse/seemore/seemore.js
const app = getApp()
const fetch = require('../../../../utils/fetch')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    pagesize: 10,
    hasMore1: true,
    focusman:[]
  },
  loadMore() {
    // page是关注页面的当前页，pagesize每页的条数  pager是广场页面的当前页
    let { page, pagesize, pager } = this.data
    const params1 = { page: page++, pagesize: pagesize }
    let that = this
    // 判断此时点击的为广场页面还是关注页面
    console.log(params1)
      if (!this.data.hasMore1) return
      // 关注页面
    return fetch.PostRequest("/api/follow/userlist", params1, res => {
        console.log(res);

        // const totalCount = parseInt(res.data.count)
        const totalCount = parseInt('20')
        const hasMore1 = page * pagesize < totalCount
        const focusman = res.data.data
        that.setData({ focusman, page, hasMore1 })
      })

   


  },
  // 点击进入页面之后 渲染出来可能感兴趣的人
  maybeinter: function () {
    var that = this
    fetch.PostRequest('/api/follow/userlist', { page: 1, pagesize: 3 }, res => {
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.maybeinter()
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
    this.loadMore()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})