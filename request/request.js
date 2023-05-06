// 封装网络请求函数并导出
export const request = (params) => {
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
            }
        });
    })
}