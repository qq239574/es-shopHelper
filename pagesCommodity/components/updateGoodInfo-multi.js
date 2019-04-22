export default function (val, cacheGoodDetail) {

    if (val.label == '商品编码') { //
        cacheGoodDetail.info1.list = val.value;
    } else if (val.label == '快递运费') { //
        cacheGoodDetail.info2.provideCost.value = val.value;
    } else if (val.label == '商品表单') { //
        cacheGoodDetail.info2.goodForm.value = val.value;
    } else if (val.label == '状态') { //
        cacheGoodDetail.info3.status.value = val.value;
    }
    return cacheGoodDetail;

}