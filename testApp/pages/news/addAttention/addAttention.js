// pages/news/addAttention/addAttention.js

var fetch = require('../../../utils/fetch')
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    focusman:[]
  },
// 关注按钮
  focus:function(e){
    console.log(e)
    const ii = e.currentTarget.dataset.index
    const userid = e.currentTarget.dataset.yhid
    const that = this
    fetch.PostRequest("/api/follow/followuser", { follow_id: userid }, res => {
      console.log(res)
      if (res.data.status == 200) {
        const focusman = that.data.focusman
        for (let i = 0; i < focusman.length; i++) {
          focusman[ii].is_follow = res.data.data.is_follow
        }
        that.setData({
          focusman: focusman
        })
      }
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
    const page = 1;
    const pagesize = 10;
    var that = this
    fetch.PostRequest("/api/insert/followmsg", { page: page, pagesize: pagesize }, res => {
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
  }
})