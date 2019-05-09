export default function (val, detail) {
    let DataGo = ''
    if (val.label == '商品名称') {
        DataGo = 'editName'
    } else if (val.label == '副标题') {
        DataGo = 'editSubTitle'
    } else if (val.label == '商品分类') {
        DataGo = 'selectType'
    } else if (val.label == '商品编码') {
        DataGo = 'editCode'
    } else if (val.label == '快递运费') {
        DataGo = 'setFreight'
    } else if (val.label == '商品表单' || val.label == '卡密库') {
        DataGo = 'editForm'
    } else if (val.label == '状态') {
        DataGo = 'editStatus'
    } else if (val.label == '规格类型') {
        DataGo = 'addGoodType';
    } else if (val.label == '子规格详情') {
        DataGo = 'editMultiCode';
    } else if (val.label == '自动发货内容') {
        DataGo = 'autoDeliverContent'
    } else if (val.label == '销量') {
        DataGo = 'showGoodSale'
    } else if (val.label == '商品类型') {
        DataGo = 'editType'
    }

    this.Cacher.setData('editGood', {
        from: this.Cacher.getData('editGood').from,
        go: DataGo,
        detail,
        needChange: val
    })

    uni.navigateTo({
        url: '../pages/' + DataGo + '?from=editGood'
    })
}