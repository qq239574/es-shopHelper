import {
    flatten
} from '../../components/my-components/ajaxDataFormater.js'
let goodModel = {} //商品编辑模板数据

function mapOptions(data, cache) {
    let options = data.info2.childrenSpecs.list.map((item, index) => {
        let tmp = Object.assign({
            goods_code: item.code.value, //
            price: item.price.value, //
            stock: item.stock.value, //
            id: item.specif.id,
            title: item.specif.value,
            specs: item.specsId,
            stock_warning: 0,
            weight: 0,
        }, item.other)
        if (data.info1.goodType.type == 3 && data.info2.specification.value == '多规格') { //多规格电子卡密
            tmp.virtual_card_id = item.cardStock.id
        }
        return tmp;
    });

    return options;
}

function mapSpecs(data, cache) {
    let newSpecs = data.info2.specification.list;
    return newSpecs;
}

function mapGoods(data, cache) {

    let goods = {
        id: '',
        type: data.info1.goodType.type, //商品类型
        title: data.info1.goodName.value, //商品名称
        sub_title: data.info1.subTitle.value, //商品副标题
        category_ids: data.info1.classification.goodTypes.map(item => { //商品分类
            return item.id;
        }).join(','),
        thumb: data.info1.mainImage.list[0] && data.info1.mainImage.list[0].img || '', //主图
        thumbs: data.info1.swiperList.list.map(item => { //轮播图
            return item.img
        }),
        virtual_card_id: data.info2.cardStock.id,
        has_option: data.info2.specification.value == '多规格' ? 1 : 0, //商品规格
        activity_goods: 0, //活动商品 0不是 1是
        price: data.info2.price.value, //售卖价格
        original_price: data.info2.delPrice.value || 0, //划线价格
        stock: data.info2.stockNum.value, //商品库存
        stock_hide: data.info2.showStock.value ? 0 : 1, //显示库存
        sales_count: data.info2.soldNum.value || 0, //已出售数
        sales_hide: data.info2.showSold.value ? 0 : 1, //显示销量
        goods_code: data.info3.goodCode.value, //商品编码
        auto_warehouse: data.info3.autoExt.value ? 1 : 0, //定时下架
        auto_warehouse_time: data.info3.autoExtTime.value, //定时下架时间
        auto_delivery: data.info3.autoDeliver.value ? 1 : 0, //自动发货
        auto_delivery_content: data.info3.autoDeliverContent.value, //自动发货内容
        dispatch_price: data.info3.provideCost.value || 0, //快递运费
        dispatch_id: data.info3.provideCost.dispatch_id, ////运费模板id
        dispatch_type: data.info3.provideCost.dispatch_id == -1 ? 1 : 0, //// 运费方式 0 运费模板 1 统一运费
        dispatch_hide: data.info3.showProCost.value ? 0 : 1, //显示快递
        is_discount: data.info3.joinCount.value ? 1 : 0, //参与会员折扣
        form_id: data.info3.goodForm.id || 0, //商品表单
        status: data.info4.status.id, //状态
        putaway_time: data.info4.status.putaway_time, //销量
        content: '<p>暂无</p>',
        stock_warning: 0

    }
    if (data.info1.goodType.type == 3 && data.info2.specification.value == '多规格') { //多规格电子卡密
        delete goods.virtual_card_id
    }

    return goods;


}
export default function (data, cache) {

    let specs = mapSpecs(data, cache);
    let goods = cache.goods;
    goodModel = { //商品编辑模板数据
        'goods_id': cache.goods.id,
        data: {
            // specs: specs,
            specs_json: JSON.stringify(specs),
            goods: Object.assign({
                auto_complete: '0',
                auto_complete_content: "",
                auto_delivery: '1',
                auto_delivery_content: "",
                auto_warehouse: '',
                category_ids: '',
                content: '',
                create_time: '',
                dispatch_hide: '',
                dispatch_id: '',
                dispatch_price: '',
                dispatch_type: '',
                form_id: '',
                goods_code: "",
                has_option: '',
                id: '',
                is_buy_num_limit: 0,
                is_delivery_pay: 0,
                is_discount: 1,
                is_free_dispatch: 0,
                is_invoice_support: 0,
                max_buy_once: 0,
                max_buy_total: 0,
                min_buy: 0,
                original_price: 0,
                params_id: 0,
                sales_count: '',
                sales_hide: '',
                short_title: "",
                single_row_thumb: "",
                status: '',
                stock: '',
                sub_title: "",
                thumb: '',
                thumbs: [],
                title: '',
                type: '',
                virtual_sales: 0,
                weight: 0
            }, goods, mapGoods(data, cache)),
            // options: mapOptions(data, cache),
            options_json: JSON.stringify(mapOptions(data, cache))
        },
    }
    return flatten(goodModel);
}