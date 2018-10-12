//index.js
var WxSearch = require('../../wxSearchView/wxSearchView.js');
const app = getApp()
Page({
  data: {

  },

  // 搜索栏
  onLoad: function () {
    var that = this;
    WxSearch.init(
      that,  // 本页面一个引用
      ['亲子', '亲子教育', "亲子培训", "烘焙", '参与学习', '共同进步'], // 热点搜索推荐，[]表示不使用
      ['亲子活动', '亲子教育', '亲子培训', "亲子"],// 搜索匹配，[]表示不使用
      that.mySearchFunction, // 提供一个搜索回调函数
      that.myGobackFunction //提供一个返回回调函数
    );
  },
  backhome:function(){
    wx.switchTab({
      url: '/pages/homepage/homepage',
    })
    app.globalData.guding = 2
  },

  // 转发函数,固定部分
  wxSearchInput: WxSearch.wxSearchInput,  // 输入变化时的操作
  wxSearchKeyTap: WxSearch.wxSearchKeyTap,  // 点击提示或者关键字、历史记录时的操作
  wxSearchDeleteAll: WxSearch.wxSearchDeleteAll, // 删除所有的历史记录
  wxSearchConfirm: WxSearch.wxSearchConfirm,  // 搜索函数
  wxSearchClear: WxSearch.wxSearchClear,  // 清空函数


  // 搜索回调函数  
  mySearchFunction: function (value) {
    // do your job here
    // 跳转
    wx.redirectTo({
      url: '../homepage/homepage?searchValue=' + value
    })
  },

  // 返回回调函数
  myGobackFunction: function () {
    // do your job here
    // 跳转
    wx.redirectTo({
      url: '../homepage/homepage?searchValue=返回'
    })
  },

  
   setSearchStorage: function () {
     wx.navigateTo({
       url: '/pages/search/searchResult/searchResult',
     })
  },

})
