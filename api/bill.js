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
        change_items: [{
            "id": "", //订单商品id
            "price_change": "0" //改价变动金额

        }]
    },
    headers: {

    },
    type: 'post'
}
export const payBill={//确认付款

    url: '/shop/manage/order/op/pay',
    data: {
        id: '', //订单id
        password:''
    },
    headers: {

    },
    type: 'post'
}