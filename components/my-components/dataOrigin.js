export default function (origin) { //订单或用户来源

    let all = { //0: 公众号 1: 小程序 2: wap/h5 3: app 4 :pc
        wechat: '/static/img/global/wechat.png',
        h5: '/static/img/global/h5.svg',
        alipay: '/static/img/global/alipay.svg',
        wxapp: '/static/img/global/miniapp.png',
        app: '/static/img/global/app.png',
        1: '/static/img/global/miniapp.png',
        2: '/static/img/global/h5.svg',
        3: '/static/img/global/app.png',
        4: '',
        0: ''

    }
    let name = all[origin] || '';
    return name;
}