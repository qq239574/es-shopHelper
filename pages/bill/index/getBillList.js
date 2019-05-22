import getPayType from '../../../components/my-components/payType.js'
export default function (tabid, data) {
    let billtype = ['waitPayBill', 'waitProvideBill', 'waitReceiveBill', 'finishedBill', 'closedBill', 'allBills'];
    let rightsTypeText = { //0 无效 1 仅退款 2 退款退货 3 换货
        '0': "无效",
        '1': "仅退款",
        '2': "退款退货",
        '3': "换货",
    }
    let statusMap = { // -2退款完成，-1取消状态，0普通状态，1为已付款，2为已发货，3为已完成
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        '-2': 4,
        '-1': 4
    }
    return new Promise((resolve, reject) => {
        this.Request(billtype[tabid], data).then(res => {
            let list = [];
            let goodlist = [];
            let countGood = 0;
            this.totalPage = Math.max(Math.ceil(res.count / 20), 1);

            list = res.list.map(item => {
                countGood = 0;
                goodlist = item.order_goods || [];
                goodlist.forEach(item => {
                    countGood += item.total * 1;
                })
                return {
                    info: { //订单及用户信息
                        name: item.member_nickname, //客户姓名昵称
                        provide: item.dispatch_type_text, //配送方式
                        num: countGood, //商品数量
                        pay: item.pay_price, //实付
                        addtion: item.remark_num, //备注数量
                        payType: item.pay_type, //支付方式
                        payTypeImg: getPayType(item.pay_type),
                        subStatus: item.is_refund, //订单状态// 0 无维权 1 正在维权中 2 维权过
                        status:statusMap[item.status] , //0代付款,1代发货，2待收货，3已完成，4已关闭
                        send_able: item.send_able, // 是否可发货
                        groups_success: item.groups_success, ///拼团结果
                        dispatch_price: item.dispatch_price, // 运费价格
                    },
                    bill: { //订单信息
                        billId: item.order_no, //订单号
                        billDate: item.create_time, //订单时间
                        billType: !!item.commission > 0 ? '分销订单' : '普通订单', //订单类型，分销订单，普通订单
                        billPrice: item.pay_price,
                        id: item.id, //订单id
                    },
                    goodsList: goodlist.map(item => { //订单商品信息
                        return {
                            img: item.thumb || 'https://ceshiuser.100cms.com/static/dist/shop/image/default_picture.png', //商品图片
                            goodName: item.title, //商品名
                            color: item.option_title ? item.option_title : '规格：无', //颜色,规格
                            size: '', //型号
                            num: item.total, //数量
                            price: item.price_unit, //价格
                            specifications: item.option_title ? 'multi' : 'single', //单规格,多规格
                            id: item.id,
                            rightStatus: item.refund_status, //-2取消 -1拒绝 0 申请 1完成  2（没用到） 3通过 4 买家填写退货快递单号 5 卖家填写换货快递单号
                            rightsType: item.refund_type, //0 无效 1 仅退款 2 退款退货 3 换货
                            rightsTypeText: rightsTypeText[item.refund_type]
                        }
                    }),
                    rights: { // 维权信息 
                        status: statusMap[item.status], //0代付款,1代发货，2待收货，3已完成，4已关闭
                        groups_success: item.groups_success, ///拼团结果
                        send_able: item.send_able, // 是否可发货
                        addition: item.remark_num, //维权备注
                        subStatus: item.is_refund, // //订单状态// 0 无维权 1 正在维权中 2 维权过
                        payType: item.pay_type, //支付方式
                    }
                };
            });
            resolve(list);
        })
    })
}