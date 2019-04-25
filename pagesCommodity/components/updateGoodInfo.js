export default function (val, cacheGoodDetail) {

    if (val.label == '售卖价格') {
        cacheGoodDetail.info2.price.value = val.value;
    } else if (val.label == '划线价格') {
        cacheGoodDetail.info2.delPrice.value = val.value;
    } else if (val.label == '商品库存') {
        cacheGoodDetail.info2.stockNum.value = val.value;
    } else if (val.label == '显示库存') {
        cacheGoodDetail.info2.showStock.value = val.checked;
    } else if (val.label == '已出售数') {
        cacheGoodDetail.info2.soldNum.value = val.value;
        console.log(cacheGoodDetail.info2)
    } else if (val.label == '显示销量') {

        cacheGoodDetail.info2.showSold.value = val.checked;
    } else if (val.label == '显示快递') {
        cacheGoodDetail.info3.showProCost.value = val.checked;
    } else if (val.label == '参与会员折扣') {
        cacheGoodDetail.info3.joinCount.value = val.checked; 
    } else if (val.label == '主图') { 
        cacheGoodDetail.info1.mainImage.img = val.images[0] || '';
        cacheGoodDetail.info1.mainImage.list = val.images.map(item => {
            return {
                img: item
            }
        });

    } else if (val.label == '轮播图') {
        cacheGoodDetail.info1.swiperList.list = val.images.map(item => {
            return {
                img: item
            }
        });;
    } else if (val.label == '商品名称') {
        cacheGoodDetail.info1.goodName.value = val.value;
    } else if (val.label == '副标题') {
        cacheGoodDetail.info1.subTitle.value = val.value;
    } else if (val.label == '商品分类') {
        if (typeof val.value == 'object' && typeof val.value.map == 'function') {
            cacheGoodDetail.info1.classification.value = val.value.map(item => item.name).join(';');
            cacheGoodDetail.info1.classification.list = val.value;
        }
    } else if (val.label == '商品编码') {
        cacheGoodDetail.info3.goodCode.value = val.value;
    } else if (val.label == '快递运费') {
        cacheGoodDetail.info3.provideCost.value = val.value;
    } else if (val.label == '商品表单') {
        cacheGoodDetail.info3.goodForm.value = val.value;
    } else if (val.label == '状态') {
        cacheGoodDetail.info4.status.value = val.value;
    } else if (val.label == '规格类型') {

        cacheGoodDetail.info2.specification.list = val.other.list;
        console.log(cacheGoodDetail.info2.specification.list)
    } else if (val.label == '自动发货') {
        cacheGoodDetail.info3.autoDeliver.value = val.checked;
        console.log('auto>>', val.value)
    } else if (val.label == '自动发货内容') {
        cacheGoodDetail.info3.autoDeliverContent.value = val.value;
    }
    return cacheGoodDetail;

}