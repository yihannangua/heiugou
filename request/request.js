
//同时发送异步请求的次数
let ajaxTimes = 0;

// 封装网络请求函数并导出
export const request = (params) => {
    ajaxTimes++;
    //显示加载图标
    wx.showLoading({
        title: "加载中",
        mask: true
    });


    //定义公共的url
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
    return new Promise((resolve,reject) => {
        wx.request({
            // ...params,通过下方拼接方法，则不再需要展开
            url:baseUrl+params.url,
            data:params.data,
            success:(res) => {
                resolve(res);
            },
            fail:(err) => {
                reject(err);
            },
            complete:() => {
                ajaxTimes--;
                //所有异步请求都执行完毕，关闭加载中图标
                if (ajaxTimes===0) {
                    wx.hideLoading();
                }
            }
        });
    })
}