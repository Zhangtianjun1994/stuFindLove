//// pages/updates/updates.js
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
    isHiddenImageEditor: true,
    firstOpen:null,
    userCount:''
  },
  onLoad: function() {
    that = this;
    that.setData({
      userCount: app.globalData.componeyInfo.userCount,
      url: app.globalData.baseUrl,
      selfUserId:app.globalData.selfUserId
      //selfUserId: app.globalData.selfUserId
    })
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
  },
  //显示信息详情
  clickCardItem (event) {
    let userId = event.detail.userId
    let id = event.detail.id
    wx.navigateTo({
      url: `../user-info/user-info?userId=${userId}&id=${id}`
    })
  },
  //用于第一次进入信息展示
  findLoveNow: function () {
    wx.navigateTo({
      url: `../search/search`
    })
  },
})