Page({
  /**
   * 页面的初始数据 
   */
  data: {
    tabj: [{ 'name': 'name', 'detail': 'bozhu', 'time': '07-12 13:03', 'logsrc': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532347783401&di=c2c3fd754e12d06e93a7e4024a260acc&imgtype=0&src=http%3A%2F%2Fuserimages14.51sole.com%2F20170406%2Fb_3971625_201704061559435214.jpg', 'location': '河南郑州' },],
    aboutbj: [
      { 'name': 'name', 'detail': 'bozhu', 'time': '07-12 13:03', 'logsrc': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532347783401&di=c2c3fd754e12d06e93a7e4024a260acc&imgtype=0&src=http%3A%2F%2Fuserimages14.51sole.com%2F20170406%2Fb_3971625_201704061559435214.jpg', 'location': '河南郑州' }, { 'name': 'name', 'detail': 'bozhu', 'time': '07-12 13:03', 'logsrc': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532347783401&di=c2c3fd754e12d06e93a7e4024a260acc&imgtype=0&src=http%3A%2F%2Fuserimages14.51sole.com%2F20170406%2Fb_3971625_201704061559435214.jpg', 'location': '河南郑州' }],
    selectedFlag: 'true',
    clicked: 'false',
    noterecord: ["学习", "朋友", "娱乐", "亲子关系"]
    // selectedFlag: [false, false, false]
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
    wx.navigateTo({
      url: '/pages/homepage/notes/notes'
    })

  },

  del: function () {
    this.caozuo();
    wx.showModal({
      title: '是否删除该笔记',
      cancelText: '否',
      confirmText: '是',
      confirmColor: '#000',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定删除')
        } else if (res.cancel) {
          console.log('用户点击取消删除')
        }
      }
    })
  },

  // 点击谁可以看我的笔记变色
  changchoice: function (e) {
    this.setData({
      choicefriend: e.target.dataset.index
    })
  },
  // 点击谁可以看我的笔记显示下拉列表 和 蒙层
  classfiy: function () {
    this.caozuo();
    this.setData({
      classfiy: true
    })

  },
  // 点击谁可以看我的笔记选择完成后下拉列表和蒙层消失
  confirm: function () {
    console.log(this.data.choicefriend)
    this.setData({
      classfiy: false
    })
    console.log('用户点击确定分类')
  },
  //点击谁可以看我的笔记选择完成后点击取消的时候蒙层和列表消失
  cancelclassfiy: function () {
    this.setData({
      classfiy: false
    })
    console.log('用户点击取消分类')
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  watchAllReview: function () {
    wx.navigateTo({
      url: '/pages/homepage/bjfocuse/watchResponse/watchResponse',
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
    console.log(1111)
    this.onPullDownRefresh()

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
    console.log(1111)
    var a = 0;
    var time;
    if (a < 10) {
      time = setInterval(function () { a++; }, 1000)
    } else {
      clearInterval(time)
      console.log(a)
      wx.stopPullDownRefresh()
    }

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