import * as loginApi from './login'
import * as homeApi from './home'
import * as cacher from '../store/cache'
import * as billApi from './bill'
import * as goodApi from './good'
import * as myApi from './myself'
import graceRequest from '../graceUI/jsTools/request.js'
import global_settings from './domain.js'
let sessionId = '';
let shopInfo = '';
const indexApi = {
    ...loginApi,
    ...homeApi,
    ...billApi,
    ...goodApi,
    ...myApi
};

export default async function (name, data) {

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


    if (!shopInfo) {
        shopInfo = cacher.getData('selectShop');
    }


    let header = {};
    if (shopInfo && shopInfo.shopInfo) {
        header = {
            'session-id': sessionId,
            'shop-id': shopInfo.shopInfo.id,
            Cookie: 'shopId=' + shopInfo.shopInfo.id + ';',
            'client-type': 'assistant'
        }
    } else {
        header = {
            'session-id': sessionId,
            'client-type': 'assistant'
        }
    }
    if (indexApi[name].type == 'download') { //主要用于下载图片
        return new Promise((resolve, reject) => {

            let param = [];
            for (let k in data) {
                param.push(k + '=' + data[k])
            }
            uni.downloadFile({
                url: global_settings.base_url + indexApi[name].url + '?' + param.join('&'), //仅为示例，非真实的接口地址
                header: Object.assign({},indexApi[name].headers || {}, header),
                success: (uploadFileRes) => {
                    resolve(uploadFileRes)
                },
                fail(res) {
                    resolve(res)
                }
            });
        })

    } else if (indexApi[name].type == 'image') { //主要用于上传图片 
        return new Promise((resolve, reject) => {
            uni.uploadFile({
                url: global_settings.base_url + indexApi[name].url, //仅为示例，非真实的接口地址
                filePath: data.filePath,
                fileType: 'image',
                name: 'file',
                formData: {
                    'category_id': '',
                    type: 'image'
                },
                header: Object.assign({},indexApi[name].headers || {}, header),
                success: (uploadFileRes) => {
                    resolve(uploadFileRes)
                },
                fail(res) {
                    resolve(res)
                }
            });
        })

    } else if (indexApi[name].type == 'get') { //get请求
        return new Promise((resolve, reject) => {
            graceRequest.get(
                global_settings.base_url + indexApi[name].url,
                Object.assign({}, indexApi[name].data, data),
                Object.assign({}, indexApi[name].headers || {}, header),
                function (res) {
                    if (!res.error) {

                        resolve(res)
                    } else if (res.error == -10000) {

                        uni.reLaunch({
                            url: '/pages/login/index'
                        })
                    } else {
                        console.error('接口出错了>', name, res)

                        reject(res)
                    }

                }
            );
        })
    } else { //post请求
        let newData = Object.assign({},indexApi[name].data, data); 
        return new Promise((resolve, reject) => {
            graceRequest.post(
                global_settings.base_url + indexApi[name].url,
                newData,
                'form',
                Object.assign({}, indexApi[name].headers || {}, header),
                function (res) {
                    if (!res.error) {
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