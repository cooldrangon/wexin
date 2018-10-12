// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[{}]

  },
  onLoad: function (options) {
  
  },
  // 获赞和收藏
  likeCollect:function(){
    wx:wx.navigateTo({
      url: '/pages/news/likeCollect/likeCollect',
    })
  },

  // 收到的评论
  receiveReview: function () {
     wx.navigateTo({
      url: '/pages/news/receiveComments/receiveComments',
    })
  },

  // 新增关注
  addAttention: function () {
      wx.navigateTo({
      url: '/pages/news/addAttention/addAttention',
    })
  },


  // @我
  aboutMe: function () {
     wx.navigateTo({
      url: '/pages/news/@/@',
    })
  },

  // 私信
  personalChat: function () {
    wx: wx.navigateTo({
      url: '/pages/news/personalChat/personalChat',
    })
  },

  // 通知消息
  formatNews: function () {
    wx: wx.navigateTo({
      url: '/pages/news/formatNews/formatNews',
    })
  },

  // 客服消息
  serviceNews: function () {
    wx: wx.navigateTo({
      url: '/pages/news/serviceNews/serviceNews',
    })
  },

  
})