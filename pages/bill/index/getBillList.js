export default function (tabid, data) {

    let billtype = ['waitPayBill', 'waitProvideBill', 'waitReceiveBill', 'finishedBill', 'closedBill', ];

    return new Promise((resolve, reject) => {
        this.Request(billtype[tabid], data).then(res => {
            let list = [];
            let goodlist = [];
            let countGood = 0;
            this.totalPage = Math.max(Math.ceil(res.count / 20), 1);
            list = res.list.map(item => {
                goodlist = item.order_goods || [];
                goodlist.forEach(item => {
                    countGood += item.total;
                })
                return {
                    info: { //订单及用户信息
                        name: item.member_nickname, //客户姓名昵称
                        provide: item.dispatch_type_text, //配送方式
                        num: countGood, //商品数量
                        pay: item.pay_price, //实付
                        addtion: item.remark_num, //备注数量
                        payType: item.pay_type, //支付方式
                        subStatus: item.is_refund, //订单状态// 0 无维权 1 正在维权中 2 维权过
                        status: tabid, //0代付款,1代发货，2待收货，3已完成，4已关闭
                    },
                    bill: { //订单信息
                        billId: item.order_no, //订单号
                        billDate: item.create_time, //订单时间
                        billType: item.type_text, //订单类型，分销订单，普通订单
                        billPrice: item.pay_price,
                        id: item.id,//订单id
                    },
                    goodsList: goodlist.map(item => { //订单商品信息
                        return {
                            img: item.thumb, //商品图片
                            goodName: item.title, //商品名
                            color: item.option_title ? item.option_title : '规格：无', //颜色,规格
                            size: '', //型号
                            num: item.total, //数量
                            price: item.price_unit, //价格
                            specifications: item.option_title ? 'multi' : 'single', //单规格,多规格
                            id: item.id,
                        }
                    }),
                    rights: { // 维权信息
                        status: '退款退货', //维权状态
                        addition: item.remark_num, //维权备注
                        subStatus: item.is_refund, // //订单状态// 0 无维权 1 正在维权中 2 维权过
                    }
                };
            });
            resolve(list);
        })
    })
}