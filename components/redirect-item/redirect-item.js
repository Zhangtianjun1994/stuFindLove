// components/redirect-item/redirect-item.js
const util = require('../../utils/util')
Component({
  relations: {
    "../redirect-item/redirect-item": {
      type: 'child',
      linked (target) {},
      linkChanged(target) {},
      unlinked(target) {}
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    to: {
      type: String,
      value: ''
    },
    label: {
      type: String,
      value: ''
    },
    iconImageUrl: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTap () {
      util.log('redirect-item tap!', this.data)
      if (!this.data.to) {
        util.warn('redirect-item url为空!')
        return
      }
      wx.navigateTo({
        url: this.data.to
      })
    }
  }
})
