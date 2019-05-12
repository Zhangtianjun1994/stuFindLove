// components/card-item/card-item.js
import util from '../../utils/util';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imageUrl: {
      type: String,
      value: ''
    },
    name: {
      type: String,
      value: ''
    },
    gender: { // 1 男性， 2 女性， 0 未知
      type: String,
      value: ''
    },
    province: {
      type: String,
      value: ''
    },
    city: {
      type: String,
      value: ''
    },
    age: {
      type: Number,
      value: 1
    },
    university: {
      type: String,
      value: ''
    },
    userId: {
      type: String || Number,
      value: ''
    },
    uid: {
      type: String || Number,
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
      this.triggerEvent('click', {userId: this.data.userId, id: this.data.uid})
    }
  }
})
