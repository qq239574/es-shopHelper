export default function (origin) { //订单或用户来源

    let all = {
        wechat: '/static/img/global/wechat.png',
        h5: '/static/img/global/h5.svg',
        alipay: '/static/img/global/alipay.svg',
        wxapp: '/static/img/global/miniapp.png',
        app: '/static/img/global/app.png',
        
    }

    let name = all[origin] || '';
    return name;
}