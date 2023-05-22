
//点击加入购物车
// 绑定点击事件
// 获取购物车缓存数据
// 先判断 当前商品是否存在于购物车
// 已经存在 修改商品数据的数量 把购物车数据 填充回缓存
// 不存在 给购物车添加一个新元素 带上 数量属性 填充回缓存
// 弹出提示

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
  //全局商品对象
  GoodsInfo: [],
  //定义获取商品详情数据的方法
  async getGoodsDetail(goods_id) {
    const res = await request({
      url: "/goods/detail",
      data: {goods_id}
    });
    this.GoodsInfo = res.data.message;
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
  },
  //点击轮播图 放大预览效果
  handlePreviewImage(e) {
    //构造要预览的图片数组
    const pics = this.GoodsInfo.pics.map(v => v.pics_mid);
    //接收传递过来的图片urls
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls: pics,
    });
  },
  //点击加入购物车
  handleCartTap() {
    //获取缓存中购物车的数据
    let cart  = wx.getStorageSync("cart")||[];
    //判断 商品是否存在于购物车数据中
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
    if (index === -1) {
      //不存在 添加商品数据
      this.GoodsInfo.num = 1;
      cart.push(this.GoodsInfo);
    } else {
      //已经存在 执行num++
      cart[index].num++;
    }
    //把购物车数据填充回缓存
    wx.setStorageSync("cart",cart);
    //弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      //防止抖动
      mask: true,
    });
  }
})