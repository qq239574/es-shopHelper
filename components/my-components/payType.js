export default function (origin) { //订单或用户来源


    let all = {//付款方式 0 未支付 1 后台确认2 余额支付 3 货到付款 10 微信支付 20 支付宝支付30 银联支付 
        0: '',
        1: '',
        2: '/static/img/global/money.png',
        3: '',
        10: '/static/img/global/wechat.png',
        20: '/static/img/global/alipay.svg',
        30: ''
        
    }
    let name = all[origin] || '';
    return name;
}