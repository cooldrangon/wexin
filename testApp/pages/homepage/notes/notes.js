const qiniuUploader = require("../../../utils/qiniuUploader.js");
var app = getApp();
const fetch = require('../../../utils/fetch')
// pages/homepage/notes/notes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shade:false,
    hongcha:false,
    screen:'公开',
    add:[],
    xytemp: false,
    temp: [],
    changColor: false,
    sendFlag: false,
    pencilimg: "../../../assets/img/pencil.jpg",
    tempFilePaths: [],
    tempFilepath: "../../../assets/img/camera.png",
    noterecord: ["所有人", "仅好友可见", "仅自己可见"],
    addsitess:'',
    addsite: "添加地点"
  },
  album: function () {
    var _this = this
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function(res) {  
        const filepath = res.tempFilePaths[0]
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片    
        qiniuUploader.upload(filepath, res => {
          _this.data.temp.push(app.globalData.urlst + "/" + res.key)
          if (_this.data.temp.length > 0) {

            _this.setData({
              xytemp: true,
              temp: _this.data.temp
            })
          }
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
  camera: function () {
    var _this = this
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        const filepath = res.tempFilePaths[0]
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片    
        qiniuUploader.upload(filepath, res => {
          _this.data.temp.push(app.globalData.urlst + "/" + res.key)
          if (_this.data.temp.length > 0) {

            _this.setData({
              xytemp: true,
              temp: _this.data.temp
            })
          }
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
  actioncnt: function () {
    wx.showActionSheet({
      itemList: ['从相册选择', '拍摄'],
      success: res => res.tapIndex == 1 ? this.camera() : this.album(),
      fail: function (res) { }
    })
  },
  // 点击红叉删除图片
  hongcha:function(e){
    const index = e.currentTarget.dataset.index
    const templi = this.data.temp[index].replace(app.globalData.urlst + "/", '')
    console.log(templi)
    var that = this
    fetch.PostRequest('/api/del/qiniu_pic', { pic: templi },
      // 成功的回调
      res => {
        console.log(res)
        if (res.data.status == 200) {
          const temp = this.data.temp
          this.data.temp.splice(index, 1)
          this.setData({
            hongcha:false,
            temp: this.data.temp
          })
          console.log(this.data.temp)
        }

      },
      // 失败的回调
      res => {
        console.log(res)
        console.log('error');
        return false;
      })

  },
  // 点击长按图片显示红叉
  delimage:function(e){
    this.setData({
      hongcha:true
    })
  },
  // 点击取消编辑 点击确定的时候 把编辑的数据给endtime
  settextarea: function (e) {
    this.setData({
      endtime: e.detail.value
    })
  },
  setinput: function(e) {
    this.setData({
      endinput: e.detail.value
    })
  },
  // 点击退出此次编辑并把数据传送给setStorage
  cancel: function() {
    wx.showModal({
      title: "是否退出本次编辑",
      success: res => {
        if (res.confirm) {
          wx.setStorageSync('textarea', this.data.endtime)
          wx.setStorageSync('textinput', this.data.endinput)
          wx.reLaunch({
            url: '../homepage',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 点击标签变色 
  changColor: function (e) {
    this.setData({
      changColor: true,
      sendFlag: false
    })
    console.log(e)
    let index = e.target.dataset.index
    let id = e.target.dataset.id
    this.data.counter[index].status = !this.data.counter[index].status
    console.log(this.data.counter[index].status)
    this.setData({
      counter: this.data.counter
    })
    if (this.data.counter[index].status == true) {
      this.data.add.push(id)
      console.log(this.data.add)
    } else {
      function arrIntercept(arr, val) {
        var id = arr.indexOf(val)
        if (id > -1) {
          arr.splice(id, 1);
        }
        return arr
      }
      arrIntercept(this.data.add, id)
      console.log(this.data.add)
    }
  },
  // 点击谁可以看我的笔记变色
  changchoice: function(e) {
    console.log(e)
    const choicefriend = e.target.dataset.id
    const trice = this.data.noterecord[choicefriend].name
    const triced=trice.slice(0,3)
    this.setData({
      screen:triced,
      choicefriend: e.target.dataset.index,
      choicefriendid: e.currentTarget.dataset.id
    })
  },
  // 点击谁可以看我的笔记显示下拉列表 和 蒙层
  seenotes: function () {
    this.setData({
      seenotes: true
    })
  },
  // 点击谁可以看我的笔记选择完成后下拉列表和蒙层消失 并获取点击的index值
  confirm: function() {
    this.setData({
      seenotes: false,
      choicefriend: this.data.choicefriend
    })
  },
  //点击谁可以看我的笔记选择完成后点击取消的时候蒙层和列表消失
  cancelseenotes: function () {
    this.setData({
      seenotes: false
    })
  },
  // 点击添加地点
  addsite: function () {
    wx.chooseLocation({
      success: res => {
        this.setData({
          addsitess: res.name,
        })
        this.setData({
          addsite: this.data.addsitess
        })
      },
    })
  },
  firend: function() {
    var that = this
    fetch.PostRequest('/api/my_friends', {
         token: app.globalData.token,
         account: app.globalData.account
       },
      // 成功的回调
      res => {
        console.log(res)
        const friend = JSON.stringify(res.data.data)
        wx.navigateTo({
          url: '../../news/@friend/@friend?friend=' + friend,
        })
      },
      // 失败的回调
      res => {
        console.log(res)
        console.log('error');
        return false;
      })
  },
  // 点击发布按钮
  publish: function () {
    let apd = wx.getStorageSync("app")
    if(apd){
      let apb = JSON.parse(apd)
      let app = Array.from(apb)
      this.setData({
        app: app
      })
    }

    this.setSendFlag();
    let title = this.data.endinput
    let ateuser = this.data.app
    let coverimages = this.data.temp
    let temp = []
    for(var i=0;i<coverimages.length;i++){
      temp.push(coverimages[i].replace(app.globalData.urlst, ''))
    }
    let content = this.data.endtime
    let location = this.data.addsitess
    console.log(location)
    let status = this.data.choicefriend
    let from_id = this.data.add
    console.log(status)
    console.log(coverimages.length)
    if (coverimages.length < 3){
     wx.showModal({
       title: '图片',
       content: '图片最少上传三张',
     })
    }
    if ( title && coverimages.length>=3 && content && location && status && from_id) {
      this.setData({
        shade:true
      })
      var that = this
      fetch.PostRequest("/api/note_Release", {
           title: that.data.endinput,
           ateuser: that.data.app,
           coverimages: temp,
           content: that.data.endtime,
           location: that.data.addsitess,
           status: that.data.choicefriend,
           from_id: that.data.add,
           type: 1
         },
        // 成功的回调
        res => {
          console.log(res)
          if(res.data.status==200){
            wx.showToast({
              title: '发布成功',
              success:res=> {
                wx.reLaunch({
                  url: '../homepage',
                })
                wx.setStorageSync('digit',[] )
               },
            })
          }
        },
        // 失败的回调
        res => {
          console.log(res)
          console.log('error');
          return false;
        })

     
    }else{
      wx.showToast({
        title: '请完善你发布的信息',
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const endtime = wx.getStorageSync('textarea')
    const endinput = wx.getStorageSync('textinput')
    this.setData({
      choicefriend:4,
      endtime:endtime,
      endinput:endinput
    })
    // 请求的权限列表
    console.log(app.globalData.account)

    var that = this
    fetch.PostRequest("/api/jurisdiction", {},
      // 成功的回调
      res => {
        console.log(res)
        if (res.data.status == 200) {
          that.setData({
         noterecord: res.data.data
         })
          console.log(that)
        }
      },
      // 失败的回调
      res => {
        console.log(res)
        console.log('error');
        return false;
      })

   
    // 请求的标签列表

    var that = this
    fetch.PostRequest("/api/class", {},
      // 成功的回调
      res => {
        console.log(res)
        if (res.data.status == 200) {
          const counter = res.data.data
          for(var x in counter){
           counter[x].status=false
          }
          that.setData({
           counter: counter
         })
          console.log(that.data.counter)
        }
      },
      // 失败的回调
      res => {
        console.log(res)
        console.log('error');
        return false;
      })

    
   wx.getStorage({
     key: 'app',
     success: res=> {
       let app = JSON.parse(res.data)
       console.log(app)
       this.setData({
         app: app
       })
     },
     fail: function(res) {},
     complete: function(res) {},
   })

   
    var that = this
    fetch.PostRequest("/wxchat/upload/upload_token", {},
      // 成功的回调
      res => {
        console.log(res)
        if (res.data.status == 200) {
          that.setData({
           uploadToken:res.data.token
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

   
    console.log(app.globalData.account)
  },
  
  

  setSendFlag: function () {
    if (!this.data.changColor) {
      this.setData({
        sendFlag: true
      });
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