// pages/my-focus/my-focus.js
const utils = require('../../utils/util')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.loginResolve(() => {
      let userId = app.globalData.selfUserId
      console.log(userId, "?")

      this.setData({
        userId
      })
      this.getData()
    })
  },

  getData: function () {
    return utils.request({
      url: `/publishUser/queryFriendByUserId?userId=${this.data.userId}`
    }).then((data) => {
      let list = []
      list = data.map((item) => {
        let newItem = Object.assign({}, item)
        newItem.imageUrl = newItem.imageUrl[0]
        return newItem
      })
      this.setData({
        list
      })
    })
  },

  clickFocusItem(event) {
    let userId = event.detail.userId
    let id = event.detail.id
    wx.navigateTo({
      url: `../user-info/user-info?userId=${userId}&id=${id}`
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