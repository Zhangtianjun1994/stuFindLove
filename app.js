//app.js
var that
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    that = this;
    that.globalData.loginPending = true;
    // 登录
    wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          var code = res.code; //登录凭证
          console.log("每次进入都会调用登陆，结果登陆成功，code：" + code)
          if (code) {
            //2、调用获取用户信息接口
            wx.request({
              url: that.globalData.baseUrl + '/wechat/login', //服务接口地址 
              method: 'get',
              header: {
                "Content-Type": "applciation/json"
              },
              data: {
                code: code
              },
              success: function(result) {
                //4.解密成功后 获取自己服务器返回的结果
                if (result.data.code == 0) {
                  that.globalData.openId = result.data.openId;
                  console.log("调用后台的login接口，返回数据openId：" + that.globalData.openId)
                  //得到openId对应的userId信息
                  wx.request({
                    url: that.globalData.baseUrl + '/wechat/wechatUser/queryByOpenId?openId=' + that.globalData.openId,
                    method: 'get',
                    header: {
                      'content-type': 'application/json'
                    },
                    success: res => {
                      var res = res.data
                      if (res.code == 0) {
                        console.log("通过openId获取到userId信息"+res.data.userId)
                        that.globalData.selfUserId = res.data.userId
                        console.log("selfUserId信息："+that.globalData.selfUserId)
                      }else{
                        //此时数据库没有userid和openId对应关系，调用插入数据方法
                      }
                      that.globalData.loginPending = false
                      that.loginResolve()
                    },
                    fail: err => {
                      that.globalData.loginPending = false
                      that.loginResolve()
                    }
                  })
                } else {
                  console.log('登陆/wechat/login地址失败')
                  that.globalData.loginPending = false
                  that.loginResolve()
                }
              },
              fail: function() {
                console.log('系统错误')
              }
            })
          } else {
            console.log('获取用户登录态失败！' + r.errMsg)
          }
        },
        fail: function() {
          console.log('登陆失败')
        }
      })

      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                console.log("获取用户信息成功，"+JSON.stringify(res.userInfo))
                // 可以将 res 发送给后台解码出 unionId
                that.globalData.userInfo = res.userInfo
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          } else {
            wx.reLaunch({
              url: '/pages/authorize/authorize',
            })
          }
        }
      })

  },
  globalData: {
    baseUrl: 'https://www.gxtdlm.cn',
    loginPending: true,
    loginCallbacks: [],
    openId:'',
    selfUserId:'',
    userInfo:null,
    //baseUrl:'https://localhost',
    userInfo: {
      avatarUrl: '',
      city: '',
      country: '',
      gender: 1,
      language: '',
      nickName: '',
      province: ''
    },
    hasUserInfo: false
  },
  loginResolve (fn) {
    if (this.globalData.pending) {
      this.globalData.loginCallbacks.push(fn)
    } else {
      this.globalData.loginCallbacks.push(fn)
      while (this.globalData.loginCallbacks.length > 0) {
        let fn = this.globalData.loginCallbacks.pop()
        typeof fn === 'function' && fn()
      }
    }
  }
})