// pages/updates/updates.js
const utils = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      imageUrl: '../../images/updates/1500_900.jpg',
      name: '李狠建',
      city: '北京',
      birth: '95年双子座',
      university: '北京师范大学',
      gender: 1,
      id: 1
    }, {
      imageUrl: '../../images/updates/800_480.jpg',
      name: '张和平',
      city: '北京',
      birth: '94年狮子座',
      university: '北京大学',
      gender: 1,
      id: 2
    }, {
      imageUrl: '../../images/updates/500_300.jpg',
      name: '刘建国',
      city: '北京',
      birth: '93年摩羯座',
      university: '清华大学',
      gender: 1,
      id: 3
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    console.log(123)
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

  },
  userInfoReadyCallback: function () {
    console.log(12)
  }
})