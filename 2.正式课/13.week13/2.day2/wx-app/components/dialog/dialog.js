// components/dialog/dialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  // options: {
  //   styleIsolation: 'apply-shared'
  // },
  options: {
    // multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的方法列表
   */
  methods: {
    fn(){
      console.log(2);
      // this.$emit('myEvent')
      this.triggerEvent('myEvent')
    },
    fn2(){}
  }
})
