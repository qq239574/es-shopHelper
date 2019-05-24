import {
    number_format
} from '../../components/my-components/formater.js'
export default function (result) {
    let commission = result.commission || { //上级分销商信息
        "agent_level1": { //一级上线分销商信息
            "nickname": "", //分销商昵称
            "avatar": "", //分销商头像
            "level": "", //分销商层级
            "mobile": "", //分销商手机号
            "commission": "" //该订单分销商获得佣金
        },
        "agent_level2": { //二级上线分销商信息
            "nickname": "",
            "avatar": "",
            "level": "",
            "mobile": "",
            "commission": ""
        },
        "agent_level3": { //三级上线分销商信息
            "nickname": "",
            "avatar": "",
            "level": "",
            "mobile": "",
            "commission": ""
        },
        "commission_status": -1 //分销状态 0待入账 1已入账
    }; //分销状态
    let rightsTypeText = { //0 无效 1 仅退款 2 退款退货 3 换货;商品维权状态

        '0': "无效",
        '1': "仅退款",
        '2': "退款退货",
        '3': "换货",
    }
    let statusImages = {
        "-2": '/static/img/global/order_detail_state6.png', // -2退款完成
        "-1": "/static/img/global/order_detail_state4.png", //-1取消状态。
        "0": "/static/img/global/order_detail_state1.png", //  0普通状态
        "1": "/static/img/global/order_detail_state2.png", // 1为已付款
        "2": "/static/img/global/order_detail_state3.png", // 2为已发货
        "3": "/static/img/global/order_detail_state5.png", // 3为已完成。
    }
    let billStatusMap = {
        "-2": '', // -2退款完成
        "-1": "", //-1取消状态。
        "0": "", //  0普通状态
        "1": "未发货", // 1为已付款
        "2": "已发货", // 2为已发货
        "3": "已完成", // 3为已完成。
    }
    let commisionState = ['待入账', '已入账']; //分销状态
    let extra_price_package = result.order.extra_price_package || { //优惠活动
        full: 0, //满减
        member_discount: 0, //会员折扣
        member_price: 0 //会员价
    };
    let refunding = 0; //是否维权状态//维权状态 0 无维权 1 正在维权 2 维权处理完成
    let discount_total = 0; //会员折扣  商品 price_discount 的 之和
    result.order.order_goods.forEach(item => {
        discount_total += item.price_discount * 1;
    })
    return {
        billInfo1: {
            billStatusText: result.order.status_text, //订单状态
            billPrice: result.order.pay_price, //订单支付金额
            billStatus: result.order.status, //订单状态码  -2退款完成。-1取消状态。 0普通状态。1为已付款。2为已发货。3为已完成。
            image: statusImages[result.order.status]
        },
        billInfo2: {
            billId: result.order.order_no, //订单编号
            billStatusText: result.order.status_text, //订单状态
            billStatus: result.order.status, //订单状态 -2退款完成。-1取消状态。 0普通状态。1为已付款。2为已发货。3为已完成。
            billTypeText: result.order.type_text, //订单类型  1为实体 2为虚拟物品 3 卡密 4预约 5核销
            billOriginText: result.order.create_from_text, //订单来源
            billOrigin: result.order.create_from, //订单来源 0: 公众号 1: 小程序 2: wap/h5 3: app 4 :pc
            payTypeText: result.order.pay_type_text, //支付方式 0 未支付 1 后台确认2 余额支付 3 货到付款 10 微信支付 20 支付宝支付30 银联支付
            payType: result.order.pay_type, //支付方式
        },
        billInfo3: {
            billTime: result.order.create_time, //下单时间
            payTime: result.order.pay_time, //付款时间
            receiveTime: result.order.finish_time, //收货时间
            payTypeText: result.order.pay_type_text, //支付方式 0 未支付 1 后台确认2 余额支付 3 货到付款 10 微信支付 20 支付宝支付30 银联支付
            payType: result.order.pay_type, //支付方式
            billStatus: result.order.status, //订单状态 -2退款完成。-1取消状态。 0普通状态。1为已付款。2为已发货。3为已完成。
        },
        billInfo4: {
            buyer: result.order.member_nickname, //买家
            addtion: result.order.remark_buyer, //买家备注
            provideTypeText: result.order.dispatch_type_text, //配送方式
            provideType: result.order.dispatch_type_text, //配送方式 0 无需发货 1快递 2自提 3同城
            receiver: result.order.buyer_name, //收货人
            address: result.order.address_full, //收货地址
            tel: result.order.buyer_mobile, //联系方式
        },
        billInfo5: {
            moneyState: commission.commission_status == -1 ? -1 : commisionState[commission.commission_status], //佣金状态 0待入账 1已入账  
            firstOne: {
                name: commission.agent_level1 && commission.agent_level1.nickname || '',
                tel: commission.agent_level1 && commission.agent_level1.mobile || '',
                money: number_format((commission.agent_level1 && commission.agent_level1.commission) || 0, 2, '.', ','),
            }, //一级分销商
            secondOne: {
                name: commission.agent_level2 && commission.agent_level2.nickname || '',
                tel: commission.agent_level2 && commission.agent_level2.mobile || '',
                money: number_format((commission.agent_level2 && commission.agent_level2.commission) || 0, 2, '.', ',')
            }, //二级分销商
            thirdOne: {
                name: commission.agent_level3 && commission.agent_level3.nickname || '',
                tel: commission.agent_level3 && commission.agent_level3.mobile || '',
                money: number_format((commission.agent_level3 && commission.agent_level3.commission) || 0, 2, '.', ',')
            } //三级分销商
        },
        billInfo6: result.goods_waits.map(item => { //未发货的商品
            if (item.refund_status != 0) {
               
                refunding = item.refund_status; //记录商品维权状态，有一个商品维权，订单就处于维权状态
                console.log('refund_status',refunding)
            }
            return {
                goodsInfo: [{ //商品信息
                    img: item.thumb, //商品图片
                    goodName: item.title, //商品名
                    color: item.option_title,
                    size: '',
                    num: item.total, //商品数量
                    price: item.price_unit, //价格
                    discount: item.price_discount, //折扣
                    total: item.price_original, //小计
                    refund_status: item.refund_status, //维权状态 0 无维权 1 正在维权 2 维权处理完成
                    refund_id: item.refund_id, //维权id 0：无维权 
                }],
                billInfo: { //订单信息 
                    sendTime: '', //发货时间
                    sendComp: '', //物流公司
                    sendId: '', //快递单号
                    sendStatus: item.status_text, //发货信息
                    dispatch_type:item.no_express//0无需物流 1需要物流
                }
            }
        }).concat(result.package_send.map(item => { //已发货的包裹

            return {
                goodsInfo: item.order_goods.map((val, key) => { //商品信息
                    if (val.refund_status != 0) {
                        refunding = val.refund_status; //记录商品维权状态，有一个商品维权，订单就处于维权状态
                    }
                    return {
                        img: val.thumb, //商品图片
                        goodName: val.title, //商品名
                        color: val.option_title,
                        size: '',
                        num: val.total, //商品数量
                        price: val.price_unit, //价格
                        discount: val.price_discount, //折扣
                        total: val.price_original, //小计
                        refund_status: val.refund_status,
                        refund_id: val.refund_id,
                        
                    }
                }),
                billInfo: { //订单信息 
                    sendTime: item.send_time, //发货时间
                    sendComp: item.express_name, //物流公司
                    sendId: item.express_sn, //快递单号
                    sendStatus: '已发货' ,//发货信息
                    dispatch_type:item.no_express//1无需物流 0需要物流
                }
            }
        })),
        billInfo7: {
            goodTotal: result.order.goods_price, //商品总计
            vipCount: (discount_total || 0).toFixed(2), //会员折扣
            sendCost: result.order.dispatch_price, //运费
            total: result.order.pay_price, //合计
            rightStatus: refunding //维权信息 //维权状态 0 无维权 1 正在维权 2 维权处理完成
        },
    }
}