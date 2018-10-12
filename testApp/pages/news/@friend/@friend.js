// pages/backbone/myfriend/myfriend.js// pages/backbone/myfriend/myfriend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app: [],
    focusman: [],
  },
  //用户点击的时候出现对号 并把点击选中的index push进一个新的数组中当再次点击时取消选中状态 并从数组中把之前选中的index给截取了
  select: function(e) {
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    this.data.focusman[index].state = !this.data.focusman[index].state
    console.log(this.data.focusman)
    this.setData({
      focusman: this.data.focusman
    })
    if (this.data.focusman[index].state == true) {
      console.log(id)
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
    }
    wx.setStorageSync('digit', this.data.app)
  },
  confirm: function() {
    if (this.data.app.length > 0) {
      const app = JSON.stringify(this.data.app)

      wx.setStorageSync('app', app)
      wx.navigateBack({
        delta: 1
      })
    } else {
      wx.navigateBack({
        delta: 1
      })
    }
  },
  /*
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.friend) {
      let friendArr = JSON.parse(options.friend)
      console.log(friendArr)
      for (let i = 0; i < friendArr.length; i++) {
        friendArr[i].state = false
      }
      this.setData({
        focusman: friendArr
      })
      console.log(this.data.focusman)
      const digit = wx.getStorageSync('digit')
      if (digit) {
        const app = digit
        for (let x in friendArr) {
          for (let t in digit) {
            if (digit[t] == friendArr[x].friend_id) {
              friendArr[x].state = true
            }
          }
        }
        this.setData({
          focusman: friendArr,
          app: app
        })
      }
    }
  }
})