// components/focus-item/focus-item.js
const util = require('../../utils/util.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userId: {
      type: Number || String
    },
    uid: {
      type: Number || String
    },
    imageSrc: {
      type: String,
      value: "https://gxtdlm-1258532084.cos.ap-beijing.myqcloud.com/image/9a6eab5e22f742d128aa65c377a8e849be31e53d5cee2-W8V9c5_fw658.jpeg"
    },
    nickname: {
      type: String,
      value: '---'
    },
    education: {
      type: String,
      value: ''
    },
    selfDisplay:{
      type: Boolean,
      value: false
    },
    school: {
      type: String,
      value: '--大学'
    },
    liveCity: {
      type: String,
      value: ''
    },
    liveProvince: {
      type: String,
      value: ''
    },
    height: {
      type: Number || String,
      value: '--'
    },
    gender: {
      type: String,
      value: '--'
    },
    age: {
      type: String || Number,
      value: '--'
    },
    constellation: {
      type: String,
      value: '--'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    actionSheetHidden: true,
    actionSheetItems1: [{
      bindtap: 'Undisplay',
      txt: '设置仅自己可见',
      flag:1
    }],
    actionSheetItems2: [{
      bindtap: 'Display',
      txt: '设置所有人可见',
      flag:2
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTapOutside(e) {
      this.triggerEvent('click', {
        userId: this.data.userId,
        id: this.data.uid
      })
    },
    handleTapFocus(e) {

    },
    actionSheetTap: function() {
      this.setData({
        actionSheetHidden: !this.data.actionSheetHidden
      })
    },
    actionSheetbindchange: function() {
      this.setData({
        actionSheetHidden: !this.data.actionSheetHidden
      })
    },
    //
    bindUndisplay: function() {
      this.setData({
        actionSheetHidden: !this.data.actionSheetHidden
      })
      //调用url方法，使信息不显示
      console.log("设置仅自己可见的信息id is " + this.data.uid)
      util.request({
        url: '/publishUser/updateSelfDisplay?userId=' + this.data.userId + "&id=" + this.data.uid + "&display=" + false,
          method: 'get'
        })
        .then(
          data => {
            if(data === true){
              this.setData({
                selfDisplay: false
              })
              console.log("设置此用户信息不可见success")
            }else{
              console.log("设置此用户信息不可见失败")
            }
          },
          err => err
        )
    },
    bindDisplay: function () {
      this.setData({
        actionSheetHidden: !this.data.actionSheetHidden
      })
      //调用url方法，使信息不显示
      console.log("设置仅自己可见的信息id is " + this.data.uid)
      util.request({
        url: '/publishUser/updateSelfDisplay?userId=' + this.data.userId + "&id=" + this.data.uid+"&display="+true,
        method: 'get'
      })
        .then(
          data => {
            if (data === true) {
              this.setData({
                selfDisplay:true
              })
              console.log("设置此用户信息可见success")
            } else {
              console.log("设置此用户信息可见失败")
            }
          },
          err => err
        )
    }
  }
})