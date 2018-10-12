const app = getApp()
var fetch = require('../../../utils/fetch')
// pages/news/formatNews/formatNews.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    app:[],
    state:true,
    focusman: [{ 'index': 0, 'name': 'nam',  'detail': '解除绑定', 'logsrc': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532347783401&di=c2c3fd754e12d06e93a7e4024a260acc&imgtype=0&src=http%3A%2F%2Fuserimages14.51sole.com%2F20170406%2Fb_3971625_201704061559435214.jpg' }, { 'index': 1, 'name': 'nam',  'detail': '建立关联', 'logsrc': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532347783401&di=c2c3fd754e12d06e93a7e4024a260acc&imgtype=0&src=http%3A%2F%2Fuserimages14.51sole.com%2F20170406%2Fb_3971625_201704061559435214.jpg' }, { 'index': 2, 'name': 'nam',  'detail': '添加好友', 'logsrc': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532347783401&di=c2c3fd754e12d06e93a7e4024a260acc&imgtype=0&src=http%3A%2F%2Fuserimages14.51sole.com%2F20170406%2Fb_3971625_201704061559435214.jpg' }, { 'index': 3, 'name': 'nam', 'detail': 'bozhu', 'logsrc': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532347783401&di=c2c3fd754e12d06e93a7e4024a260acc&imgtype=0&src=http%3A%2F%2Fuserimages14.51sole.com%2F20170406%2Fb_3971625_201704061559435214.jpg' }]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const account = wx.getStorageSync("account")
    
    if(account){
      console.log(account)
      var that = this
      fetch.PostRequest("/api/system/msg", { pageINT: 1, pagesizeINT: 5 },
        // 成功的回调
        res => {
          console.log(res.data.data)
           const friendArr=res.data.data
          for (let i = 0; i < friendArr.length; i++) {
            friendArr[i].state = false
          }
          this.setData({
            focusman: friendArr
          })
        },
        // 失败的回调
        res => {
          console.log(res)
          console.log('error');
          return false;
        })
    }
  
  },
  approve:function(e){
    console.log(this.data.focusman)
    let is_type =e.target.dataset.type 
    let id = e.target.dataset.id
    let index = e.target.dataset.index
    this.data.focusman[index].state = true
    this.setData({
      focusman: this.data.focusman
    })
    if (this.data.focusman[index].state == true) { 
      this.data.app.push(id)
      wx.showToast({
        title: '已同意',
      })
    }
if(is_type==3){
  var that = this
  fetch.PostRequest("/api/system/yes_msg", { userid: id }, res => {
    console.log(res)
    if (res.data.status == 200) {

    }
  }, res => {
    console.log(res)
    console.log('error');
    return false;
  })
}else if(is_type==2){
  console.log(id)
  var that = this
  fetch.PostRequest("/api/del_relieve", {id: id }, res => {
    console.log(res)
    if (res.data.status == 200) {

    }
  }, res => {
    console.log(res)
    console.log('error');
    return false;
  })
}
   
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