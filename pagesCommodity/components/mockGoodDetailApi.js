export default function (data) {
    let that = this;
    return new Promise((resolve, reject) => {
        that.Request('beforeAddGoods', {}).then(res => {

            if (res.error == 0) {
                res.goods.type = data.typeId || 1 //1'实体商品', 2'虚拟物品', 3'电子卡密',
                res.goods.id = 1;
                res.goods.virtual_card_id = '';
                res.goods.title = '';
                res.goods.sub_title = '';
                res.goods.thumb = '';
                res.goods.thumbs = [];
                res.goods.has_option = 0;
                res.goods.price = '';
                res.goods.original_price = '';
                res.goods.stock = '';
                res.goods.stock_hide = '';
                res.goods.sales_count = '';
                res.goods.sales_hide = 0;
                res.goods.goods_code = '';
                res.goods.auto_warehouse = 1;
                res.goods.auto_warehouse_time = '';
                res.goods.auto_delivery = 1;
                res.goods.auto_delivery_content = '';
                res.goods.dispatch_price = '';
                res.goods.dispatch_hide = 0;
                res.goods.is_discount = 1;
                res.goods.form_id = 0;
                res.goods.status = 1;
                res.goods.putaway_time = '';  
                resolve(res);

            } else {
                reject(res);
            }
        }).catch(res => {
            reject(res);
        });
    })


}