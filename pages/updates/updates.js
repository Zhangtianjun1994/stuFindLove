// pages/updates/updates.js
var that
var app = getApp()
const util = require('../../utils/util')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    //本用户的userId
    selfUserId: '',
    url: '',
    update_user_list: [],
    loadingTip: '没有更多信息了',
    isHiddenImageEditor: true
  },
  onLoad: function() {
    that = this;
    that.setData({
      url: app.globalData.baseUrl,
      selfUserId:app.globalData.selfUserId
      //selfUserId: app.globalData.selfUserId
    })
    //console.log("update中selfUserId是什么："+app.globalData.selfUserId)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    that = this;
    update_user_list:[];
    that.getUpdateList();
  },
  getUpdateList: function() {
    wx.showLoading({
      title: '加载中...',
      duration: 2000
    })
    util.request({
      url: '/publishUser/queryYestoday',
      method: 'get'
    })
    .then(
      data => {
        that.setData({
          update_user_list: data,
        });
        //console.log("数据列表的长度："+that.data.publish_user_list.length)
        if (data.length <= 0) {
          that.setData({
            loadingTip: '经过审核后会有更多信息偶',
          });
        }
      },
      err => err
    )
    .then(() => {
      wx.hideLoading()
    })
  },
  //显示信息详情
  clickCardItem (event) {
    let userId = event.detail.userId
    let id = event.detail.id
<<<<<<< HEAD
=======
    console.log(userId+"  id is "+id)
>>>>>>> d7182d1173c376c9aac864a42f0d9d4891022bed
    wx.navigateTo({
      url: `../user-info/user-info?userId=${userId}&id=${id}`
    })
  }
})