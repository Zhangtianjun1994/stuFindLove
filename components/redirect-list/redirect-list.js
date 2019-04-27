// components/reirect-list/redirect-list.js
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
    list: {
      type: Array,
      value: [
        /**
         * { label: '', to: '', iconImageUrl: '' }
         */
      ]
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

  }
})
