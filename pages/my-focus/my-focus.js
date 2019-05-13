// pages/my-focus/my-focus.js
const utils = require('../../utils/util')
const focusStateEnum = require('../../components/focus-item/focus-state-enum')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  getData: function () {
    return utils.request({
      url: '/friends/myFocus?userId=2213470209'
    }).then((data) => {
      // data = [{"id":4,"userId":2213470209,"nickName":"丫丫","age":25,"aries":"摩羯座","sex":"女","height":165,"school":"大连理工大学","education":"硕士","liveProvince":"辽宁","liveCity":"大连市","heat":18,"imageUrl":["https://gxtdlm-1258532084.cos.ap-beijing.myqcloud.com/image/9a6eab5e22f742d128aa65c377a8e849be31e53d5cee2-W8V9c5_fw658.jpeg","https://gxtdlm-1258532084.cos.ap-beijing.myqcloud.com/image/106-161205161K5161.jpg"],"bothFocus":true},{"id":3,"userId":2213470209,"nickName":"丫丫","age":25,"aries":"摩羯座","sex":"女","height":165,"school":"大连理工大学","education":"硕士","liveProvince":"辽宁","liveCity":"大连市","heat":2,"imageUrl":["https://gxtdlm-1258532084.cos.ap-beijing.myqcloud.com/image/9a6eab5e22f742d128aa65c377a8e849be31e53d5cee2-W8V9c5_fw658.jpeg","https://gxtdlm-1258532084.cos.ap-beijing.myqcloud.com/image/106-161205161K5161.jpg"],"bothFocus":true}]
      let list = []
      list = data.map((item) => {
        let newItem = Object.assign({}, item)
        newItem.focusStatus = newItem.bothFocus ? focusStateEnum.BOTH_FOCUS : focusStateEnum.IS_FOCUS
        newItem.imageUrl = newItem.imageUrl[0]
        return newItem
      })
      this.setData({
        list
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getData()
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