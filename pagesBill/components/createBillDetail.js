export default function () {
    return {
        billInfo1: {
            billStatus: '等待买家收货',
            billPrice: '233.55',
            image: '/static/img/global/vip-manage.png'
        },
        billInfo2: {
            billId: '', //订单编号
            billStatus: '', //订单状态
            billType: '', //订单类型
            billOrigin: '', //订单来源
            payType: '' //支付方式
        },
        billInfo3: {
            billTime: '', //下单时间
            payTime: '', //付款时间
            receiveTime: '', //收货时间
            payType: '' //付款方式
        },
        billInfo4: {
            buyer: '', //买家
            addtion: '', //买家备注
            provideType: '', //配送方式
            receiver: '', //收货人
            address: '' //收货地址
        },
        billInfo5: {
            moneyState: '', //佣金状态
            firstOne: '', //一级分销商
            secondOne: '', //二级分销商
            thirdOne: '' //三级分销商
        },
        billInfo6: [{
            goodsInfo: [{ //商品信息
                img: '/static/img/global/tmp.png', //商品图片
                goodName: '翻页蓝色的空间疯狂大富科技上来看饭店经理看时间对方离开时间slikfjsdfklklsjfdlkjslkdjfl', //商品名
                color: '浅绿色',
                size: 'S码',
                num: 2, //商品数量
                price: '15455.2' //价格
            }],
            billInfo: { //订单信息
                sendTime: '', //发货时间
                sendComp: '', //物流公司
                sendId: '', //快递单号
                sendStatus: '' //发货信息
            }
        }],
        billInfo7: {
            goodTotal: '', //商品总计
            vipCount: '', //会员折扣
            sendCost: '', //运费
            total: '', //合计
            rightStatus: '' //维权信息
        },
    }
}