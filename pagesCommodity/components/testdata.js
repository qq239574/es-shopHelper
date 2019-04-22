export function singleData() { //单规格商品
    return {
        info1: {
            goodType: {
                label: '商品类型',
                id: '',
                value: '实体商品',
                disabled: true, //可否编辑,false可以，true不可
                editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转

            },
            goodName: {
                label: '商品名称',
                id: '',
                value: '西门子（SIEMENS）  原装进口  智能5D喷淋嵌入式  西门子自动洗碗机  家用8套 大家庭SC73E610TI',
                disabled: false, //可否编辑
                editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
            },
            subTitle: {
                label: '副标题',
                id: '',
                value: '【西门子4月春游记】即日起-4月4日23.蓝山咖啡接口莱卡多浪费空间是快乐福利时间对方离开就是地方了看见',
                disabled: false, //可否编辑
                editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
            },
            classification: {
                label: '商品分类',
                id: '',
                value: '男装-休闲裤；男装-牛仔裤',
                list: [{
                    name: '男装-休闲裤',
                    id: '1'
                }, {
                    name: '男装-牛仔裤',
                    id: '2'
                }],
                disabled: false, //可否编辑
                editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
            },
            mainImage: {
                label: '主图',
                id: '',
                img: '/static/img/global/home_order_tobepay.png',
                list: [{
                    img: '/static/img/global/home_order_tobepay.png',
                }],
                disabled: false, //可否编辑
                editable: 'image', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
            },
            swiperList: {
                label: '',
                list: [{
                    img: '/static/img/global/order_detail_state1.png'
                }, {
                    img: '/static/img/global/order_detail_state2.png'
                }, {
                    img: '/static/img/global/order_detail_state3.png'
                }, {
                    img: '/static/img/global/order_detail_state4.png'
                }, ],
                disabled: false, //可否编辑
                editable: 'imagelist', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
            }
        },
        info2: {
            specification: {
                label: '规格类型',
                id: 'multi',
                value: '多规格',
                list: [{
                    specif: {
                        label: '规格',
                        id: '',
                        value: '2000W-亮黑色',
                        disabled: true, //可否编辑
                        editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                    },
                    price: {
                        label: '价格',
                        id: '',
                        value: '1999.0',
                        disabled: false, //可否编辑
                        editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                    },
                    stock: {
                        label: '库存',
                        id: '',
                        value: '23566',
                        disabled: false, //可否编辑
                        editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                    },
                    code: {
                        label: '商品编号',
                        id: '',
                        value: 'JB12595695656565998',
                        disabled: false, //可否编辑
                        editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                    },
                }],
                disabled: true, //可否编辑
                editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
            },
            price: { //售卖价格
                label: '售卖价格',
                id: '',
                value: '18.9',
                disabled: false, //可否编辑
                editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
            },
            delPrice: { //划线价格
                label: '划线价格',
                id: '',
                value: '16565',
                disabled: false, //可否编辑
                editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
            },
            stockNum: { //商品库存
                label: '商品库存',
                id: '',
                value: '16565',
                disabled: false, //可否编辑
                editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
            },
            showStock: { //显示库存
                label: '显示库存',
                id: '',
                value: true,
                disabled: false, //可否编辑
                editable: 'switch', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
            },
            soldNum: { //已出售数
                label: '已出售数',
                id: '',
                value: 10,
                disabled: false, //可否编辑
                editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
            },
            showSold: { //显示销量
                label: '显示销量',
                id: '',
                value: false,
                disabled: false, //可否编辑
                editable: 'switch', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
            }
        },
        info3: {
            goodCode: {
                label: '商品编码',
                id: '',
                value: '0654656565656',
                disabled: false, //可否编辑
                editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
            },
            autoDeliver: {
                label: '自动发货',
                id: '',
                value: false,
                disabled: false, //可否编辑
                editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                needHide:true,
            },
            autoDeliverContent: {
                label: '自动发货内容',
                id: '',
                value: '打开雷锋哈可减肥的话可接受的付款就是付款接收到付款就是付款计划谁看见大富豪看实践活动付款就是疯狂就哈萨克分',
                disabled: false, //可否编辑
                editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                needHide:true,
            },
            provideCost: {
                label: '快递运费',
                id: '',
                value: 10,
                disabled: false, //可否编辑
                editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                needHide:false,
            },
            showProCost: {
                label: '显示快递',
                id: '',
                value: true,
                disabled: false, //可否编辑
                editable: 'switch', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
            },
            joivbnCount: {
                label: '参与会员折扣',
                id: '',
                value: true,
                disabled: false, //可否编辑
                editable: 'switch', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
            },
            goodForm: {
                label: '商品表单',
                id: '',
                value: '',
                disabled: false, //可否编辑
                editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
            }
        },
        info4: {
            status: {
                label: '状态',
                id: '',
                value: '下架',
                disabled: false, //可否编辑
                editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
            }
        },
    }
}
export function multiData() {
    return {
        info1: {
            goodType: {
                label: '规格类型',
                id: '',
                value: '多规格',
                disabled: true, //可否编辑,false可以，true不可
                editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转

            },
            list: {
                disabled: false, //可否编辑,false可以，true不可
                editable: 'block', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                value: [{
                    specif: {
                        label: '规格',
                        id: '',
                        value: '2000W-亮黑色',
                        disabled: true, //可否编辑
                        editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                    },
                    price: {
                        label: '价格',
                        id: '',
                        value: '1999.0',
                        disabled: false, //可否编辑
                        editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                    },
                    stock: {
                        label: '库存',
                        id: '',
                        value: '23566',
                        disabled: false, //可否编辑
                        editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                    },
                    code: {
                        label: '商品编号',
                        id: '',
                        value: 'JB12595695656565998',
                        disabled: false, //可否编辑
                        editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                    },
                }]
            },
            delPrice: { //划线价格
                label: '划线价格',
                id: '',
                value: '16565',
                disabled: false, //可否编辑
                editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
            },
            showStock: { //显示库存
                label: '显示库存',
                id: '',
                value: false,
                disabled: false, //可否编辑
                editable: 'switch', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
            },
            soldNum: { //已出售数
                label: '已出售数',
                id: '',
                value: 10,
                disabled: false, //可否编辑
                editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
            },
            showSold: { //显示销量
                label: '显示销量',
                id: '',
                value: true,
                disabled: false, //可否编辑
                editable: 'switch', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
            }
        },
        info2: {
            provideCost: {
                label: '快递运费',
                id: '',
                value: 10,
                disabled: false, //可否编辑
                editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
            },
            showProCost: {
                label: '显示快递',
                id: '',
                value: true,
                disabled: false, //可否编辑
                editable: 'switch', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
            },
            joinCount: {
                label: '参与会员折扣',
                id: '',
                value: true,
                disabled: false, //可否编辑
                editable: 'switch', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
            },
            goodForm: {
                label: '商品表单',
                id: '',
                value: '',
                disabled: false, //可否编辑
                editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
            }
        },
        info3: {
            status: {
                label: '状态',
                id: '',
                value: '下架',
                disabled: false, //可否编辑
                editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
            }
        },
    }
}