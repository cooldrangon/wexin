
const app = getApp()
const fetch = require('../../utils/fetch')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeArr:[],
    indexs: { state: true },
    imagsrc: [],
    list: []
  },
  onLoad() {
    console.log('test is');
    
  },
  nextgo: function () {
    var timesrc;
    var that = this;
    wx.navigateTo({
      url: '../previous/deservefocus/deservefocus',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  changen: function (e) {
    let id = e.target.dataset.id;
    for (let i = 0; i < this.data.list.length; i++) {
      let item = this.data.list[i];
      if (id === item.id) {
        this.data.list[i].state = !this.data.list[i].state;
        this.setData({
          list: this.data.list
        })
      }
    }

  },
  go: function () {
    let activeArr = [];
    for (let i = 0; i < this.data.list.length; i++) {
      let item = this.data.list[i];
      if (item.state === true) {
        activeArr.push(item.id);
      }
    }
    if (activeArr.length == 0) {
      wx.showToast({
        title: '请至少选择一个标签',
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    var that = this
    fetch.PostRequest("/api/login/checklabel", {
      lableid: activeArr
    },
      // 成功的回调
      res => {
        if (res.data.status == 200) {
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 1000
          })
          wx.redirectTo({
            url: '../previous/deservefocus/deservefocus'
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
          return false;
        }
      },
      // 失败的回调
      res => {
        console.log(res)
        console.log('error');
        return false;
      })
  },
  onLoad: function (options) {
 console.log(options)
    var that = this
    fetch.PostRequest("/api/login/label", {
     
    },
      // 成功的回调
      res => {
        if (res.data.status == 200) {
          let data = res.data.data;
          for (let i = 0; i < data.length; i++) {
            let item = data[i];
            item.state = false;
          }
          that.setData({
            list: data
          })
        } else {
          console.log('error')
        }
      },
      // 失败的回调
      res => {
        console.log(res)
        console.log('error');
        return false;
      })
  }
})
