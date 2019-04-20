export default function (status) {
    return [{
        info: { //订单及用户信息
            name: '张三', //客户姓名
            provide: '到店自提', //配送方式
            num: 40, //商品数量
            pay: 21653.43, //实付
            addtion: [{}, {}, {}], //备注
            payType: 'wx', //支付方式
            subStatus: 0, //订单状态，1：维权
            status, //0代付款,1代发货，2待收货，3已完成，4已关闭
        },
        bill: { //订单信息
            billId: 'ES204565656526265656565', //订单号
            billDate: '2018-05-12 15:23:12', //订单时间
            billType: 0, //订单类型，0：分销订单，1：普通订单
            billPrice: 7888
        },
        goodsList: [{ //订单商品信息
            img: '/static/img/global/tmp.png', //商品图片
            goodName: '翻页蓝色的空间疯狂大富科技上来看饭店经理看时间对方离开时间slikfjsdfklklsjfdlkjslkdjfl', //商品名
            color: '浅绿色', //颜色
            size: 'S码', //型号
            num: 2, //数量
            price: '15455.2', //价格
            specifications: 'single', //单规格
        }, {
            img: '/static/img/global/tmp.png',
            goodName: '翻页蓝色的空间疯狂大富科技上来看饭店经理看时间对方离开时间',
            color: '浅绿色',
            size: 'S码',
            num: 2,
            price: '152344.2',
            specifications: 'multi', //多规格
        }],
        rights: { // 维权信息
            status: '退款退货', //维权状态
            addition: [{
                content: '摔坏了'
            }, {
                content: '摔坏了'
            }, {
                content: '摔坏了'
            }, ], //维权备注
            subStatus: 0, //订单状态，1：维权
        }
    }, {
        info: { //订单及用户信息
            name: '张三', //客户姓名
            provide: '到店自提', //配送方式
            num: 4, //商品数量
            pay: 2165653.453, //实付
            addtion: [], //备注
            payType: 'wx', //支付方式
            subStatus: 0, //订单状态，1：维权
            status, //0代付款,1代发货，2待收货，3已完成，4已关闭
        },
        bill: { //订单信息
            billId: 'ES204565656526265656565', //订单号
            billDate: '2018-05-12 15:23:12', //订单时间
            billType: 0, //订单类型，0：分销订单，1：普通订单
            billPrice: 5555
        },
        goodsList: [{ //订单商品信息
            img: '/static/img/global/tmp.png', //商品图片
            goodName: '翻页蓝色的空间疯狂大富科技上来看饭店经理看时间对方离开时间slikfjsdfklklsjfdlkjslkdjfl', //商品名
            color: '浅绿色', //颜色
            size: 'S码', //型号
            num: 2, //数量
            price: '15455.2', //价格
            specifications: 'single', //单规格
        }, {
            img: '/static/img/global/tmp.png',
            goodName: '翻页蓝色的空间疯狂大富科技上来看饭店经理看时间对方离开时间',
            color: '浅绿色',
            size: 'S码',
            num: 2,
            price: '152344.2',
            specifications: 'multi', //多规格
        }],
        rights: { // 维权信息
            status: '退款退货', //维权状态
            addition: [{
                content: '摔坏了'
            }], //维权备注
            subStatus: 0, //订单状态，1：维权
        }
    }, {
        info: { //订单及用户信息
            name: '张三', //客户姓名
            provide: '到店自提', //配送方式
            num: 4, //商品数量
            pay: 2165653.453, //实付
            addtion: [{}], //备注
            payType: 'wx', //支付方式
            subStatus: 1, //订单状态，1：维权
            status, //0代付款,1代发货，2待收货，3已完成，4已关闭
        },
        bill: { //订单信息
            billId: 'ES204565656526265656565', //订单号
            billDate: '2018-05-12 15:23:12', //订单时间
            billType: 1, //订单类型，0：分销订单，1：普通订单
            billPrice: 453
        },
        goodsList: [{ //订单商品信息
            img: '/static/img/global/tmp.png', //商品图片
            goodName: '翻页蓝色的空间疯狂大富科技上来看饭店经理看时间对方离开时间slikfjsdfklklsjfdlkjslkdjfl', //商品名
            color: '浅绿色', //颜色
            size: 'S码', //型号
            num: 2, //数量
            price: '15455.2', //价格 
            specifications: 'multi', //多规格
        }, {
            img: '/static/img/global/tmp.png',
            goodName: '翻页蓝色的空间疯狂大富科技上来看饭店经理看时间对方离开时间',
            color: '浅绿色',
            size: 'S码',
            num: 2,
            price: '152344.2',
            specifications: 'multi', //多规格
        }],
        rights: { // 维权信息
            status: '退款退货', //维权状态
            addition: [{
                content: '摔坏了'
            }], //维权备注
            subStatus: 1, //订单状态，1：维权
        }
    }, {
        info: { //订单及用户信息
            name: '张三', //客户姓名
            provide: '到店自提', //配送方式
            num: 4, //商品数量
            pay: 2165653.453, //实付
            addtion: [], //备注
            payType: 'wx', //支付方式
            subStatus: 1, //订单状态，1：维权
            status, //0代付款,1代发货，2待收货，3已完成，4已关闭
        },
        bill: { //订单信息
            billId: 'ES204565656526265656565', //订单号
            billDate: '2018-05-12 15:23:12', //订单时间
            billType: 0, //订单类型，0：分销订单，1：普通订单
            billPrice: 989
        },
        goodsList: [{ //订单商品信息
            img: '/static/img/global/tmp.png', //商品图片
            goodName: '翻页蓝色的空间疯狂大富科技上来看饭店经理看时间对方离开时间slikfjsdfklklsjfdlkjslkdjfl', //商品名
            color: '浅绿色', //颜色
            size: 'S码', //型号
            num: 2, //数量
            price: '15455.2', //价格 
            specifications: 'multi', //多规格
        }, {
            img: '/static/img/global/tmp.png',
            goodName: '翻页蓝色的空间疯狂大富科技上来看饭店经理看时间对方离开时间',
            color: '浅绿色',
            size: 'S码',
            num: 2,
            price: '152344.2',
            specifications: 'multi', //多规格
        }],
        rights: { // 维权信息
            status: '退款退货', //维权状态
            addition: [{
                content: '摔坏了'
            }], //维权备注
            subStatus: 1, //订单状态，1：维权
        }
    }]
}