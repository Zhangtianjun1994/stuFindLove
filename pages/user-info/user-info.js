// pages/user-info/user-info.js
const app = getApp();

const util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '',
    id: '',
    isSelf: false,
    userId: '',
    birthday: '--',
    gender: '--',
    height: '--',
    school: '--',
    education: '--',
    liveProvince: '--',
    liveCity: '--',
    hometownProvince: '--',
    hometownCity: '--',
    hobby: '--',
    selfIntroduction: '--',
    idealTa: '--',
    imageUrl: [],
    constellation: '',
    wechat:''//个人联系方式微信
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.loginResolve(() => {
      let id = options.id
      let userId = app.globalData.selfUserId
      this.setData({
        userId: userId
      })
      if (id !== undefined) {
        this.setData({
          id: id
        })
      }
      this.getDetail(userId, id)
    }),
      wx.showShareMenu({
        withShareTicket: true //分享之后在其他用户点击后，要求小程序返回分享目标信息
      })
  },
  /**分享信息逻辑 */
  onShareAppMessage: function (res) {
    var that = this;
    var userId = that.data.userId;
    var id = that.data.id;
    if (res.from === 'button') {
      console.log("分享的来源是页面内转发")
    }
    return {
      title: '大学生恋爱菌嘉宾信息分享',
      path: '/pages/user-info/user-info?id=' + id + '&userId=' + userId,
      success: function (res) {
        wx.showToast({
          title: '转发成功',
          //icon: 'success',
          duration: 1000
        })
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '转发失败',
        })
      }
    }
  },

  /**复制微信逻辑 ，点击复制微信button获取*/
  copyWechat: function(e) {
    var that = this;
    var wechat = that.data.wechat
    wx.setClipboardData({
      data: wechat,
      success: function(res) {
        wx.getClipboardData({
          success: function(res) {
            wx.showToast({
              title: '复制成功'
            })
          },
          fail: function(res) {
            wx.showToast({
              title: '复制失败',
            })
          }
        })
      }
    })
  },
  getDetail(userId, id) {
    let url = ''
    url = id !== undefined ? `/publishUser/queryById?userId=${userId}&id=${id}` : `/publishUser/querySelfByUserId?userId=${userId}`
    util.request({
        url,
        method: 'GET'
      })
      .then(data => {
        this.setData({
          imageUrl: Array.isArray(data.imageUrl) ? data.imageUrl : [data.imageUrl],
          id: data.id,
          education: data.education,
          hobby: data.hobby,
          hometownCity: data.hometownCity,
          hometownProvince: data.hometownProvince,
          liveCity: data.liveCity,
          liveProvince: data.liveProvince,
          nickName: data.nickName,
          selfIntroduction: data.selfIntroduction,
          idealTa: data.idealTa,
          gender: data.sex,
          school: data.school,
          birthday: data.birthday,
          constellation: data.aries,
          height: data.height,
          isSelf: data.self,
          wechat:data.wechat
        })
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})