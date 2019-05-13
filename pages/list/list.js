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
    all_user_list: [],
    loadingTip: '没有更多信息了',
    pageIndex:0,
    pageSize:4,
    has_more:true
  },
  onLoad: function () {
    that = this;
    that.setData({
      url: app.globalData.baseUrl,
      selfUserId: app.globalData.selfUserId
      //selfUserId: app.globalData.selfUserId
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    that = this;
    that.setData({
      all_user_list:[]
    })
    that.getUserList();
  },
  getUserList: function () {
    wx.showLoading({
      title: '加载中...',
      duration: 2000
    })
    var pageIndex = that.data.pageIndex
    var pageSize = that.data.pageSize
    return util.request({
      url: '/publishUser/queryAll?pageIndex=' + pageIndex * pageSize + '&pageSize=' + pageSize,
      method: 'get'
    })
    .then(
      data => {
        that.setData({
          all_user_list: this.data.all_user_list.concat(data),
        });
        if (data.length < pageSize) {
          that.setData({
            loadingTip: '明天再刷刷，会有更多发布信息哦',
            has_more:false
          });
        }
      },
      (err) => err
    )
    .then(() => {
      wx.hideLoading()
    })
  },
  onPullDownRefresh: function () {
    console.log("实现下拉刷新-------")
    that.setData({
      pageIndex: 0,
      has_more: true
    });
    that.getUserList();
  },
  onReachBottom: function () {
    if (!that.data.has_more) {
      return;
    }
    var pageIndex = that.data.pageIndex;
    that.setData({
      pageIndex: ++pageIndex
    });
    that.getUserList();
  },
  clickCardItem (event) {
    let userId = event.detail.userId
    let id = event.detail.id
    console.log(userId, id)
    wx.navigateTo({
      url: `../user-info/user-info?userId=${userId}&id=${id}`
    })
  }
})