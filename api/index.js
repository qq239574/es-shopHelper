import * as loginApi from './login'
import * as homeApi from './home'
var graceRequest = require("../graceUI/jsTools/request.js");

const global_settings = {
    base_url: "http://user.jiangyk.eldev.cn", //https://user.qd.ailings.cn/  http://user.jiangyk.eldev.cn/#/
    attachment_url: "http://es-static.eldev.cn/" //'https://es-static.ailings.cn/'
};
const indexApi = {
    ...loginApi,
    ...homeApi
};
 

 
export default function (name, data) {
    if (indexApi[name].type == 'get') {
        return new Promise((resolve, reject) => {
            graceRequest.get(
                global_settings.base_url + indexApi[name].url, 
                Object.assign(indexApi[name].data,data),
                function (res) {
                    resolve(res)
                }
            );
        })
    } else {
        return new Promise((resolve, reject) => {
            graceRequest.post(
                global_settings.base_url + indexApi[name].url, data,
                'form', {},
                function (res) {
                    resolve(res)
                }
            );
        })
    }


}