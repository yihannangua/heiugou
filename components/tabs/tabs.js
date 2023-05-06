// components/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type:Array,
      value:{}
    },
    currentIndex:0
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
    //定义点击tabs事件
    handleItemTap(e) {
      const {index} = e.currentTarget.dataset;
      console.log(index);

      this.triggerEvent("tabsItemChange",{index});
    }
  }
})
