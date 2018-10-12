 const app = getApp()
const fetch = require('../../../utils/fetch') 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allarr:[],
    app:[],
    token:app.globalData.token,
    dateTime1: '2017-09-10',
    counter:["穿搭","美食","健康","玩乐","亲子","教育","人生中的第一次"]

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
     counter:this.data.counter
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
  address:function(e){
    this.setData({
      endtime: e.detail.value
    })
  },
  // 个性签名输入监听
  personality:function(e){
    this.setData({
      personality: e.detail.value
    })
    console.log(this.data.personality)
  },
  // 点击设置输入的地址和个性签名保存到缓存中同时返回我的主页
  keep:function(){
    wx.setStorage({
      key: 'address',
      data: { 
      address:this.data.endtime,
      personality:this.data.personality
        },
    })
   const arr1 =  this.data.counter
   const arr2 = []
   for(let s in arr1){
     if(arr1[s].status==true){
       arr2.push(arr1[s].id)
     }
   }
   this.setData({
     keyword:arr2
   })
    console.log(this.data.keyword)
    var that = this
    console.log(that.data.keyword)
    fetch.PostRequest("/api/personal/save_user_info", {
        desc: that.data.personality,
         location:that.data.endtime,
         Birthday: that.data.dateTime1,
         keyword:that.data.keyword
       },
      // 成功的回调
      res => {
        console.log(res)
        if(res.data.status==200){
          wx.reLaunch({
            url: '../backbone',
          })
        }else{
          wx.showToast({
            title: '请填写完整资料',
          })
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
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    this.setData({
      dateTime1:wx.getStorageSync('Birthday'),
      endtime:wx.getStorageSync('location'),
      personality:wx.getStorageSync('personality'),
      interested: JSON.parse(wx.getStorageSync('interested'))
    })
    // 请求标签的回调
    var that = this
    fetch.PostRequest("/api/class", {},
      // 成功的回调
      res => {
        console.log(res)
        if (res.data.status == 200) {
          const counter = res.data.data
          for(let i=0;i<counter.length;i++){
            counter[i].status = false
            that.data.allarr.push(String(counter[i].id))
          }
          that.setData({
            counter: counter
          })
          const arr1 = that.data.counter;
          const arr2 = that.data.interested;
          console.log(arr1,arr2)
          const arr3 = [];
          for (var s in arr1) {
            for (var x in arr2) {
              if (arr1[s].id == Number(arr2[x])) {
                arr1[s].status = true
              }
            }
          }
   this.setData({
     counter:arr1
   })
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