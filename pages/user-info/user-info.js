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
    constellation: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.loginResolve(() => {
      let id = options.id
      let userId = app.globalData.selfUserId
      this.setData({
        userId: userId
      })
      util.request({
        url: `/friends/myFocus?userId=${userId}`
      })
      if (id !== undefined) {
        this.setData({
          id: id
        })
      }
      this.getDetail(userId, id)
    })
  },

  getDetail (userId, id) {
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
        isSelf: data.self
      })
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