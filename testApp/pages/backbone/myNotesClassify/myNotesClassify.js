const app = getApp()
const fetch = require('../../../utils/fetch')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classifyTitle: [],
    iconStatu: false,
    // xuanState: false,
    // 选中的列表数组
    selList: [],
  },
  // 点击编辑状态的变化
  showSelIcon() {
    this.setData({
      iconStatu: !this.data.iconStatu
    })
    console.log(this.data.iconStatu);
  },

  // 删除笔记
  delNotes: function () {
    wx.showModal({
      title: '是否删除所选笔记',
      cancelText: '否',
      confirmText: '是',
      confirmColor: '#000',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定删除')
          // 移除选中的笔记内容
      

        } else if (res.cancel) {
          console.log('用户点击取消删除')
        }
      }
    })
  },


  // 删除笔记分类
  delClassify: function () {
    wx.showModal({
      title: '是否删除分类及其内容',
      cancelText: '否',
      confirmText: '是',
      confirmColor: '#000',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定删除笔记分类')

        } else if (res.cancel) {
          console.log('用户点击取消删除笔记分类')

        }
      }
    })

  },

  // 移至其他分类
  shift: function () {
    wx.showModal({
      title: '是否删除分类及其内容',
      cancelText: '否',
      confirmText: '是',
      confirmColor: '#000',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定移至其他分类')

        } else if (res.cancel) {
          console.log('用户点击取消移至其他分类')

        }
      }
    })

  },
  // 点击我的笔记进入我的笔记的详情页
  toggleSel:function(e){
   const id = e.currentTarget.dataset.id
   const user = e.currentTarget.dataset.id
   wx.navigateTo({
     url: '../../homepage/bjfocuse/bjfocuse?user='+user+'&note_id=' + id,
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    const stau = options.stau
    if (id == 'a') {
      var that = this
      fetch.PostRequest('/api/at/my_note', { page: 1, pagesize: 5 }, res => {
        console.log(res)
        if (res.data.status == 200) {
          that.setData({
            focusman: res.data.data
          })
        }
      }, res => {
        console.log(res)
      })
    } else if(stau && id){  
        const id = options.id
        this.setData({
          id: id
        })
      var that = this
      fetch.PostRequest('/api/class/get_note_all', { class_id:id, page: 1, pagesize: 5 }, res => {
        console.log(res)
        if (res.data.status == 200) {
          that.setData({
            focusman: res.data.data
          })
        }
      }, res => {
        console.log(res)
      })
    } else {
      const id = options.id
      this.setData({
        id: id
      })
      var that = this
      fetch.PostRequest('/api/my/book_all', { page: 1, pagesize: 5 }, res => {
        console.log(res)
        if (res.data.status == 200) {
          that.setData({
            focusman: res.data.data
          })
        }
      }, res => {
        console.log(res)
      })
    }
  },
})