Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'nihao',
    startstime:null,
    endtime:null,
    state:false
  },
  ends:function(e){
    if (this.data.state){
      setTimeout(() => {
        this.setData({ state: false });
      }, 100);
    }
  },
  click:function(){
    if (this.data.state) {
      return
    }
    console.log('触发')
    // if(this.data.state){
    //   if (this.data.startstime - this.data.endtime < 350) {
    //     console.log("点击事件")
    //   }
    // }
    
  },
  longclick:function(){
    this.setData({state:true})
      console.log("长按事件")
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.setData({
    name:'22222'
  })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(1111)
    console.log(this.data.name)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(3333)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log(3333)
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