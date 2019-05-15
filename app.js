//app.js
var that
const utils = require('./utils/util')

App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    that = this;
    that.globalData.loginPending = true;
    utils.request({
      url:'/componey/getComponeyInfo',
      method: 'GET'
    })
      .then(
        data => {
          that.globalData.componeyInfo = data
        },
        err => {
          wx.showToast({
            title: `请求失败: ${url},${err}`,
            duration: '100000'
          })
        }
      ),
    // 登录
    wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          var code = res.code; //登录凭证
          console.log("每次进入都会调用登陆，结果登陆成功，code：" + code)
          if (code) {
            //2、调用获取用户信息接口，得到openId
            utils.request({
              url: '/wechat/login',
              method: 'get',
              data: {
                code
              }
            })
            .then(
              data => {
                that.globalData.openId = data.openId;
                console.log("调用后台的login接口，返回数据openId：" + that.globalData.openId)
                // 根据openId获取userId
                return utils.request({
                  url: '/wechat/wechatUser/queryByOpenId',
                  data: {
                    openId: that.globalData.openId
                  },
                  method: 'get'
                })
              },
              (err) => {
                console.error('wechat/login失败', err)
                return Promise.reject(err)
              }
            )
            .then(
              data => {
                console.log("通过openId获取到userId信息" + data.userId)
                that.globalData.selfUserId = data.userId
              },
              err => {
                that.globalData.selfUserId = 2213470209
                console.log('/wechat/wechatUser/queryByOpenId失败', err)
              }
            )
            .then(() => {
              // userId获得完成，执行回调
              that.globalData.loginPending = false
              that.loginResolve()
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
    loginPending: true,
    loginCallbacks: [],
    openId:'',
    selfUserId:'',
    userInfo: null,
    hasUserInfo: false,
    componeyInfo:{
      componeyName:'',
      corporationName:'',
      email:'',
      telephone:'',
      wechat:'',
      qq:'',
      userCount:''
    }
  },
  loginResolve (fn) {
    if (this.globalData.loginPending) {
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