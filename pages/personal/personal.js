// pages/personal/personal.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl:'',
    cardList: [{
      label: '朋友的桃花牌',
      iconImageUrl: '../../images/icon/icon-friend-infos.png',
      to:'../friends-list/friends-list'
    }, {
      label: '为好友发布桃花牌',
      iconImageUrl: '../../images/icon/icon-friend-publish.png'
    }],
    othList: [{
      label: '设置',
      iconImageUrl: '../../images/icon/icon-setup.png',
      to:'../setup/setup'
    }, {
      label: '合作推广',
      iconImageUrl: '../../images/icon/icon-cooperate.png',
      to:'../cooperate/cooperate'
      }, {
        label: '上传到COS实例',
        iconImageUrl: '../../images/icon/icon-cooperate.png',
        to: '../uploadToCOS/uploadToCOS'
      },
    ]
  },

  handleTap () {
    let userId = getApp().globalData.selfUserId
    wx.navigateTo({
      url: `../user-info/user-info?userId=${userId}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imageUrl: app.globalData.userInfo.avatarUrl
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