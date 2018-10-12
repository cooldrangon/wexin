Page({
  /**
   * 页面的初始数据 
   */
  data: {
    tabj: [{ 'name': 'name', 'detail': 'bozhu', 'time': '07-12 13:03','logsrc': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532347783401&di=c2c3fd754e12d06e93a7e4024a260acc&imgtype=0&src=http%3A%2F%2Fuserimages14.51sole.com%2F20170406%2Fb_3971625_201704061559435214.jpg','location':'河南郑州' }]
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  watchResponse:function(){
    wx.navigateTo({
      url: '/pages/focuse/watchResponse/watchResponse',
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