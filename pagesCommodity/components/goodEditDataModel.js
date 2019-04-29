import {
    flatten
} from '../../components/my-components/ajaxDataFormater.js'
let goodModel = { //商品编辑模板数据

}

function mapOptions(data, cache) {
    let options = (cache.options||[]).map((item, index) => {
        let tmp = data.info2.specification.list;
        let obj = {};
        if (tmp[index].specif.goodsId == item.goods_id) {
            obj = tmp[index];
        } else {
            for (let i = 0; i < tmp.length; i++) {
                if (tmp[i].specif.goodsId == item.goods_id) {
                    obj = tmp[i];
                    break;
                }
            }
        };
        return Object.assign({}, item, {
            goods_code: obj.code.value, //
            price: obj.price.value, //
            stock: obj.stock.value, //
        })
    });
    return options;
}

function mapGoods(data, cache) { 
    let goods = {
        title: data.info1.goodName.value,
        sub_title: data.info1.subTitle.value,
        category_ids: data.info1.classification.goodTypes.map(item => {
            return item.id;
        }),
        thumb: data.info1.mainImage.list[0].img,
        thumbs: data.info1.swiperList.list.map(item=>{
            return item.img
        }),
        price: data.info2.price.value,
        original_price:  data.info2.delPrice.value,
        stock:data.info2.stockNum.value,
        stock_hide: data.info2.showStock.value?1:0,
        sales_count: data.info2.soldNum.value ,
        sales_hide: data.info2.showSold.value?1:0,
        goods_code: data.info3.goodCode.value,
        auto_delivery: data.info3.autoDeliver.value?1:0,
        auto_delivery_content:data.info3.autoDeliverContent.value,
        dispatch_price: data.info3.provideCost.value,
        dispatch_hide: data.info3.showProCost.value?1:0,
        is_discount:data.info3.joinCount.value?1:0,
        form_id: data.info3.goodForm.formId,
        status: data.info4.status.statusId
    } 
    return goods;


}
export default function (data, cache) {

    let specs = cache.specs||'';
    let goods = cache.goods;
    goodModel = { //商品编辑模板数据
        'goods_id': cache.goods.id,
        data: {
            specs: specs,
            goods: Object.assign({
                auto_complete: '',
                auto_complete_content: "",
                auto_delivery: '',
                auto_delivery_content: "",
                auto_warehouse: '',
                category_ids: '',
                content: '',
                create_time: '',
                delete_time: '',
                dispatch_hide: '',
                dispatch_id: '',
                dispatch_price: '',
                dispatch_type: '',
                display_order: '',
                form_id: '',
                goods_code: "",
                has_option: '',
                id: '',
                is_buy_num_limit: '',
                is_delivery_pay: '',
                is_discount: '',
                is_free_dispatch: '',
                is_invoice_support: '',
                is_join_commission: '',
                is_join_member_price: '',
                is_refund_support: '',
                max_buy_once: '',
                max_buy_total: '',
                max_price: '',
                min_buy: '',
                min_price: '',
                original_price: '',
                params_id: '',
                params_img: "",
                params_type: '',
                price: '',
                product_sn: "",
                sales_count: '',
                sales_hide: '',
                school_ids: "",
                selling_object: '',
                sellout_time: '',
                shop_id: '',
                short_title: "",
                single_row_thumb: "",
                status: '',
                stock: '',
                stock_cnf: '',
                stock_hide: '',
                stock_warning: '',
                sub_title: "",
                template_id: '',
                thumb: '',
                thumbs: [],
                thumbs_ratio: "",
                title: '',
                type: '',
                unit: "",
                video: "",
                video_thumb: "",
                view_count: '',
                virtual_card_id: '',
                virtual_sales: '',
                volume: '',
                weight: ''
            }, goods, mapGoods(data, cache))
        },
        options: mapOptions(data, cache)

    } 
    console.log(goodModel)
    return flatten(goodModel);
}