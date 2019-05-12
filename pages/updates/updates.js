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
    update_user_list: [],
    loadingTip: '没有更多信息了',
  },
  onLoad: function() {
    that = this;
    that.setData({
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
    that.getUpdateList();
  },
  getUpdateList: function() {
    wx.showToast({
      title: '加载中...',
      duration: 2000
    })
    var url = that.data.url
    wx.request({
      url: url + '/publishUser/queryYestoday',
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        var res = res.data
        wx.hideToast();
        if (res.code == 0) {
          that.setData({
            update_user_list: res.data,
          });
        }
        //console.log("数据列表的长度："+that.data.publish_user_list.length)
        if (res.data.length <= 0) {
          that.setData({
            loadingTip: '经过审核后会有更多信息偶',
          });
        }
      },
      error: function(error) {

      }
    })
  },
  //显示信息详情
  showDetail: function(e) {
    console.log("点击进入详情")
    var userId = that.data.publish_user_list[index].userId;
    var id = that.data.publish_user_list[index].id;
    var selfUserId = that.data.selfUserId
    wx.navigateTo({
      url:'',
    });
  }
})