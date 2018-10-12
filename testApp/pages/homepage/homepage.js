var fetch = require('../../utils/fetch')
var app = getApp()
Page({
  /**
   * 页面的初始数据 
   */
  data: {
    city: "郑州",
    searchValue: '',
    index: 1,
    name: 'focuse',
    noterecord: ["学习", "朋友", "娱乐", "亲子关系"],
    focusman: [],
    squares: [],
    active: [],
    storeclassfiy: [],
    page: 1,
    pagesize: 5,
    pager: 1,
    hasmore:null,
    hasMore1: true,
    hasMore2: true,
    shared:false,
    selList:[],
    liked:'../../assets/img/liked.png',
    heart:'../../assets/img/heart.png',
    changColor: false,
    sendFlag: false,
  },
  // 关注页加载下一页数据
  loadMore() { 
    // page是关注页面的当前页，pagesize每页的条数  pager是广场页面的当前页
    let { page, pagesize, pager } = this.data

    let that = this
    // 判断此时点击的为广场页面还是关注页面
    if (that.data.index === 1) {
      if (!this.data.hasMore1) return
      that.data.hasMore1 = false;
      // 关注页面
      console.log('关注')
      const params1 = { page: page++, pagesize: pagesize }      
      return fetch.PostRequest("/api/follow/list", params1, res => {
        console.log(res);
        if(res.data.data == ''){
            return false
        }else{
          console.log(res.data.count.allcount);

          const totalCount1 = res.data.count.allcount
          // const totalCount1 = parseInt('30')
          const hasMore1 = page * pagesize < totalCount1
          const focusman = that.data.focusman.concat(res.data.data)
          // if (res.data.data == ''){
          //   that.data.hasMore1 = false;          
          // }
          that.setData({ focusman, page, hasMore1 })

          console.log(focusman)
          console.log(that.data.focusman)
        }
       
        if (that.data.focusman.concat(res.data.data) == '') {
          that.setData({ hasmore: false })
        } else {
          that.setData({ hasmore: true })
        }
      // if (!this.data.hasMore1) return
      })
    } else if (that.data.index === 2) {
      if (!this.data.hasMore2) return
      that.data.hasMore2 = false;
      // 广场页面
      console.log('广场')
      const params2 = { pager: pager++, pagesize: pagesize }      
      return fetch.PostRequest("/api/square/square_list", params2, res => {
        console.log(res);
        const totalCount2 = res.data.count.allcount
        // const totalCount = parseInt('30')
        const hasMore2 = pager * pagesize < totalCount2
        const squares = that.data.squares.concat(res.data.data)
        // const squares = res.data.data
        
        that.setData({ squares, pager, hasMore2 })
        console.log(that.data.squares)
        if (that.data.squares.concat(res.data.data) == '') {
          that.setData({ hasmorere: false })
        } else {
          that.setData({ hasmorere: true })
        }
      })
    } else {
      console.log(88888888888)
    }
  },

  // 关注页面的图片点击事件
  concern_detail: function (event) {
    console.log(event)
    // 笔记id
    const id = event.currentTarget.dataset.id
    // 分类id
    const from_id = event.currentTarget.dataset.class
    
    console.log(event.currentTarget.dataset)
    wx.navigateTo({
      url: './bjfocuse/bjfocuse?note_id=' + id + '&' + 'from_id='+ from_id
    })
  },

  // 广场页面的图片点击事件
  squares_detail: function (event) {
    const id = event.currentTarget.dataset.id
    // 分类id
    const from_id = event.currentTarget.dataset.gcclass
    // 
    const gcindex = event.currentTarget.dataset.index
    
    console.log(event.currentTarget.dataset)
    wx.navigateTo({
      url: './gcfocuse/gcfocuse?note_id=' + id + '&' + 'from_id=' + from_id + '&' + 'gcindex=' + gcindex,
    })
  },

  //活动页图片的点击事件
  click_detail: function (event) {
    const id = event.currentTarget.dataset.id
    console.log(event.currentTarget.dataset)
    wx.navigateTo({
      url: '../activdetail/activdetail?id=' + id,
    })
  },
  newcreate:function(){
    this.setData({
      creatapi: 'api/personal/user_create_class'
    })
    const creatapi = this.data.creatapi
    wx.navigateTo({
      url: '/pages/backbone/newclassify/newclassify?creatapi=' + creatapi,
    })
  },

  // 搜索返回页面
  gomine: function () {
    wx: wx.navigateTo({
      url: "/pages/backbone/backbone",
    })
  },
  // updatePostData(category) {
  //   var itemData = this.getPostItemById(),
  //     postData = itemData.data,
  //     allPostData = this.getAllPostData();
  //   switch (category) {
  //     case 'collect':
  //       //处理收藏
  //       if (!postData.collectionStatus) {
  //         //如果当前状态是未收藏
  //         postData.collectionNum++;
  //         postData.collectionStatus = true;
  //       } else {
  //         //如果当前状态是已收藏
  //         postData.collectionNum--;
  //         postData.collectionStatus = false;
  //       }
  //       break;
  //     default: break;
  //   }
  //   //更新缓存数据库  
  //   allPostData[itemData.index] = postData;
  //   this.execSetStorageSync(allPostData);
  //   return postData;
  // },

  // 点赞功能
  like: function (e) {
    console.log(e)
    const contrast = e.target.dataset.index
    console.log(contrast)
    const focusman = this.data.focusman
    const id = e.target.dataset.id
    const that = this
    fetch.PostRequest("/api/follow/note_num", { note_id: id }, res => {
      console.log(res)
      const admadd_num = res.data.data.adminre_num
      if (res.data.status == 200) {
        const focusman = that.data.focusman
        for (let i = 0; i < focusman.length; i++) {
          focusman[contrast].adminre_num = res.data.data.adminre_num
          focusman[contrast].is_follow = res.data.data.is_follow
        }
        that.setData({
          focusman: focusman
        })
      }
    }, res => {
      console.log('error');
      return false;
    })
  },
  gclike: function (e) {
    console.log(e)
    const inx = e.target.dataset.index
    console.log(inx)
    const squares = this.data.squares
    const id = e.target.dataset.id
    //更新本地的点赞、评论信息、收藏、阅读量
    const that = this
    fetch.PostRequest("/api/follow/note_num", { note_id: id }, res => {
      console.log(res)
      // const admadd_num = res.data.data.adminre_num
      if (res.data.status == 200) {
        // console.log(res)
        const squares = that.data.squares
        for (let i = 0; i < squares.length; i++) {
          squares[inx].adminre_num = res.data.data.adminre_num
          squares[inx].is_follow = res.data.data.is_follow
        }
        that.setData({
          squares: squares
        })
      }
    }, res => {
      console.log('error');
      return false;
    })
  },
  // 评论
  comment: function (event) {
    const id = event.target.dataset.id
    console.log(event.target)
    console.log(event.target.dataset)

    //开始跳转传递参数
    wx.navigateTo({
      url: './bjfocuse/bjfocuse?note_id=' + id,
    })
  },

  // 收藏
  // 点击谁可以看我的笔记变色
  changchoice: function (e) {
    console.log(e)
    // 专辑索引
    const choicefriend = e.currentTarget.dataset.index
    if (choicefriend == e.currentTarget.dataset.index){
      this.setData({
        stamp:true
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

  // 点击收藏按钮 请求收藏分类
  storeup: function (e) {
    console.log(e)
    // 笔记id
    const id = e.currentTarget.dataset.id
    // 笔记所在的索引

    const i = e.currentTarget.dataset.index
    const shoucang = e.currentTarget.dataset.shoucang
    console.log(shoucang)
    if (shoucang){
      return false
    }else{
      this.setData({
        bjid: id,
        indx: i
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
  // 点击谁可以看我的笔记选择完成后下拉列表和蒙层消失 并获取点击的index值
  confirm: function () {
    var that = this
    const id = that.data.bjid
    const albumid = that.data.choicefriendid
    const shareid = that.data.shareid
    console.log(id)
    console.log(albumid)
    console.log(shareid)
    if(this.data.stamp){
    fetch.PostRequest("/api/follow/collection_note", { note_id: id, album_id: albumid, Collection_id: shareid }, res => {
      console.log(res)
      if (res.data.status == 200) {

        console.log('收藏成功')
        const focusman = that.data.focusman
        const squares = that.data.squares
        const ii = that.data.indx
        console.log(that.data.index)
        if (that.data.index === 1){
          
          for (let i = 0; i < focusman.length; i++) {
            focusman[ii].collect_num = res.data.data.count.collect_num
            focusman[ii].is_shouchang = res.data.data.is_shouchang
          }
          that.setData({
            focusman: focusman
          })
        } else if (that.data.index === 2){
          for (let i = 0; i < squares.length; i++) {
            squares[ii].collect_num = res.data.data.count.collect_num
            squares[ii].is_shouchang = res.data.data.is_shouchang
          }
          that.setData({
            squares: squares
          })
        }
      } 
    }, res => {
      console.log(res)
      console.log('error');
      return false;
    })
    }
    this.setData({
      storeup: false,
      choicefriend: that.data.choicefriend
    })
    console.log(that.data.choicefriend)
  },
  //点击谁可以看我的笔记选择完成后点击取消的时候蒙层和列表消失
  cancelstoreup: function () {
    this.setData({
      storeup: false
    })
  },

  // 搜索入口  
  wxSearchTab: function () {
    wx.redirectTo({
      url: '../search/search'
    })
  },

  // 关注
  focuss: function () {
    this.setData({
      index: 1,
      name: 'focuse',
      names: 'focuse.wxml'
    });
    this.loadMore()
  },
  // 广场
  squares:function() {
    this.setData({
      index: 2,
      name: 'squares',
    });
    this.loadMore()
  },

  // 获取定位
  obtoinposition: function () {
    app.globalData.guding = 1
    wx.showModal({
      title: '获取您当前的位置信息',
      success: res => {
        if (res.confirm) {
          var that = this
          wx.getLocation({
            success: res => {
              console.log(res)
              const lat = res.latitude
              const log = res.longitude
              wx.request({
                url: "https://api.map.baidu.com/geocoder/v2/?ak=buIqTWtDG7aaRTwgnjncrEXUi1WWw8fs&location=" + lat + "," + log + "&output=json",
                success: res => {
                  console.log(res)
                  this.setData({
                    city: res.data.result.addressComponent.city
                  })
                }
              })
            },
          })
          var that = this
          fetch.PostRequest("/api/activity/activity_list", { place: that.data.city }, res => {
            console.log(res)
            if (res.data.status == 200) {
              that.setData({
                active: res.data.data
              })
            }
          }, res => {
            console.log(res)
            console.log('error');
            return false;
          })
        }
      }
    })

  },
  // 活动
  activitys: function () {
    this.setData({
      index: 3,
      name: 'activ',
      names: 'activ.wxml'
    });
    if (app.globalData.guding !== 1) {
      this.obtoinposition()
    }
    var that = this
    fetch.PostRequest("/api/activity/activity_list", { place: '郑州' },
      // 成功的回调
      res => {
        if (res.data.status == 200) {
          console.log(res)
          that.setData({
            active: res.data.data
          })
        }
      },
      // 失败的回调
      res => {
        console.log('error');
        return false;
      })
    console.log('活动')

  },

  // 通知信息
  informs: function () {
    this.setData({
      index: null
    });
    wx.navigateTo({
      url: '../news/news'
    });
    console.log('通知')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    const status = wx.getStorageSync('status')

    if (options && options.searchValue) {
      this.setData({
        searchValue: "搜索：" + options.searchValue
      });
    }
    let that = this
    wx.getStorage({
      key: 'account',
      success: function (res) {
      },
      fail: function (res) {
        wx.redirectTo({
          url: '../login/login',
        })
      },
    })
      // 进来默认是关注页面开始请求关注接口
      // setTimeout(function () {
      //   that.loadMore()
      // }, 1000)
    that.loadMore()
  },
  // 上拉刷新
  onPullDownRefresh: function () {
    // 重新加载数据
    if (this.data.index == 1){
      this.setData({ focusman: [], page: 1,  hasMore1: true })
      this.loadMore()
      wx.stopPullDownRefresh()
    } else if (this.data.index == 2){
      this.setData({squares: [], pager: 1, hasMore2: true })
      console.log(this.data.squares)
      this.loadMore()
      wx.stopPullDownRefresh()
    }
    // this.setData({ focusman: [], squares: [], page: 1, pager: 1, hasMore1: true, hasMore1: true})
    // // this.loadMore().then(() => wx.stopPullDownRefresh())
    // this.loadMore()
    // wx.stopPullDownRefresh()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore()
  },
})
