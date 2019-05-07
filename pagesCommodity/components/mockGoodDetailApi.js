const apiData={
    "error": 0,
    "goods": {
        "id": "287", //商品id
        "school_ids": [ //吉瑞宝定制 学校id
            "1",
            "2",
            "3"
        ],
        "selling_object": "1", //吉瑞宝定制 售卖对象 1认证学生 0普通会员
        "school_list": [ //学校列表
            {
                "id": 1,
                "name": "nming"
            }
        ],
        "shop_id": "1",
        "activity_goods": 1, //是否是活动商品 不是活动商品没有这个字段
        "display_order": "0",
        "type": "1", //1为实体 2为虚拟物品 3 卡密 4预约 5核销
        "title": "测试11111", //商品标题
        "sub_title": "", //商品副标题
        "status": "1", //商品状态 是否上架 0下架，1 上架 ，2 上架隐藏 3 定时上架，-1已删除(状态1,2,3上架为可以购买)
        "putaway_time": "000-00-00 00:00:00", //定时上架时间
        "video": "", //商品视频
        "video_thumb": "", //商品视频封面
        "thumb": "111", //商品首图
        "thumbs": [ //商品图集
            "111"
        ],
        "price": "0.00", //商品价格
        "original_price": "0.00", //商品划线价
        "min_price": "0.00", //商品最小价格
        "max_price": "0.00", //商品最大价格
        "discount_price": "", //
        "unit": "", //商品单位
        "has_option": "1", //是否有多规格
        "goods_code": "", //商品编码
        "product_sn": "", //商品条形码
        "stock": "0", //商品库存
        "stock_warning": "0", //库存预警
        "stock_hide": "1", //库存是否显示
        "stock_cnf": "0",
        "weight": "0.00", //重量
        "volume": "0.00", //体积
        "sales_count": "0", //销量
        "sales_hide": "0", //是否隐藏销量
        "virtual_sales": "1", //虚拟销量
        "auto_complete": "0",
        "auto_complete_content": "",
        "dispatch_type": "0", //运费类型
        "dispatch_price": "0.00", //运费价格
        "dispatch_id": "39", //运费模板id
        "dispatch_hide": "1", //快递是否隐藏 1隐藏
        "is_buy_num_limit": "0", //是否限购
        "max_buy_total": "0", //最大购买数量
        "max_buy_once": "0", //一次最大购买
        "min_buy": "0", //一次最小购买
        "content": "<p><br></p>", //商品内容
        "create_time": "2018-08-02 14:26:27", //创建时间
        "sellout_time": "0000-00-00 00:00:00", //售罄时间
        "view_count": "0", //浏览数
        "is_discount": "0", //是否参与会员折扣
        "params_type": "1", //参数模板类型 0普通 1图片
        "params_id": "0", //参数模板id
        "params_img": "http:sssss.wwww.ssss", //参数图片
        "auto_delivery": 0, //自动发货 0不是1是
        "auto_delivery_content": "自动发货内容",
        "template_id": "0", //自定义模板id
        "form_id": "0", //自定义表单id
        "short_title": "我是短标题",
        "single_row_thumb": "我是单列商品图片",
        "thumbs_ratio": "1:2", //轮播图比例
        "auto_warehouse": "0", // 商品自动关闭 0:否 1: 是
        "auto_warehouse_time": "0000-00-00 00:00:00", // 商品自动关闭时间
        "is_delivery_pay": "0" //货到付款1是0否
        "group_ids": [
            "77"
        ],
        "category_ids": [
            "192",
            "194"
        ],
        "label_ids": [
            "2"
        ]
    },
    "specs": [ //规格分类
        {
            "id": "112", //规格分类id
            "shop_id": "1",
            "goods_id": "287", //商品id
            "display_order": "0",
            "title": "11" //规格title
            "items": [ //规格
                {
                    "id": "227", //规格id
                    "shop_id": "1",
                    "goods_id": "287", //商品id
                    "spec_id": "112", //规格分类id
                    "title": "22" //规格标题
                    "display_order": "0"
                },
                {
                    "id": "228",
                    "shop_id": "1",
                    "goods_id": "287",
                    "spec_id": "112",
                    "title": "333",
                    "display_order": "1"
                }
            ]
        },
        {
            "id": "113",
            "shop_id": "1",
            "goods_id": "287",
            "display_order": "1",
            "title": "1",
            "items": [{
                    "id": "229",
                    "shop_id": "1",
                    "goods_id": "287",
                    "spec_id": "113",
                    "title": "2",
                    "display_order": "0"
                },
                {
                    "id": "230",
                    "shop_id": "1",
                    "goods_id": "287",
                    "spec_id": "113",
                    "title": "2",
                    "display_order": "1"
                }
            ]
        }
    ],
    "options": [ //规格
        {
            "id": "1213", //规格id
            "shop_id": "1",
            "goods_id": "287", //商品id
            "title": "22+2", //名称
            "thumb": "", //图片
            "price": "0.00", //价格
            "stock": "0", //库存
            "stock_warning": "0", //库存预警
            "weight": "0.00", //重量
            "goods_code": "0", //商品编码
            "specs": "227,229" //规格分类组合
            "display_order": "0"
        },
        {
            "id": "1214",
            "shop_id": "1",
            "goods_id": "287",
            "title": "22+2",
            "thumb": "",
            "price": "0.00",
            "stock": "0",
            "stock_warning": "0",
            "weight": "0.00",
            "goods_code": "0",
            "specs": "227,230",
            "display_order": "0"
        },
        {
            "id": "1215",
            "shop_id": "1",
            "goods_id": "287",
            "title": "333+2",
            "thumb": "",
            "price": "0.00",
            "stock": "0",
            "stock_warning": "0",
            "weight": "0.00",
            "goods_code": "0",
            "specs": "228,229",
            "display_order": "0"
        },
        {
            "id": "1216",
            "shop_id": "1",
            "goods_id": "287",
            "title": "333+2",
            "thumb": "",
            "price": "0.00",
            "stock": "0",
            "stock_warning": "0",
            "weight": "0.00",
            "goods_code": "0",
            "specs": "228,230",
            "display_order": "0"
        }
    ],
    "group_list": [ //分组列表
        {
            "id": "208",
            "name": "商品分组"
        },
        {
            "id": "209",
            "name": "商品分组"
        },
        {
            "id": "210",
            "name": "商品分组"
        },
        {
            "id": "211",
            "name": "商品分组"
        },
        {
            "id": "212",
            "name": "商品分组"
        },
        {
            "id": "213",
            "name": "商品分组"
        },
        {
            "id": "214",
            "name": "商品分组"
        },
        {
            "id": "215",
            "name": "商品分组"
        },
        {
            "id": "216",
            "name": "商品分组"
        },
        {
            "id": "217",
            "name": "商品分组"
        },
        {
            "id": "218",
            "name": "商品分组"
        },
        {
            "id": "219",
            "name": ""
        },
        {
            "id": "220",
            "name": "55"
        },
        {
            "id": "221",
            "name": "mm"
        },
        {
            "id": "222",
            "name": ""
        },
        {
            "id": "223",
            "name": ""
        },
        {
            "id": "224",
            "name": ""
        },
        {
            "id": "225",
            "name": ""
        }
    ],
    "cate_list": [ //分类列表
        {
            "id": "191",
            "name": "衣服"
        },
        {
            "id": "192",
            "name": "22"
        },
        {
            "id": "193",
            "name": "衬衫"
        },
        {
            "id": "194",
            "name": "外套"
        },
        {
            "id": "195",
            "name": "鞋子"
        },
        {
            "id": "196",
            "name": "凉鞋"
        },
        {
            "id": "197",
            "name": "运动鞋"
        },
        {
            "id": "198",
            "name": "88"
        },
        {
            "id": "199",
            "name": "666"
        },
        {
            "id": "200",
            "name": "6666"
        },
        {
            "id": "201",
            "name": "4444"
        },
        {
            "id": "202",
            "name": "4444"
        },
        {
            "id": "203",
            "name": "3333"
        },
        {
            "id": "204",
            "name": "4444"
        },
        {
            "id": "205",
            "name": "3333"
        },
        {
            "id": "206",
            "name": "帽子"
        },
        {
            "id": "210",
            "name": "22"
        },
        {
            "id": "211",
            "name": "12"
        },
        {
            "id": "212",
            "name": "3"
        }
    ],
    "dispatch_list": [ //运费模板
        {
            "id": "37",
            "name": "不节能"
        },
        {
            "id": "41",
            "name": "不要节能"
        },
        {
            "id": "42",
            "name": "节能"
        },
        {
            "id": "64",
            "name": "114"
        },
        {
            "id": "66",
            "name": "再来一个"
        },
        {
            "id": "67",
            "name": "三件五块"
        },
        {
            "id": "70",
            "name": "不节能"
        },
        {
            "id": "72",
            "name": "·111"
        },
        {
            "id": "76",
            "name": ""
        }
    ],
    "label_list": [ //支持标签id
        {
            "id": "2",
            "name": "测试排序方式1"
        },
        {
            "id": "3",
            "name": "盛世嫡妃"
        }
    ],
    "params_template": [ //参数模板id
        {
            "id": "4",
            "name": "我是测试"
        },
        {
            "id": "5",
            "name": "我是测试"
        }
    ],
    "diyform_list": [ //自定义表单
        {
            "id": "1", //id
            "name": "Test" //名称
        },
        {
            "id": "3",
            "name": "123"
        },
        {
            "id": "6",
            "name": "222"
        },
        {
            "id": "7",
            "name": "表单-单行文本"
        },
        {
            "id": "8",
            "name": "表单-多行文本"
        },
        {
            "id": "9",
            "name": "表单-身份证号码"
        },
        {
            "id": "10",
            "name": "表单-下拉框"
        },
        {
            "id": "11",
            "name": "表单-多选框"
        },
        {
            "id": "12",
            "name": "表单-单选框"
        },
        {
            "id": "13",
            "name": "表单-单选框"
        },
        {
            "id": "14",
            "name": "表单-图片"
        },
        {
            "id": "15",
            "name": "表单-日期"
        },
        {
            "id": "16",
            "name": "表单-时间"
        },
        {
            "id": "17",
            "name": "表单-时间范围"
        },
        {
            "id": "18",
            "name": "表单-城市"
        },
        {
            "id": "20",
            "name": "123456789012345678901234567890"
        },
        {
            "id": "21",
            "name": "空"
        },
        {
            "id": "22",
            "name": "测试至少添加一个组件"
        },
        {
            "id": "23",
            "name": "124"
        }
    ]
}

export default function(){
    return apiData
}