// pages/cooperate/cooperate.js
var that;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    telephone: '',
    wechat: '',
    qq: '',
    email: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    that.setData({
      telephone: app.globalData.componeyInfo.telephone,
      wechat: app.globalData.componeyInfo.wechat,
      qq: app.globalData.componeyInfo.qq,
      email: app.globalData.componeyInfo.email
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  testSubmit: function(e) {
    var form_id = e.detail.formId
    console.log("formId is "+form_id)
    wx.request({
      url: 'https://www.gxtdlm.cn/test/cacheFormId?formId='+form_id,
      method: 'GET',
      success: function(res) {
        console.log(res.data.data)
      },
      fail: function(err) {
        console.log('request fail ', err);
        //form id is 6e7ce009fe2d44058feb39eb253ffb6f
      },
      complete: function(res) {
        console.log("java后台方法调用formId is "+form_id)
        console.log("request completed!");
      }
    })
  },
  /** 
  testSubmit1: function (e) {
    var self = this;
    console.log("formId is "+e.detail.formId)
    let _access_token = '21_YER1VsuhMEZmxoWEMglllFBGsudZJaw-1fi1-cbUC-0Z1x-sBy_WoOdNRrHZhsIpLyTh1Mi0ncmxNrB5bnnQFbnDDexo41cYCVjPlRyvxZjPeo4mVzaeiVqXm7CfRu9y0VbDrPEBQb5z2h1DZIRhADAJSB';
    let url = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + _access_token; 
    let _jsonData = {
        access_token: _access_token,
        touser: 'oZUM75F1f8nxqdyCxuQYGwZWiffk',
      template_id: 'hvcVosT3Cgp1s9zpW3SALwAAr99BHi9byKy2LnvimIA',
        form_id: e.detail.formId,
        page: "pages/index/index",
        data: {
          "keyword1": { "value": "测试数据一", "color": "#173177" },
          "keyword2": { "value": "测试数据二", "color": "#173177" },
          "keyword3": { "value": "测试数据三", "color": "#173177" },
          "keyword4": { "value": "测试数据四", "color": "#173177" },
        }
      }
    wx.request({
      url: url,
      data: _jsonData,
      method: 'POST',
      success: function (res) {
        console.log("formId is " + e.detail.formId)
      },
      fail: function (err) {
        console.log('request fail ', err);
      },
      complete: function (res) {
        console.log("formId is " + e.detail.formId)
        console.log("request completed!");
      }

    })
  }
  */
})