const { request } = require("../../request/request")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const {goods_id} = options;
    this.getGoodsDetail(goods_id);
  },
  //定义获取商品详情数据的方法
  async getGoodsDetail(goods_id) {
    const goodsObj = await request({
      url: "/goods/detail",
      data: {goods_id}
    });
    this.setData({
      goodsObj
    })
  }
})