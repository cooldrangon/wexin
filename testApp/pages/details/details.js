
const fetch = require('../../utils/fetch')
const qiniuUploader = require("../../utils/qiniuUploader.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seenotes:false,
    dateTime1: '2017-09-15',
    tempFilePaths: "http://test.knowdao.com/tmp/wx003794091721d0fc.o6zAJsydDpw4GKUjWW_EbtM7rXjw.F690Fzu5pHW336d2355a215620ddee75dc0836a64845.png",
    allsex:["男","女"]
  },
  album: function () {
    var _this = this
    wx.chooseImage({
      count: 9, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        console.log(res)
        const filepath = res.tempFilePaths[0]
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片    
        qiniuUploader.upload(filepath, res => {
          console.log(res)
            _this.setData({
              tempFilePaths: app.globalData.urlst + "/" + res.key
            })
          
        }, (error) => {
          console.log('error' + error)
        }, {
            uploadURL: 'https://up-z1.qbox.me/',

            domain: 'bzkdlkaf.bkt.clouddn.com',

            uptoken: _this.data.uploadToken,
          })
      }
    })
  },
  camera: function() {
    var _this = this
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        console.log(res)
        const filepath = res.tempFilePaths[0]
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片    
        qiniuUploader.upload(filepath, res => {
          _this.setData({
            tempFilePaths: app.globalData.urlst + "/" + res.key
          })

        }, (error) => {
          console.log('error' + error)
        }, {
            uploadURL: 'https://up-z1.qbox.me/',

            domain: 'bzkdlkaf.bkt.clouddn.com',

            uptoken: _this.data.uploadToken,
          })
      }
    })
  },
  // 点击摄像的图片会从底部出来一个上拉菜单 提示选择从相册选择还是拍摄
  actioncnt: function() {
    wx.showActionSheet({
      itemList: ['从相册选择', '拍摄'],
      success: res => res.tapIndex == 1 ? this.camera() : this.album(),
      fail: function(res) {
        console.log(111)
      }
    })
  },
  // 点击标签变色 
  changColor: function(e) {
    this.setData({
      key: e.target.dataset.index,
    })
    this.data.keys = this.data.key+1
  },
  changeDateTime1: function(e) {
    console.log(e.detail.value)
    this.setData({
      dateTime1: e.detail.value
    });
  },
  nextgo: function() {
      wx.navigateTo({
        url: '../backbone/backbone?id=1',
      })
    const { endtime, keys, dateTime1} = this.data
    console.log(endtime, keys, dateTime1)
    if (endtime && keys && dateTime1){
       this.setData({
         seenotes:true
       })
    var that = this
      fetch.PostRequest("/api/create_new_username", {
           nickname: this.data.endtime, 
           avatarimage: this.data.tempFilePaths,
           sex: this.data.keys,
           Birthday: this.data.dateTime1
         },
        // 成功的回调
        res => {
          console.log(res)
          if (res.data.status == 200) {
            this.setData({
              seenotes:true
            })
            that.setData({
               desbure:true
             })
           wx.showToast({
              title: '绑定成功',
           })
            wx.reLaunch({
              url: '../backbone/backbone',
            })
            console.log(that.data.squares)
            
          }
        },
        // 失败的回调
        res => {
          wx.showToast({
               title: '请完善绑定信息',
             })
        })
    }
    
  },
  address: function(e) {
    this.setData({
      endtime: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    fetch.PostRequest("/wxchat/upload/upload_token",{}, 
      // 成功的回调
      res => {
        console.log(res)
        if (res.data.status == 200) {
          that.setData({
           uploadToken: res.data.token
         })
          console.log(that.data.squares)
        }
      },
      // 失败的回调
      res => {
        console.log(res)
        console.log('error');
        return false;
      })

    

  },
  getUserInfo: function(e) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})