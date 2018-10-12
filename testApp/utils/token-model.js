// import { Config } from 'config.js';

// class Token {
//   constructor() {
//     console.log(this)
//     this.verifyUrl = Config.restUrl + '/api/validate/token';
//     this.tokenUrl = Config.restUrl + '/api/login/get_openid';
//   }

//   verify() {
//     var token = wx.getStorageSync('token');
//     console.log(token)
//     if(!token) {
//       this.getTokenFromServer(token);
//     }else{
//       this._verifyFromServer(token);
//     }
//   }

//   // 携带令牌去服务器校验令牌
//   _verifyFromServer(token) { 
//     console.log(11212)
//     var that = this;
//     const account = wx.getStorageSync("account")
//     const tokenn = wx.getStorageSync("token")
//     wx.request({
//       url: that.verifyUrl,
//       method: 'POST',
//       data: {
//         token: tokenn,
//         account:account
//       },
//       success: function (res) {
//         console.log(res)
      
//         var valid = res.data.data.token;
//         console.log(valid)
//         console.log(wx.getStorageSync('token'))
//         if (wx.getStorageSync('token') != valid) {
//           wx.setStorageSync("token", valid)
//           console.log(wx.getStorageSync("account"))
//           // that.getTokenFromServer();
//         }
//       }
//     })
//   }
//   changlink(url){
//     //建立连接
//     console.log(url)
//     wx.connectSocket({
//       url: url,
//     })
//     //连接成功
//     const userid = wx.getStorageSync('userid')
//     wx.onSocketOpen(function () {
//       const msg = {}
//       msg.type = 'login';
//       msg.user_id = userid;
//       var b = JSON.stringify(msg)
//       console.log(b)
//       wx.sendSocketMessage({
//         data: b,
//       })
//       console.log('连接成功');
//     })
//     wx.onSocketMessage(function (res) {
//       console.log(res)
    
//     })

//   }


//   // 从服务器获取token
//   getTokenFromServer(callback) {
//     var that = this;
//     wx.login({
//       success: function(res) {
//         let code = res.code
//         wx.getUserInfo({
//           lang: "zh_CN",
//           success: res => {
//             let userInfo = res.userInfo
//             wx.request({
//               url: that.tokenUrl,
//               method: 'POST',
//               data: {
//                 code: code,
//                 nickname: userInfo.nickName,
//                 gender: userInfo.gender,
//                 avatarUrl: userInfo.avatarUrl,
//                 city: userInfo.city
//               },
//               header: {
//                 "content-type": "application/x-www-form-urlencoded",
//                 'content-type': 'application/json'
//               },
//               success: function (res) {
//                 console.log(res)
//                 wx.setStorageSync('token', res.data.data.token);
//                 wx.setStorageSync('account', res.data.data.account);
//                 wx.setStorageSync('userid', res.data.data.user_id);
//               }
//             })
//           }
//         })
        
//       }
//     })
//   }

  
// }

// export { Token };


import { Config } from 'config.js';
var app = getApp();
class Token {
  constructor() {
    console.log(this)
    // this.verifyUrl = Config.restUrl + '/api/validate/token';
    this.tokenUrl = Config.restUrl + '/api/login/get_openid';
    this.veriUrl = Config.restUrl + '/api/validate/token'; 
  }
  verify() {
    var token = wx.getStorageSync('token');
    console.log(token)
    if (!token) {
      this.getTokenFromServer(token);
    } else {
      this._verifyFromServer(token);
    }
  }
  // 携带令牌去服务器校验令牌
  _verifyFromServer(token) {
    console.log(11212)
    var that = this;
    const account = wx.getStorageSync("account")
    const tokenn = wx.getStorageSync("token")
    wx.request({
      url: that.veriUrl,
      method: 'POST',
      data: {
        token: tokenn,
        account: account
      },
      success: function (res) {
        console.log(res)

        var valid = res.data.data.token;
        console.log(valid)
        console.log(wx.getStorageSync('token'))
        if (wx.getStorageSync('token') !== vertoken ) {
          console.log(111111111111111111)
          // that.getTokenFromServer();
        }
      },
      fail: function(res){
        console.log(res)
      }
    })
  }
  changlink(url) {
    //建立连接
    console.log(url)
    wx.connectSocket({
      url: url,
    })
    //连接成功
    const userid = wx.getStorageSync('userid')
    wx.onSocketOpen(function () {
      const msg = {}
      msg.type = 'login';
      msg.user_id = userid;
      var b = JSON.stringify(msg)
      console.log(b)
      wx.sendSocketMessage({
        data: b,
      })
      console.log('连接成功');
    })
    wx.onSocketMessage(function (res) {
      console.log(res)

    })

  }


  // 从服务器获取token
  getTokenFromServer(callback) {
    var that = this;

    wx.login({
      success: function (res) {
        let code = res.code
        wx.getUserInfo({
          lang: "zh_CN",
          success: res => {
            let userInfo = res.userInfo
            wx.request({
              url: that.tokenUrl,
              method: 'POST',
              data: {
                code: code,
                nickname: userInfo.nickName,
                gender: userInfo.gender,
                avatarUrl: userInfo.avatarUrl,
                city: userInfo.city,
              },
              header: {
                "content-type": "application/x-www-form-urlencoded",
                'content-type': 'application/json'
              },
              success: function (res) {
                console.log(res)
                wx.setStorageSync('token', res.data.data.token);
                wx.setStorageSync('account', res.data.data.account);
                wx.setStorageSync('user_id', res.data.data.user_id);
                wx.setStorageSync('session_key', res.data.data.session_key);
                
              }
            })
          }
        })

      }
    })
    
  }

}

export { Token };