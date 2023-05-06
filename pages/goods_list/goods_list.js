const { request } = require("../../request/request");

// pages/goods_list/goods_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id:0,
        name:"综合",
        isActive: true
      },
      {
        id:1,
        name:"销量",
        isActive: false
      },
      {
        id:2,
        name:"价格",
        isActive: false
      }
    ],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    this.getGoodsList();
  },
  //定义获取商品列表数据的方法
  async getGoodsList() {
    const res = await request({url:"/goods/search"});
    console.log(res);
  },
  //定义标题点击事件 从子组件传递过来
  handleTabsItemChange(e) {
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i) => i===index ? v.isActive=true : v.isActive=false);
    this.setData({
      tabs
    })
  }
})