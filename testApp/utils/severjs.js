function severs({url,data,success,method='post'}){
  let https = wx.globalData.urls;

  let tokens = wx.globalData.token;
  if(tokens!=''&&tokens!=null){
    var header = { 'content-type': 'application/x-www-form-urlencoded', 'toeken': 'token=' + tokens};
  } else {
    var header = { 'content-type': 'application/x-www-form-urlencoded' };
  }
var that=this;
wx.request({
  url: https+url,
  method: method,
  data:data,
  header:header,
  success:function(data){
    data['status'] == 200 ? success(data.data):that.fail()
  },
  fail:function(err){
    wx.hideLoading();
    wx.showToast({
      title: '请求超时',
      icon: 'loading',
      duration: 2000
    })
  },
  complete:function(old){
    wx.hideToast()
  }
})
}
module.exports = {
  severs: severs
}