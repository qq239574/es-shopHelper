export default function () {
    return new Promise((resolve, reject) => {
        uni.request({
            url: 'https://www.example.com/request', //仅为示例，并非真实接口地址。
            data: {
                text: 'uni.request'
            },
            header: {
                'custom-header': 'hello' //自定义请求头信息
            },
            success: (res) => {
                resolve(res)
            },
            fail(){
                reject(res)
            }
        });
    })

}