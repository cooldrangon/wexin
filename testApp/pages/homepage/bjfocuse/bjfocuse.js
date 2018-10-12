var fetch = require('../../../utils/fetch')
var app = getApp();
Page({
  /** 
   * 页面的初始数据 
   */
  data: {
    selectedFlag: 'true',
    clicked: 'false',
    value: '',
    noterecord: ["学习", "朋友", "娱乐", "亲子关系"],
    lo: [],
    dataaa: [],
    // responsedata: wx.getStorageSync('responsedata'),
    responsedata: [],
    releaseFocus: false,
    indicatorDots: true,
    isfollow: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    aboutbj: [],
    getInput: null,
    respondata: [],
    firstReviewData: [],
  },

  //预览图片  
  previewImg: function (e) {
    console.log(e)
    var currentUrl = e.currentTarget.dataset.currenturl
    var previewUrls = this.data.lo.coverimages
    wx.previewImage({
      current: currentUrl,
      urls: previewUrls
    })
  },

  // 新建分类
  newcreate: function () {
    this.setData({
      creatapi: 'api/personal/user_create_class'
    })
    const creatapi = this.data.creatapi
    wx.navigateTo({
      url: '/pages/backbone/newclassify/newclassify?creatapi=' + creatapi,
    })
  },

  getInput: function (e) {
    this.setData({
      getInput: e.detail.value
    })
    console.log(this.data.getInput)
  }, //这样写在别处调用时this.data.getInput即可

  // 关注
  focus: function () {
    var that = this
    var userid = that.data.userid
    fetch.PostRequest("/api/follow/followuser", { follow_id: userid }, res => {
      console.log(res)
      if (res.data.status == 200) { 
        const lo = that.data.lo
        console.log(lo)
        console.log(lo.isfollow) 
        this.setData({
          isfollow: !that.data.isfollow
        })
        if (that.data.isfollow) {
          lo.isfollow = 1
          wx.showToast({
            title: '关注成功',
            icon: 'success',
            duration: 2000
          })
          this.setData({
            lo: lo
          })
          console.log(that.data.lo)
        } else {
          lo.isfollow = 0
          wx.showToast({
            title: '取消关注',
            icon: 'success',
            duration: 2000
          })
          this.setData({
            lo: lo
          })
          console.log(that.data.lo)
        }
      }
    }, res => {
      console.log(res)
      console.log('error');
      return false;
    })

  },

  // 分享笔记的功能
  // 点击谁可以看我的笔记显示下拉列表 和 蒙层
  seenotes: function () {
    this.setData({
      seenotes: true
    })

  },
  confirmer: function () {
    this.setData({
      seenotes: false
    })
  },
  cancelseenotes: function () {
    this.setData({
      seenotes: false
    })
  },

  // 点赞功能
  like: function (e) {
    const lo = this.data.lo
    const id = e.target.dataset.id

    const that = this
    fetch.PostRequest("/api/follow/note_num", { note_id: id }, res => {
      console.log(res)
      const admadd_num = res.data.data.adminre_num
      if (res.data.status == 200) {
        const lo = that.data.lo
        lo.adminre_num = res.data.data.adminre_num
        lo.is_follow = res.data.data.is_follow
        that.setData({
          lo: lo
        })
      }
    }, res => {
      console.log('error');
      return false;
    })
  },

  // 笔记第一条评论的点赞功能
  reviewlike: function (e) {
    const heid = this.data.heid
    // const id = e.target.dataset.id
    const that = this
    fetch.PostRequest("/api/comment/click_num", { comment_id: heid }, res => {
      console.log(res)
      if (res.data.status == 200) {
        const firstReviewData = that.data.firstReviewData
        console.log(firstReviewData)
        console.log(firstReviewData[0])

        firstReviewData[0].admire_num = res.data.data.num
        firstReviewData[0].is_follow = res.data.data.is_follow
        that.setData({
          firstReviewData: firstReviewData
        })
        console.log(firstReviewData)
      }
    }, res => {
      console.log('error');
      return false;
    })
  },


  // 点击收藏按钮 请求收藏分类
  storeup: function (e) {
    console.log(e)
    // 笔记id
    const id = e.currentTarget.dataset.id
    const shoucang = e.currentTarget.dataset.shoucang
    console.log(shoucang)
    if (shoucang) {
      wx.showToast({
        title: '您已收藏该笔记',
        icon: 'info',
        duration: 2000
      })
      return false
    } else {
      this.setData({
        bjid: id
      })
      var that = this
      fetch.PostRequest("/api/follow/get_all_album", {}, res => {
        console.log(res)
        if (res.data.status == 200) {
          that.setData({
            storeclassfiy: res.data.data
          })
          console.log(that.data.storeclassfiy)
        }
      }, res => {
        console.log(res)
        console.log('error');
        return false;
      })
      this.setData({
        storeup: true
      })
    }
  },
  // 点击谁可以看我的笔记变色
  changchoice: function (e) {
    console.log(e)
    // 专辑索引
    const choicefriend = e.currentTarget.dataset.index
    if (choicefriend == e.currentTarget.dataset.index) {
      this.setData({
        stamp: true
      })
    }
    // 专辑id
    const albumid = e.currentTarget.dataset.id
    // 收藏发表用户id
    const shareid = e.currentTarget.dataset.shareid
    this.setData({
      choicefriend: choicefriend,
      choicefriendid: albumid,
      shareid: shareid
    })
  },
  // 点击谁可以看我的笔记选择完成后下拉列表和蒙层消失 并获取点击的index值
  confirm: function () {
    var that = this
    const id = that.data.bjid
    const albumid = that.data.choicefriendid
    const shareid = that.data.shareid
    console.log(id)
    console.log(albumid)
    console.log(shareid)
    if (this.data.stamp) {
      fetch.PostRequest("/api/follow/collection_note", { note_id: id, album_id: albumid, Collection_id: shareid }, res => {
        console.log(res)
        if (res.data.status == 200) {

          console.log('收藏成功')
          const lo = that.data.lo
          lo.collect_num = res.data.data.count.collect_num
          lo.is_shouchang = res.data.data.is_shouchang
          this.setData({
            storeup: false,
            choicefriend: that.data.choicefriend,
            lo: lo
          })
          wx.showToast({
            title: '收藏成功',
            icon: 'info',
            duration: 2000
          })
        }
      }, res => {
        console.log(res)
        console.log('error');
        return false;
      })
    }
    // this.setData({
    //   storeup: false,
    //   choicefriend: that.data.choicefriend
    // })
    // console.log(that.data.choicefriend)
  },
  //点击谁可以看我的笔记选择完成后点击取消的时候蒙层和列表消失
  cancelstoreup: function () {
    this.setData({
      storeup: false
    })
  },

  // 显示评论输入框
  bindReview: function (e) {
    this.setData({
      releaseFocus: true,
      indexr: 1
    })
  },
  responseReview: function () {
    this.setData({
      indexr: 2,
      releaseFocus: true
    })
  },


  // 相关笔记页面详情
  notesdetail: function (e) {
    const id = e.currentTarget.dataset.id
    if (id) {
      wx.redirectTo({
        url: '../gcfocuse/gcfocuse?note_id=' + id,
      })
    }
  },
  // 发布评论的确定按钮
  bindSend: function (e) {
    // 笔记id
    const dailyid = this.data.dailyid
    // 评论内容
    const inputvalue = this.data.getInput
    // 评论时间
    // const reviewtime = new Date()
    // console.log(typeof reviewtime.toString)
    var that = this
    console.log(that.data.indexr)
    if (that.data.indexr === 1) {
      // 直接评论
      fetch.PostRequest("/api/follow/reply_comment_content", { works_id: dailyid, content: inputvalue, status: 1, is_type: 0 }, res => {
        console.log(res)
        console.log(res.data.data.content.msg)
        if (res.data.status == 200) {
          const addreview = res.data.data
          that.setData({
            addreview: addreview,
            releaseFocus: false,
            value: '',
          })
        }
      }, res => {
        console.log(res)
        console.log('error');
        return false;
      })
    } else if (that.data.indexr === 2) {
      const heuser_id = that.data.heuser_id
      const heid = that.data.heid
      // 对别人的评论进行评论
      fetch.PostRequest("/api/follow/reply_comment_content", { works_id: dailyid, content: inputvalue, status: 2, is_type: heid, userid: heuser_id }, res => {
        console.log(res)
        console.log(res.data.data.content.msg)
        if (res.data.status == 200) {
          // const firstReviewData = that.data.firstReviewData
          // firstReviewData.count = firstReviewData.count+1
          const respondata = that.data.respondata.concat(res.data.data)
          that.setData({
            respondata: respondata,
            releaseFocus: false,
            value: '',
            // firstReviewData: firstReviewData
          })
        }
      }, res => {
        console.log(res)
        console.log('error');
        return false;
      })
    }

  },

  // 查看回复的展开折叠选择  
  watchResponse: function (e) {
    console.log(this)
    console.log(this.data.selectedFlag)
    this.data.selectedFlag = !this.data.selectedFlag;

    this.setData({
      selectedFlag: this.data.selectedFlag
    })
  },
  // 操作删除、分类按钮
  caozuo: function () {
    this.data.clicked = !this.data.clicked;

    this.setData({
      clicked: this.data.clicked
    })
  },

  // 编辑笔记  
  edit: function () {
    this.caozuo();
    wx.switchTab({
      url: '/pages/homepage/notes/notes'
    })

  },

  // 用户详情删除
  del: function (e) {
    this.caozuo();
    var that = this
    wx.showModal({
      title: '是否删除该笔记',
      cancelText: '否',
      confirmText: '是',
      confirmColor: '#000',
      success: function (res) {
        if (res.confirm) {
          var id = e.target.dataset.index
          console.log(id)
          fetch.PostRequest("/api/follow/note_detail_del", { note_id: 2 }, res => {
            console.log(res)
            if (res.data.status == 200) {
              console.log('删除成功')
            }
          }, res => {
            console.log(res)
            console.log('error');
            return false;
          })
          console.log('用户点击确定删除')
          console.log(e.target.dataset.index)
        } else if (res.cancel) {
          console.log('用户点击取消删除')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var id = options.note_id;
    this.setData({
      id: id
    })
    var from_id = options.from_id;
    // var from_id = options.getString("from_id");
    console.log(id)
    console.log(from_id)
    console.log(typeof (from_id))

    if (!id) {
      return false;
    }
    var that = this
    // 笔记详情页面
    fetch.PostRequest("/api/follow/note_detail", { note_id: id }, res => {
      console.log(res)
      if (res.data.status == 200) {
        this.setData({
          lo: res.data.data,
          userid: res.data.data.user_id,
          dailyid: id,
        })
        // 笔记id
        console.log(that.data.dailyid)
        console.log(that.data.lo)
      }
    }, res => {
      console.log(res)
      console.log('error');
      return false;
    })

    // note_id 为笔记 
    // 笔记详情页面第一条评论详情   //75
    fetch.PostRequest("/api/note/detail_commnet", { note_id: id }, res => {
      console.log(res)
      if (res.data.status == 200) {
        console.log(Boolean(res.data.data))
        console.log(Boolean(res.data.data[0]))

        if (res.data.data[0]) {
          that.setData({
            heid: res.data.data[0].id,
            heuser_id: res.data.data[0].user_id,
          })
          const firstReviewData = res.data.data
          console.log(firstReviewData)
          if (firstReviewData) {
            const insideData = res.data.data[0].data
            if (insideData) {
              that.setData({
                responsedata: insideData
              })
            }
          }
          that.setData({
            firstReviewData: firstReviewData
          })
          console.log(that.data.firstReviewData)
        }
      }
    }, res => {
      console.log(res)
      console.log('error');
      return false;
    })

    // 笔记详情页面相关笔记
    console.log(from_id)
    fetch.PostRequest("/api/follow/recommend_note", { note_id: id, from_id: from_id }, res => {
      console.log(res)
      if (res.data.status == 200) {
        this.setData({
          aboutbj: res.data.data
        })
        console.log(that.data.aboutbj)
      }
    }, res => {
      console.log(res)
      console.log('error');
      return false;
    })
  },
  // 查看所有评论
  watchAllReview: function () {
    const dailyid = this.data.dailyid
    wx.navigateTo({
      url: './watchResponse/watchResponse?dailyid=' + dailyid,
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // console.log(1111)
    var a = 0;
    var time;
    if (a < 10) {
      time = setInterval(function () { a++; }, 1000)
    } else {
      clearInterval(time)
      console.log(a)
      wx.stopPullDownRefresh()
    }
  }
})