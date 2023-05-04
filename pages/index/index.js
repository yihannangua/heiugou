// 引入用来发送请求的方法
import { request } from "../../request/request";


//Page Object
Page({
  data: {
    //轮播图数组
    swiperList: [],
    //导航数组
    catesList: [],
    //楼层数组
    floorList: []
  },
  //options(Object)
  onLoad(options){
    //调用方法更新轮播图数据
    this.getSwiperList();
    //调用方法更新分类导航数据
    this.getCatesList();
    //调用方法更新楼层数据
    this.getFloorList();
  },
  //获取轮播图数据
  async getSwiperList() {
    try {
      const res = await request({url:"/home/swiperdata"});
      this.setData({
        swiperList: res.data.message
      });
    } catch (err) {
      console.error('请求轮播图数据失败',err);
      wx.showToast({
        title: '请求轮播图失败，请检查网络后重试',
        icon: 'none',
        image: '',
        duration: 1500
      });
    }
  },
  //获取分类导航数据
  async getCatesList() {
    const res = await request({url:"/home/catitems"});
    this.setData({
      catesList: res.data.message
    });
  },
  //获取楼层数据
  async getFloorList() {
    const res = await request({url:"/home/floordata"});
    this.setData({
      floorList: res.data.message
    });
  }
})