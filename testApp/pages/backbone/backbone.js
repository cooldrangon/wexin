// pages/backbone/backbone.js
const app = getApp()
const fetch = require('../../utils/fetch')
Page({

  /**
   * 页面的初始数据 
   */
  data: {
    erer: false,
    page: 1,
    pagesize: 3,
    hasMore1: true,
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
    headercontext: "../../image/rectangle.png"
  },
  tab: function (e) {
    if (e.currentTarget.id === '1') {
      wx.setStorageSync('page', 1)
      // console.log(11111)
      this.setData({
        creatapi: 'api/user/create_user_class',
        paging: '/api/userclass/all',
        page: 1,
        pagesize: 3,
        hasMore1: true
      })
      console.log(this.data.creatapi)
      this.allnotes()
      this.notesallclass()
    }
    if (e.currentTarget.id === '2') {
      wx.setStorageSync('page', 1)
      this.allmyself()
      this.setData({
        erer: true,
        creatapi: 'api/user/create_user_class',
        paging: '/api/userclass/all',
        page: 1,
        pagesize: 3,
        hasMore1: true
      })
      this.notesallclass() 
    }
    if (e.currentTarget.id === '3') {
      wx.setStorageSync('page', 1)
      this.setData({
        creatapi: 'api/personal/user_create_class',
        paging: '/api/personal/get_personal_class',
        page: 1,
        pagesize: 3,
        hasMore1: true
      })
      this.allclass()
    }
    if (e.currentTarget.id === '4') {
      wx.setStorageSync('page', 1)
      this.setData({
        page: 1,
        pagesize: 3,
        hasMore1: true
      })
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
      wx.setStorageSync('userid', e.target.dataset.id)
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
  // 点击关于我的头像的时候进入@我的笔记的列表页
  allmyselfenter: function () {
    const id = 'a'
    wx.navigateTo({
      url: './myNotesClassify/myNotesClassify?id=' + id,
    })
  },
  // 点击关于我的时候 渲染所有关于我的 还有下拉刷新的时候也得重新渲染
  allmyself: function () {
    var that = this
    fetch.PostRequest('/api/get/all', {}, res => {
      console.log(res)
      if (this.data.meanslistnoteser == []) {
        this.setData({
          notesnone: true
        })
      } else {
        this.setData({
          notesnone: false
        })
      }
      if (res.data.status == 200) {
        that.setData({
          meanslistnoteser: res.data.data
        })
      }
    }, res => {
      console.log(res)
    })
  },
  // 点击选择创建新账号还是关联账号
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
  // 点击谁可以看我的笔记选择完成后下拉列表和蒙层消失
  confirm: function () {
    console.log(this.data.choicefriend)
    this.setData({
      seenotes: false
    })

  },
  // 点击好友进入添加好友页面
  myfriend: function () {
    wx.navigateTo({
      url: './myfriend/myfriend',
    })
  },
  // 点击关注进入关注页面
  myfocus: function () {
    wx.navigateTo({
      url: './myfocuse/myfocuse',
    })
  },
  // 进入粉丝页面
  myfuns: function () {
    wx.navigateTo({
      url: './myfuns/myfuns',
    })
  },
  //点击谁可以看我的笔记选择完成后点击取消的时候蒙层和列表消失
  cancelseenotes: function () {
    this.setData({
      seenotes: false
    })
  },
  // 点击蒙层消失选项和蒙层、
  allover: function () {
    this.setData({
      seenotes: false
    })
  },
  // 点击进入修改个人资料页面
  editprofile: function () {
    wx.navigateTo({
      url: 'editprofile/editprofile',
    })
  },
  // 封装函数获取所有笔记 因为打开页面时需要获取 点击别的列表再点击笔记时也需要
  allnotes: function () {
    var that = this
    fetch.PostRequest('/api/personal/get_all_userclass', { page: 1, pagesize: 3 }, res => {
      console.log(res)
      if (res.data.status == 200) {
        if (res.data.data == '') {
          this.setData({
            notesnone: true
          })
        } else {
          this.setData({
            notesnone: false
          })
        }
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
  // 点击进入个人中心笔记后获取到所有分类并展示在我的分类中
  notesallclass: function () {
    var that = this
    fetch.PostRequest('/api/userclass/all', { page: 1, pagesize: 3 }, res => {
      console.log(res)
      if (res.data.status == 200) {
        if (res.data.data == '') {
          this.setData({
            noteclass: true
          })
        } else {
          this.setData({
            noteclass: false
          })
        }
        that.setData({
          notesuserInfo: res.data.data
        })
      }
    }, res => {
      console.log(res)
    })
  },
  // 笔记下的我的分类 关于我下的我的分类 收藏下的我的分类实现下拉刷新加载
  loadMore() {
    // page是关注页面的当前页，pagesize每页的条数  pager是广场页面的当前页
    let { page, pagesize } = this.data
    let pagss = wx.getStorageSync('page')
    const params1 = { page: page++, pagesize: pagesize }
    if (page == pagss) {
      return false
    }
    console.log(page)
    wx.setStorageSync('page', page)
    const paging = this.data.paging
    let that = this
    // 判断此时点击的为广场页面还是关注页面
    console.log(params1, paging)
    if (!this.data.hasMore1) return
    // 关注页面
    return fetch.PostRequest(paging, params1, res => {
      console.log(res);
      let notesuserInfo = res.data.data
      if (params1.page > 1) {
        notesuserInfo = that.data.notesuserInfo.concat(res.data.data)
      }
      const totalCount = parseInt('15')
      const hasMore1 = page * pagesize < totalCount
      if (hasMore1 == false) {
        return false
      }
      that.setData({ notesuserInfo, page, hasMore1 })
    })
  },
  // 点击进入个人中心收藏后获取到所有分类并展示在我的分类中
  allclass: function () {
    var that = this
    fetch.PostRequest('/api/personal/get_personal_class', { page: 1, pagesize: 3 }, res => {
      console.log(res)
      if (res.data.status == 200) {
        if (this.data.meanslistnotes == []) {
          this.setData({
            notesnone: true
          })
        } else {
          this.setData({
            notesnone: false
          })
        }
        that.setData({
          notesuserInfo: res.data.data
        })
      }
    }, res => {
      console.log(res)
    })
  },
  // 点击活动时获取活动列表页
  activeList: function () {
    var that = this
    fetch.PostRequest('/api/personal/user_signup_activity', { page: 1, pagesize: 3 }, res => {
      console.log(res)
      if (res.data.status == 200) {
        if (this.data.meanslistnotes == []) {
          this.setData({
            notesnone: true
          })
        } else {
          this.setData({
            notesnone: false
          })
        }
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
  // 进入页面渲染页面头像及孩子头像
  romance: function () {
    var that = this
    fetch.PostRequest("/api/personal/get_find_user_info", {}, res => {
      console.log(res)
      if (res.data.status == 200) {
        const keyword = JSON.stringify(res.data.data.keyword)
        wx.setStorageSync('interested', keyword)
        wx.setStorageSync('Birthday', res.data.data.Birthday)
        that.setData({
          // location: res.data.data.location,
          oneselfurl: res.data.data.avatarimage,
          // 粉丝
          mycount: res.data.data.follow_my_count,
          //  关注
          followcount: res.data.data.follow_count,
          friends: res.data.data.Friends_count,
          cerateimg: res.data.data.bangding_user
        })
      }
    }, res => {
      console.log(res)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setStorageSync('page', 1)
    console.log(9999)
    console.log(options)
    this.setData({
      creatapi: 'api/user/create_user_class',
      paging: '/api/userclass/all'
    })

    this.romance()

    // 点击进入个人中心页面之后初始化获取所有笔记列表
    this.allnotes()
    // 点击进入个人中心页面之后初始化获取所有的分类
    this.notesallclass()

    // 通过获取缓存中修改个人信息的信息改变个人中心页面的个人信息
    wx.getStorage({
      key: 'address',
      success: res => {
        if (res.data.address) {
          this.setData({
            location: res.data.address,
          })

          wx.setStorageSync('location', res.data.address)
        }
        if (res.data.personality) {
          this.setData({
            personality: res.data.personality
          })

          wx.setStorageSync('personality', res.data.personality)
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  onPullDownRefresh: function () {
    this.romance()
    this.loadMore()
    if (this.data.erer) {
      this.allmyself()
    }
  },
  onReachBottom: function () {
    this.romance()
    this.loadMore()
    if (this.data.erer) {
      this.allmyself()
    }
  },
  // 在笔记页面点击更多进入笔记列表页
  noteslist: function () {
    wx.navigateTo({
      url: './myNotesClassify/myNotesClassify',
    })
  },
  // 点击创建新分类 
  newclassify: function () {
    const creatapi = this.data.creatapi
    console.log(creatapi)
    wx.navigateTo({
      url: './newclassify/newclassify?creatapi=' + creatapi,
    })
  },
  // 点击新分类的缩小版图片进入分类列表页
  editorclass: function (e) {
    const id = e.currentTarget.dataset.id
    const stau = true
    wx.navigateTo({
      url: './myNotesClassify/myNotesClassify?id=' + id +'&stau='+stau,
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