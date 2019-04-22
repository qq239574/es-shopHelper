export default function (val, detail) {
    this.Cacher.setData('billDetail', {
        from: 'billDetail',
        detail,
        needChange: val
    })
    if (val.label == '商品编码') {
        uni.navigateTo({
            url: '../pages/editMultiCode?from=billDetail'
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
    }
}