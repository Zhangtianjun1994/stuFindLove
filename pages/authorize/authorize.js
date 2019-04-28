var app = getApp();
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      app.globalData.userInfo = e.detail.userInfo;
      //插入登录的用户的相关信息到数据库
      wx.request({
        url: app.globalData.baseUrl + '/wechat/wechatUser/insert',
        method:'POST',
        data: {
          openId: app.globalData.openId,
          wechatName: e.detail.userInfo.nickName,
          avatarurl: e.detail.userInfo.avatarUrl,
          country:e.detail.userInfo.country,
          province: e.detail.userInfo.province,
          city: e.detail.userInfo.city,
          gender:e.detail.userInfo.gender
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          //返回的是插入的微信用户信息
          var res = res.data
          app.globalData.selfUserId = res.data.userId
        }
      });
      //授权成功后，跳转进入小程序首页
      wx.switchTab({
        url: '/pages/updates/updates'
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  }
})