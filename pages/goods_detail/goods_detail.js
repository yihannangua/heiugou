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
    const res = await request({
      url: "/goods/detail",
      data: {goods_id}
    });
    console.log(res.data.message.goods_price);
    this.setData({
      goodsObj:{
        //只回传用到的数据
        goods_name: res.data.message.goods_name,
        pics: res.data.message.pics,
        goods_price: res.data.message.goods_price,
        //将 webp 改成 jpg
        goods_introduce: res.data.message.goods_introduce.replace(/\.webp/g,'.jpg')
      }
    })

  }
})