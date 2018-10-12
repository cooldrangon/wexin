// pages/backbone/backbone.js
const app = getApp()
const fetch = require('../../../utils/fetch')
Page({ 

  /**
   * 页面的初始数据
   */
  data: {
    cerateimg: [],
    userInfo: [],
    meanslistnotes: [],

    personality: "添加个人描述,让大家更好的认识你",
    location: "完善你的位置信息",
    noterecord: ["关联已有账号", "创建新账号"],
    tabArr: {
      currentId: 1,
      currentBdid: 1
    },
    oneselfurl: "http://test.knowdao.com/tmp/wx003794091721d0fc.o6zAJsydDpw4GKUjWW_EbtM7rXjw.AA3VdQsCh9II0765bf18584d1559cfcc73e185a0e4bc.png",
    headercon: "http://test.knowdao.com/tmp/wx003794091721d0fc.o6zAJsydDpw4GKUjWW_EbtM7rXjw.AA3VdQsCh9II0765bf18584d1559cfcc73e185a0e4bc.png",
    headercontext: "../../../image/rectangle.png"
  },
  tab: function (e) {
    if (e.currentTarget.id === '1') {
      this.allnotes()
      this.allclass()
    }
    if (e.currentTarget.id === '2') {
      console.log(e)
      const userid = this.data.userid
      var that = this
      fetch.PostRequest('/api/get_children/all', {userid:userid}, res => {
        console.log(res)
        if (res.data.status == 200) {
          that.setData({
            meanslistnotes: res.data.data
          })
        }
      }, res => {
        console.log(res)
      })
    }
    if (e.currentTarget.id === '4') {
      this.activeList()
    }
    var dataid = e.currentTarget.id
    var obj = {}
    obj.currentId = dataid
    obj.currentBdid = dataid
    this.setData({
      tabArr: obj
    })
  },
  album: function () {
    var _this = this
    wx.chooseImage({
      count: 4, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        _this.setData({
          headercontext: res.tempFilePaths
        })
      }
    })
  },
  camera: function () {
    var _this = this
    wx.chooseImage({
      count: 4, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        _this.setData({
          headercontext: res.tempFilePaths
        })
      }
    })
  },
  // 点击摄像的图片会从底部出来一个上拉菜单 提示选择从相册选择还是拍摄
  actioncnt: function () {
    wx.showActionSheet({
      itemList: ['从相册选择', '拍摄'],
      success: res => res.tapIndex == 1 ? this.camera() : this.album(),
      fail: function (res) {
      }
    })
  },

  // 跳转绑定的孩子页面
  boundChild: function (e) {
    if (e.currentTarget.dataset.index == 1) {
      wx.navigateTo({
        url: '/pages/backbone/child/child?id=' + e.target.dataset.id
      })
    } else {
      wx.showToast({
        title: '孩子账号已独立',
      })
      return false
    }

  },

  changchoice: function (e) {
    this.setData({
      choicefriend: e.target.dataset.index
    })
    if (this.data.choicefriend == 0) {
      this.confirm()
      wx.navigateTo({
        url: './searchaccount/searchaccount',
      })
    } else if (this.data.choicefriend == 1) {
      this.cancelseenotes()
      wx.navigateTo({
        url: '../details/details',
      })
    }
  },
  // 点击谁可以看我的笔记显示下拉列表 和 蒙层
  seenotes: function () {
    this.setData({
      seenotes: true
    })
  },


  // 点击好友进入添加好友页面
  myfriend: function () {
    wx.navigateTo({
      url: './myfriend/myfriend',
    })
  },
  //点击谁可以看我的笔记选择完成后点击取消的时候蒙层和列表消失
  cancelseenotes: function () {
    this.setData({
      seenotes: false
    })
  },
  // 点击进入修改个人资料页面
  editprofile: function () {
    wx.navigateTo({
      url: '../childeditprofile/childeditprofile',
    })
  },
  // 封装函数获取所有笔记 因为打开页面时需要获取 点击别的列表再点击笔记时也需要
  allnotes: function () {
    var that = this
    fetch.PostRequest('/api/personal/get_all_userclass', { page: 1, pagesize: 3 }, res => {
      console.log(res)
      if (res.data.status == 200) {
        that.setData({
          meanslistnotes: res.data.data
        })
      }
    }, res => {
      console.log(res)
    })
  },
  //  点击所有笔记中的某一项 进入相对应的笔记详情页
  notesdetail: function (e) {
    const note_id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../homepage/bjfocuse/bjfocuse?note_id=' + note_id,
    })
  },
  // 点击进入个人中心后获取到所有分类并展示在我的分类中
  allclass: function () {
    var that = this
    fetch.PostRequest('/api/personal/get_personal_class', { page: 1, pagesize: 3 }, res => {
      console.log(res)
      if (res.data.status == 200) {
        that.setData({
          userInfo: res.data.data
        })
      }
    }, res => {
      console.log(res)
    })
  },

  // 点击确定分享

  onShareAppMessage: function () {

    return {

      title: '弹出分享时显示的分享标题',

      desc: this.data.linkparameter,

      path: 'pages/login/login?data='+this.data.linkparameter, // 路径，传递参数到指定页面。
    }

  },
  confirm:function(){
    this.setData({
      seenotes:false
    })
  },

  // 点击活动时获取活动列表页
  activeList: function () {
    var that = this
    fetch.PostRequest('/api/personal/user_signup_activity', { page: 1, pagesize: 3 }, res => {
      console.log(res)
      if (res.data.status == 200) {
        that.setData({
          activeclass: res.data.data
        })
      }
    }, res => {
      console.log(res)
    })
  },
  // 点击所有关于我的之中的孩子头像进入所有@孩子的笔记
  childseenotes: function (e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: './myNotesMore/myNotesMore?id=' + id,
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const userid = wx.getStorageSync('userid')
    this.setData({
      userid : userid
    })

    var that = this
    fetch.PostRequest("/api/Children_info", {
      user_id: userid
    },
      // 成功的回调
      res => {
        console.log('成功回调')
        console.log(res)
        if (res.data.status == 200) {
          this.setData({
            intial: res.data.data
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

    // 点击进入个人中心页面之后初始化获取所有笔记列表
    this.allnotes()
    // 点击进入个人中心页面之后初始化获取所有的分类
  // 获得分享链接信息
    
      var that = this
      fetch.PostRequest('/api/single/username', { user_id: that.data.userid }, res => {
        console.log(res)
        if (res.data.status == 200) {
          that.setData({
            linkparameter: res.data.data
          })
        }
      }, res => {
        console.log(res)
      })
    

    // 通过获取缓存中修改个人信息的信息改变个人中心页面的个人信息
    wx.getStorage({
      key: 'addresschild',
      success: res => {
        if (res.data.address) {
          this.setData({
            location: res.data.address,
          })

          wx.setStorageSync('locationchild', res.data.address)
        }
        if (res.data.personality) {
          this.setData({
            personality: res.data.personality
          })

          wx.setStorageSync('personalitychild', res.data.personality)
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //  点击返回主页
  revertsheet: function () {
    wx.reLaunch({
      url: '../backbone',
    })
  },
  // 点击解除绑定
  unbound: function () {
    wx.showModal({
      title: '是否解除绑定',
      confirmColor: '#0e0e0e',
      cancelText: "取消",
      confirmText: "确定",
      success: res=> {
        if (res.confirm) {
          console.log(this.data.userid)
          var that = this
          fetch.PostRequest('/api/relieve_user', {id:this.data.userid}, res => {
            console.log(res)
            if (res.data.status == 200) {
              // that.setData({
              //   linkparameter: res.data.data
              // })
            }
          }, res => {
            console.log(res)
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 点击独立账号
  seenotes: function () {
    this.setData({
      seenotes: true
    })
  },
  // 在笔记页面点击更多进入笔记列表页
  noteslist: function () {
    wx.navigateTo({
      url: './myNotesMore/myNotesMore',
    })
  },
  fonudnewlist: function () {
    wx.navigateTo({
      url: './newclassify/newclassify',
    })
  },
  // 点击创建新分类 
  newclassify: function () {
    wx.navigateTo({
      url: './newclassify/newclassify',
    })
  },
  // 点击新分类的缩小版图片进入分类列表页
  editorclass: function () {
    wx.navigateTo({
      url: './myNotesClassify/myNotesClassify',
    })
  },
  //点击进入homepage中的活动的页面
  campaign: function (event) {

    const id = event.currentTarget.dataset.id
    const status = event.currentTarget.dataset.status
    wx.navigateTo({
      url: '../activdetail/activdetail?id=' + id + '&' + 'status=' + status,
    })

  }
})