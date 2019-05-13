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
    wx.showToast({
      title: '加载中...',
      duration: 2000
    })
    var url = that.data.url
    var pageIndex = that.data.pageIndex
    var pageSize = that.data.pageSize
    wx.request({
      url: url + '/publishUser/queryAll?pageIndex='+pageIndex*pageSize + '&pageSize='+pageSize,
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        var res = res.data
        var current_user_list = that.data.all_user_list
        wx.hideToast();
        if (res.code == 0) {
          var new_user_list = res.data;
          //js中将图片地址循环赋值
          for(var userIndex in new_user_list){
            var iamgeUrls = new_user_list[userIndex].imageUrl;
            new_user_list[userIndex].imageUrl = iamgeUrls[0];
          }
          that.setData({
            all_user_list: current_user_list.concat(res.data),
          });
        }
        //console.log("数据列表的长度："+that.data.publish_user_list.length)
        if (res.data.length < pageSize) {
          that.setData({
            loadingTip: '明天再刷刷，会有更多发布信息哦',
            has_more:false
          });
        }
      },
      error: function (error) {

      }
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