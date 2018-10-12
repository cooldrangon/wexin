const app = getApp()
const fetch = require('../../../utils/fetch')
Page({

  /**
   * 页面的初始数据 
   */
  data: {
    focusman: [],
    adelstate:'删除'
  },

  delFriend:function(e){
   console.log(e)
  if(e.currentTarget.dataset.content=="删除"){
    wx.showModal({
      title: '是否解除好友关系',
      cancelText: '否',
      confirmText: '是',
      confirmColor: '#000', 
      success: res=>{
        if (res.confirm) {
          let addfriend = e.currentTarget.dataset.friendid
          console.log(addfriend)
          var that = this
          fetch.PostRequest("/api/del/user_friend", {friend_id: addfriend},
            // 成功的回调
            res => {
            console.log(res)
              if (res.data.status == 200) {
              let id = e.target.dataset.friendid
                console.log(id)
                let index = e.target.dataset.index
                that.data.focusman[index].status = false
                that.setData({
                  focusman: that.data.focusman
                })
                console.log(that.data.focusman)
              }
            },
            // 失败的回调
            res => {
              console.log(res)
              console.log('error');
              return false;
            })
        } else if (res.cancel) {
        }
      }
    })
  } else if (e.currentTarget.dataset.content == "添加") {
    wx.showModal({
      title: '是否添加对方为好友',
      cancelText: '否',
      confirmText: '是',
      confirmColor: '#000',
      success: res=> {
        if (res.confirm) {
          const addfriend = e.currentTarget.dataset.id
          var that = this
          fetch.PostRequest("/api/add/friend", {friend_id:addfriend},
            // 成功的回调
            res => {
              let id = e.target.dataset.id
              let index = e.target.dataset.index
              this.data.focusman[index].state = !this.data.focusman[index].state
              this.setData({
                focusman: this.data.focusman
              }) 
              if (res.data.status == 200) {
               wx.showToast({
                 title: '请求已经发送',
               })
              }
            },
            // 失败的回调
            res => {
              console.log(res)
              console.log('error');
              return false;
            })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }

  },
  searcher: function () {
    console.log(this.data.searchValue)
    var that = this
    fetch.PostRequest("/api/search/friend", {
      search: that.data.searchValue,
    },
      // 成功的回调
      res => {
        if (res.data.status == 200) {
          console.log(res)
          that.setData({
            focusman: res.data.data,
            adelstate:"添加"
          })
          if (res.data.data == '') {
            this.setData({
              notesnone: true
            })
            wx.showToast({
              title: '用户不存在',
              icon: 'warn'
            })
          } else {
            this.setData({
              notesnone: false
            })
          }
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
    var that = this
    fetch.PostRequest('/api/follow/follow_lists', {
      account: wx.getStorageSync('account'),
      token: wx.getStorageSync('token')
    },
      // 成功的回调
      res => {
        console.log(res)
        if (res.data.status == 200) {
          
          let friendArr = res.data.data
            for (let i = 0; i < friendArr.length; i++) {
              friendArr[i].state = false
              friendArr[i].status=true
            }
            this.setData({
              focusman: friendArr
            })
            console.log(this.data.focusman)
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