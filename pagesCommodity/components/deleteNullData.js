export default function (data) {
    this.closePageLoading();
    delete data.goods_id;
    delete data['data[goods][virtual_card_id]'];
    delete data['data[goods][auto_warehouse_time]'];
    delete data['data[goods][putaway_time]'];
    let res = true; 
    if (!data['data[goods][title]']) {
        this.Toast('请填写商品名称');
        res = false;
    } else if (!data['data[goods][thumb]']) {
        this.Toast('请填写主图');
        res = false;
    } else if (!data['data[goods][thumbs][0]']) {
        this.Toast('请填写轮播图');
        res = false;
    } else if (!data['data[goods][price]'] * 1) {
        this.Toast('请填写售卖价格');
        res = false;
    } else if (data['data[goods][type]'] != 3 && (data['data[goods][stock]'] === '')) {
        this.Toast('请填写商品库存');
        res = false;
    }
    return res && data
}