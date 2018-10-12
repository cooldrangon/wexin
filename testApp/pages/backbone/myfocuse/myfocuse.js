// pages/backbone/myfocuse/myfocuse.js
const app = getApp()
const fetch = require('../../../utils/fetch')
Page({

  /**
   * 页面的初始数据
   */ 
  data: {
    focusman: [],
    carepeople:[],
    page: 1,
    pagesize: 10,
    hasMore1: true,
  },
  loadMore() {
    // page是关注页面的当前页，pagesize每页的条数  pager是广场页面的当前页
    let { page, pagesize, pager } = this.data
    const params1 = { page: page++, pagesize: pagesize }
    let that = this
    if (!this.data.hasMore1) return
    // 关注页面
    return fetch.PostRequest("/api/my/follow_list", params1, res => {
      console.log(res);

      // const totalCount = parseInt(res.data.count)
      const totalCount = parseInt('20')
      const hasMore1 = page * pagesize < totalCount
      const carepeople = res.data.data
      for (let i = 0; i < carepeople.length; i++) {
        carepeople[i].delflow = true
      }
      that.setData({carepeople, page, hasMore1 })
    })




  },
  // 点击查看更多进入全部推荐的感兴趣的人的列表页面
  seemore:function(){
    wx.navigateTo({
      url: './seemore/seemore',
    })
  },
  // 点击进入页面之后 渲染出来可能感兴趣的人
  maybeinter:function(){
    var that = this
    fetch.PostRequest('/api/follow/userlist', { page: 1, pagesize: 3 }, res => {
      console.log(res)
      if (res.data.status == 200) {
        const fousman = res.data.data
        for(let i =0;i<fousman.length;i++){
          fousman[i].delflow = true
        }
        that.setData({
          focusman: fousman
        })
        console.log(this.data.focusman)
      }
    }, res => {
      console.log(res)
    }) 
  },
  // 点击进入页面之后 渲染出来我关注的人的数据
  carepeople:function(){
    var that = this
    fetch.PostRequest('/api/my/follow_list', { page: 1, pagesize: 3 }, res => {
      console.log(res)
      if (res.data.status == 200) {
        const carepeople = res.data.data
        for (let i = 0; i < carepeople.length; i++) {
            carepeople[i].delflow = true
          }
        that.setData({
          carepeople:carepeople
        })
      }
    }, res => {
      console.log(res)
    })
  },
  // 关注
  focus: function (e) {
    console.log(e)
    var that = this
    var userid = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
    fetch.PostRequest("/api/follow/followuser", { follow_id: userid }, res => {
      console.log(res)
      if (res.data.msg=='关注成功') {
        this.data.focusman[index].delflow = false
        this.setData({
          focusman: this.data.focusman
        })
      }
      this.carepeople()
    }, res => {
      console.log(res)
      console.log('error');
      return false;
    })

  },
  // 已关注
  aleadyfocus: function (e) {
    console.log(e)
    var that = this
    var userid = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
    fetch.PostRequest("/api/follow/followuser", { follow_id: userid }, res => {
      console.log(res)
      if (res.data.msg == '关注成功') {
        this.data.carepeople[index].delflow = false
        this.setData({
          carepeople: this.data.carepeople
        })
      }
      this.maybeinter()
    }, res => {
      console.log(res)
      console.log('error');
      return false;
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.maybeinter()
    this.carepeople()
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