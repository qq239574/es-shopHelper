import * as loginApi from './login'
import * as homeApi from './home'
import * as cacher from '../store/cache'
import * as billApi from './bill'
import * as goodApi from './good'
import * as myApi from './myself'
import graceRequest from '../graceUI/jsTools/request.js'


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


    let header = {};
    if (shopInfo && shopInfo.shopInfo) {
        header = {
            'session-id': sessionId,
            Cookie: 'shopId=' + shopInfo.shopInfo.id + ';'
        }
    } else {
        header = {
            'session-id': sessionId,
        }
    }
    if (indexApi[name].type == 'get') {

        return new Promise((resolve, reject) => {

            graceRequest.get(
                global_settings.base_url + indexApi[name].url,
                Object.assign(indexApi[name].data, data),
                Object.assign(indexApi[name].headers || {}, header),
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

        return new Promise((resolve, reject) => {

            graceRequest.post(
                global_settings.base_url + indexApi[name].url,
                Object.assign(indexApi[name].data, data),
                'form',
                Object.assign(indexApi[name].headers || {}, header),
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
    }


}