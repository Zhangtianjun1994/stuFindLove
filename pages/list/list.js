// pages/updates/updates.js
var that
var app = getApp()
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
  //显示信息详情
  showDetail: function (e) {
    console.log("点击进入详情")
    var userId = that.data.all_user_list[index].userId;
    var id = that.data.all_user_list[index].id;
    var selfUserId = that.data.selfUserId
    wx.navigateTo({
      url: '',
    });
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
})