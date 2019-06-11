// pages/my-focus/my-focus.js
const utils = require('../../utils/util')
const app = getApp()
const focusStateEnum = require('../../components/focus-item/focus-state-enum')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    "imageSrc":'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJZafUWOia7GXXs8RROVkBDelVL4XotUvMK1xIoZmyg66K8mVDia1zvVV502tUKib6bbd5uibUJhDhYJg/132',
    "nickName":'天俊',
    "school":'大连理工大学',
    "gender":'男',
    "question1":'软件学院考研需要准备的材料?',
    "question2":'推荐辽宁师范附近好吃的美食?'
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
      url: `/friends/myFocus?userId=${this.data.userId}`
    }).then((data) => {
      let list = []
      list = data.map((item) => {
        let newItem = Object.assign({}, item)
        newItem.focusStatus = newItem.bothFocus ? focusStateEnum.BOTH_FOCUS : focusStateEnum.IS_FOCUS
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