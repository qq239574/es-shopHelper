import * as loginApi from './login'
import * as homeApi from './home'
import * as cacher from '../store/cache'
var graceRequest = require("../graceUI/jsTools/request.js");
let sessionId = '';
let shopInfo = '';
const global_settings = {
    base_url: "http://user.jiangyk.eldev.cn", //https://user.qd.ailings.cn/  http://user.jiangyk.eldev.cn/#/
    attachment_url: "http://es-static.eldev.cn/" //'https://es-static.ailings.cn/'
};
const indexApi = {
    ...loginApi,
    ...homeApi
};



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
        shopInfo=cacher.getData('selectShop');
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
                        console.error('接口出错了>', name)
                        reject(res)
                    }

                }
            );
        })
    } else {
        return new Promise((resolve, reject) => {
            graceRequest.post(
                global_settings.base_url + indexApi[name].url, Object.assign(indexApi[name].data, data),
                'form', Object.assign(indexApi[name].headers || {}, {
                    'session-id': sessionId,
                    Cookie: 'shopId='+shopInfo.shopInfo.id+';is_expired=0;'
                }),
                function (res) {
                    if (res.error == 0) {
                        resolve(res)
                    } else {
                        console.error('接口出错了>', name)
                        reject(res)
                    }
                }
            );
        })
    }


}