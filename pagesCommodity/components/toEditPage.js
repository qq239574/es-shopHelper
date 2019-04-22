export default function (val, detail) {
    this.Cacher.setData('billDetail', {
        from: 'billDetail',
        detail,
        needChange: val
    })
    if (val.label == '商品名称') {
        uni.navigateTo({
            url: '../pages/editName?from=billDetail'
        })
    } else if (val.label == '副标题') {
        uni.navigateTo({
            url: '../pages/editSubTitle?from=billDetail'
        })
    } else if (val.label == '商品分类') {
        uni.navigateTo({
            url: '../pages/selectType?from=billDetail'
        })
    } else if (val.label == '商品编码') {
        uni.navigateTo({
            url: '../pages/editCode?from=billDetail'
        })
    } else if (val.label == '快递运费') {
        uni.navigateTo({
            url: '../pages/setFreight?from=billDetail'
        })
    } else if (val.label == '商品表单') {
        uni.navigateTo({
            url: '../pages/editForm?from=billDetail'
        })
    } else if (val.label == '状态') {
        uni.navigateTo({
            url: '../pages/editStatus?from=billDetail'
        })
    } else if (val.label == '规格类型') {
        uni.navigateTo({
            url: '../pages/editMultiCode?from=billDetail'
        })
    } else if (val.label == '自动发货内容') {
        uni.navigateTo({
            url: '../pages/autoDeliverContent?from=billDetail'
        })
    }
}