// pages/category/category.js
//引入request
import { request } from "../../request/request";


Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧菜单数据
    leftMenuList: [],
    //右侧商品数据
    rightContent: [],
    //被点击的左侧的菜单
    currentIndex: 0,
    //右侧内容滚动条距离顶部的距离
    scrollTop: 0
  },
  //接口返回数据
  catesList: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    /* 
    1 先判断一下本地存储中有没有旧数据
      {time:Date.now(),data:[...]}
    2 没有旧数据 直接发送新请求
    3 有旧数据同事旧数据未过期，直接使用本地存储的数据
    */
    
    //获取本地存储中的数据（小程序中也存在本地存储技术）
    const Cates = wx.getStorageSync("cates");
    //判断
    if (!Cates) {
      //不存在 重新发请求
      this.getCatesList();
      console.log('不存在旧数据');
    } else {
      //有旧数据
      //过期时间 暂时定义为10s 验证后改成5分钟
      if (Date.now() - Cates.time > 1000*300) {
        //过期 重新发请求
        console.log('旧数据过期');
        this.getCatesList();
      } else {
        //可以使用旧数据
        console.log("可以使用旧数据");
        this.catesList = Cates.data;
        let leftMenuList = this.catesList.map(v => v.cat_name);
        let rightContent = this.catesList[0].children;

        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
    //调用方法获取分类数据
    this.getCatesList()
  },
  //定义获取分类数据的方法 
  //使用es7的async await 方法请求数据
  async getCatesList() {
    try {
      const res = await request({url:"/categories"});
      console.log(res);
      this.catesList = res.data.message;

      //把接口数据存入本地存储中
      wx.setStorageSync("cates",{time:Date.now(),data:this.catesList});

      //构造左侧菜单数据
      //map() 方法会遍历数组的每个元素，执行指定的函数，并将执行结果组成一个新的数组返回。该方法不会改变原数组，而是返回一个新数组。
      //下面语句，遍历数组并返回每项的 .cat_name 的值
      let leftMenuList = this.catesList.map(v => v.cat_name)
      //构造右侧商品数据
      let rightContent = this.catesList[0].children;

      this.setData({
        leftMenuList,
        rightContent
      })
    } catch (err) {
      console.error('请求分类数据失败',err);
      wx.showToast({
        title: '请求分类数据失败，请检查网络后重试',
        icon: 'none',
        image: '',
        duration: 1500
      });
    }
  },
  //定义左侧菜单点击事件
  handleItemTap(e) {
    const index = e.currentTarget.dataset.index;
    //构造右侧商品数据
      let rightContent = this.catesList[index].children;

      this.setData({
        currentIndex: index,   
        rightContent,
        //重新设置 右侧内容标签距离顶部的距离
        scrollTop: 0
      })
  }
})