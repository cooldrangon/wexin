var fetch = require('../../../../utils/fetch')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:null ,
    getInput: null
  },

  getInput: function (e) {
    this.setData({
      getInput: e.detail.value
    })
    console.log(this.data.getInput)
  }, //这样写在别处调用时this.data.getInput即可
  
  // 发送按钮
  sendAnNiu: function (e) {
    // 笔记id
    const dailyid = this.data.dailyid
    // 评论内容
    const inputvalue = this.data.getInput
    console.log(inputvalue)
    const userid = this.data.userid
    
    // 评论时间
    // const reviewtime = new Date()
    // console.log(typeof reviewtime.toString)
    var that = this
    // 直接评论
    fetch.PostRequest("/api/follow/reply_comment_content", { works_id: dailyid, content: inputvalue, status: 2, is_type: 0, userid: userid }, res => {
      console.log(res)
      console.log(res.data.data.content.msg)

      if (res.data.status == 200) {
        const tabj = that.data.tabj.concat(res.data.data)
        that.setData({
          tabj: tabj,
          value:''
          // releaseFocus: false
        })
      }
    }, res => {
      console.log(res)
      console.log('error');
      return false;
    })
  },

  // 展开折叠选择  
  watchResponse: function (e) {
    // 评论的id
    const id = e.currentTarget.dataset.id
    const index = e.currentTarget.dataset.inx

    console.log(id)
    console.log(index)
    const tabj = this.data.tabj
    console.log(tabj)
    const that = this     
    tabj[index].selectedFlag = !tabj[index].selectedFlag;  
    // for (let i = 0; i < tabj.length; i++) {
    //   console.log(!tabj[index].selectedFlag)
    //   tabj[index].selectedFlag = !tabj[index].selectedFlag;
    // }
    that.setData({
      tabj: tabj
    })
    console.log(that.data.tabj)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const dailyid = options.dailyid
    this.setData({dailyid: dailyid})
    const page = 1;
    const pagesize = 10;
    // 评论列表
    var that = this
    fetch.PostRequest("/api/follow/get_comment_content", { page: page, pagesize: pagesize, note_id:dailyid}, res => {
      console.log(res)
      if (res.data.status == 200) {
        if (res.data.data==''){
            return false
        }else{
          that.setData({
            count:res.data.count,
            tabj: res.data.data,
            userid: res.data.data[0].user_id,
          })
          console.log(that.data.tabj)
          let tabj = that.data.tabj;
          // 给 tabj数组动态添加了selStatu属性
          tabj.map(function (value) {
            value.selectedFlag = true;
          })
          that.setData({           
            tabj: tabj,
          })
          console.log(that.data.tabj)
          console.log(that.data.userid)
        }
      }
    }, res => {
      console.log(res)
      console.log('error');
      return false;
    })   
  },
})