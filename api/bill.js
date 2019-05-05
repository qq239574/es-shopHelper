export const waitPayBill = { //代付款
    url: '/shop/manage/order/list/pay',
    data: {
        keywords_type: 'order_no',
        keywords: "",
        pay_type: '',
        status: '',
        dispatch_type: '',
        time_type: '',
        time: '',
        create_from: '',
        type: '',
    },
    headers: {

    },
    type: 'get'
}
export const waitProvideBill = { //代发货
    url: '/shop/manage/order/list/express',
    data: {
        keywords_type: 'order_no',
        keywords: "",
        pay_type: '',
        status: '',
        dispatch_type: '',
        time_type: '',
        time: '',
        create_from: '',
        type: '',
    },
    headers: {

    },
    type: 'get'
}
export const waitReceiveBill = { //待收货
    url: '/shop/manage/order/list/receive',
    data: {
        keywords_type: 'order_no',
        keywords: "",
        pay_type: '',
        status: '',
        dispatch_type: '',
        time_type: '',
        time: '',
        create_from: '',
        type: '',
    },
    headers: {

    },
    type: 'get'
}
export const finishedBill = { //已完成
    url: '/shop/manage/order/list/finish',
    data: {
        keywords_type: 'order_no',
        keywords: "",
        pay_type: '',
        status: '',
        dispatch_type: '',
        time_type: '',
        time: '',
        create_from: '',
        type: '',
    },
    headers: {

    },
    type: 'get'
}
export const closedBill = { //已关闭
    url: '/shop/manage/order/list/close',
    data: {
        keywords_type: 'order_no',
        keywords: "",
        pay_type: '',
        status: '',
        dispatch_type: '',
        time_type: '',
        time: '',
        create_from: '',
        type: '',
    },
    headers: {

    },
    type: 'get'
}

export const billAddition = { //订单备注
    url: '/shop/manage/order/op/remark',
    data: {
        id: ''
    },
    headers: {

    },
    type: 'get'
}

export const addAddition = { //添加订单备注
    url: '/shop/manage/order/op/remark',
    data: {
        id: '',
        remark: ''
    },
    headers: {

    },
    type: 'post'
}

export const billPrice = { //订单改价（获取数据）
    url: '/shop/manage/order/op/change-price',
    data: {
        id: ''
    },
    headers: {

    },
    type: 'get'
}
export const changeBillPrice = { //订单改价（获取数据）
    url: '/shop/manage/order/op/change-price',
    data: {
        id: '', //订单id
        dispatch_price: '', //运费
        total_price: '', //订单总价
        // change_items: []
    },
    headers: {

    },
    type: 'post'
}
export const payBill = { //确认付款

    url: '/shop/manage/order/op/pay',
    data: {
        id: '', //订单id
        password: ''
    },
    headers: {

    },
    type: 'post'
}
export const receiveBill = { //确认收货

    url: '/shop/manage/order/op/finish',
    data: {
        id: '', //订单id
        password: ''
    },
    headers: {

    },
    type: 'post'
}
export const canSendGoods = { //获取发货信息

    url: '/shop/manage/order/op/send',
    data: {
        id: '', //订单id
    },
    headers: {

    },
    type: 'get'
}
export const sendGoods = { //订单发货 
    url: '/shop/manage/order/op/send',
    data: {
        id: '', //订单id
        // order_goods_id: '', //要发货的订单商品id集合
        no_express: '', //	无需物流（0：需要物流 1：无需物流）
        express_id: '', //	物流公司id
        express_sn: '', //	物流单号
        remark: '', //	发货备注
    },
    headers: {

    },
    type: 'post'
}
export const billDetail = {
    url: '/shop/manage/order/detail/one',
    data: {
        id: '', //订单id号
    },
    headers: {

    },
    type: 'get'
}

export const selfVerifyLog = { //核销or自提历史列表
    url: '/shop/manage/order/verify/verify-log',
    data: {
        page: 1, //订单id号
        pagesize: 20,
        search: ''
    },
    headers: {

    },
    type: 'get'
}
export const verifyCount = { //自提or核销统计
    url: '/shop/manage/order/verify/verify-count',
    data: {

    },
    headers: {

    },
    type: 'get'
}

export const getSelfVerifyInfo={//订单自提(获取信息)
    url: '/shop/manage/order/verify/finish',
    data: {
        order_id:'',
        finish_code:''
    },
    headers: {

    },
    type: 'get'
}
export const postSelfVerifyInfo={//订单自提 
    url: '/shop/manage/order/verify/finish',
    data: {
        order_id:'',
        finish_code:''
    },
    headers: {

    },
    type: 'post'
}