// components/focus-item/focus-item.js
const focusStateEnum = require('./focus-state-enum')

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
    school: {
      type: String,
      value: '--大学'
    },
    hometownCity: {
      type: String,
      value: ''
    },
    hometownProvince: {
      type: String,
      value: ''
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
    },
    focusStatus: {
      type: Number,
      value: focusStateEnum.IS_FOCUS
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    focusStateEnum
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTapOutside (e) {
      this.triggerEvent('click', {userId: this.data.userId, id: this.data.uid})
    },
    handleTapFocus (e) {
      
    }
  }
})
