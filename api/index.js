import * as loginApi from './login'
import * as homeApi from './home'
import * as cacher from '../store/cache'
import * as billApi from './bill'
import * as goodApi from './good'
import * as myApi from './myself'
import graceRequest from '../graceUI/jsTools/request.js'


function graceRequestPost(url, data, contentType, headers, callback) {
    console.log('uni post >>', url, data, contentType, headers, )
    switch (contentType) {
        case "form":
            var headerObj = {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            };
            break;
        case "json":
            var headerObj = {
                'content-type': 'application/json'
            };
            break;
        default:
            var headerObj = {
                'content-type': 'application/json'
            };
    }
    for (let k in headers) {
        headerObj[k] = headers[k];
    }
    
    wx.request({
        url: url,
        data: data,
        method: "POST",
        dataType: "json",
        header: headerObj,
        success: (res) => {
            console.log('what happende::', res)
            callback(res.data);
        },
        fail: () => {
            uni.showToast({
                title: "网络请求失败",
                icon: "none"
            });
        }
    });
}




let sessionId = '';
let shopInfo = '';
const global_settings = {
    base_url: "http://user.jiangyk.eldev.cn", //https://user.qd.ailings.cn/  http://user.jiangyk.eldev.cn/#/
    attachment_url: "http://es-static.eldev.cn/" //'https://es-static.ailings.cn/'
};
const indexApi = {
    ...loginApi,
    ...homeApi,
    ...billApi,
    ...goodApi,
    ...myApi
};

console.log('graceRequest>>', graceRequest)

export default async function (name, data) {

    if (!sessionId) { //是否获取了sessionId
        sessionId = cacher.getData('sessionId');
        if (!sessionId) {
            await new Promise((resolve, reject) => {
                graceRequest.get(
                    global_settings.base_url + indexApi.sessionid.url, {}, {
                        'session-id': ''

                    },
                    function (res) {
                        if (res.error == 0) {
                            sessionId = res.session_id;
                            cacher.setData('sessionId', sessionId);
                            resolve(res)
                        }
                    }
                );
            })
        }
    }

    if (!shopInfo) {
        shopInfo = cacher.getData('selectShop');
    }

    if (indexApi[name].type == 'get') {

        return new Promise((resolve, reject) => {

            graceRequest.get(
                global_settings.base_url + indexApi[name].url,
                Object.assign(indexApi[name].data, data),
                Object.assign(indexApi[name].headers || {}, {
                    'session-id': sessionId,

                }),
                function (res) {
                    if (res.error == 0) {

                        resolve(res)
                    } else {
                        console.error('接口出错了>', name, res)
                        reject(res)
                    }

                }
            );
        })
    } else {
        console.log(111111111, graceRequest)
        return new Promise((resolve, reject) => {
            console.log('why1>>>', graceRequest.post);



            graceRequestPost(
                global_settings.base_url + indexApi[name].url, Object.assign(indexApi[name].data, data),
                'form', Object.assign(indexApi[name].headers || {}, {
                    'session-id': sessionId,
                    Cookie: 'shopId=' + shopInfo.shopInfo.id + ';is_expired=0;'
                }),
                function (res) {
                    console.log(indexApi[name], '***********************************', res)
                    if (res.error == 0) {
                        resolve(res)
                    } else {
                        console.error('接口出错了>', name, res)
                        reject(res)
                    }
                }
            );
        })
    }


}