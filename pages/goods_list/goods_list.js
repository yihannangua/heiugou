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
    goodsList:[]
  },
  //接口需要的参数
  QueryParams: {
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  //总商品页数
  totalPages:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.QueryParams.cid = options.cid;
    this.getGoodsList();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    //判断是否有下一页数据
    if (this.QueryParams.pagenum >= this.totalPages) {
      wx.showToast({
        title: '数据到底了',
        duration: 1500,
      });
        
    } else {
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },
  /*
  页面下拉刷新时间的处理函数 
  */
  onPullDownRefresh() {
    // 下拉刷新的逻辑
    this.setData({
      goodsList: []
    });
    this.QueryParams.pagenum = 1;
    this.getGoodsList();
    // 可以通过调用接口、重新渲染页面等方式实现数据的动态更新
    wx.showToast({
      title: '数据已更新'
    })
    // 停止下拉刷新动画
    wx.stopPullDownRefresh()
  },
  //定义获取商品列表数据的方法
  async getGoodsList() {
    const res = await request({url:"/goods/search",data:this.QueryParams});
    this.totalPages = Math.ceil(res.data.message.total / this.QueryParams.pagesize)
    // console.log(res.data.message.goods);
    this.setData({
      goodsList: [...this.data.goodsList,...res.data.message.goods]
    });
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