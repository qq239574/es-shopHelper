function combination(arr) { //排列组合商品规格
    let box = [];
    let tmp = '';
    if (arr.length == 1) {
        for (let i = 0; i < arr[0].length; i++) {
            tmp = [arr[0][i]];
            tmp.id = arr[0][i].id || '';
            box.push(tmp)
        }
    } else if (arr.length == 2) {
        for (let i = 0; i < arr[0].length; i++) {
            for (let j = 0; j < arr[1].length; j++) {
                tmp = [arr[0][i], arr[1][j]];
                tmp.id = arr[0][i].id + ',' + arr[1][j].id
                box.push(tmp)
            }
        }
    } else if (arr.length == 3) {
        for (let i = 0; i < arr[0].length; i++) {
            for (let j = 0; j < arr[1].length; j++) {
                for (let k = 0; k < arr[2].length; k++) {
                    tmp = [arr[0][i], arr[1][j], arr[2][k]];
                    tmp.id = arr[0][i].id + ',' + arr[1][j].id + ',' + arr[2][k].id
                    box.push(tmp)
                }
            }
        }
    }
    return box;
}

function addGoodType(old, list) { //添加修改子规格

    let children = [];
    list.forEach(item => {
        children.push(item.items)
    });
    let allTypeCombination = combination(children); //排列组合

    let len = old.length;
    let types = allTypeCombination.map((item) => { //生成新的childrenSpecs.list
        let tmp = {
            other: {},
            specsId: '',
            specif: {
                label: '规格',
                id: '',
                value: '',
                goodsId: '',
                disabled: true, //不可编辑
                editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
            },
            price: {
                label: '价格',
                id: '',
                value: 0,
                disabled: false, //可否编辑
                editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
            },
            cardStock: {
                label: '卡密库',
                id: '', 
                value:0,
                disabled: false, //可否编辑,活动期间不可编辑
                editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                needHide: true
            },
            stock: {
                label: '库存',
                id: '',
                value: 0,
                disabled: false, //可否编辑
                editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                needHide: false
            },
            code: {
                label: '商品编号',
                id: '',
                value: '',
                disabled: false, //可否编辑
                editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
            }
        };
        for (let i = 0; i < old.length; i++) {
            if (old[i].specsId == item.id) {
                tmp = old[i];
            }
        }
        return {
            other: tmp.other || {},
            specsId: item.id,
            specif: {
                label: '规格',
                id: tmp.specif.id,
                value: item.map(item => item.title || '').join('+').replace(/\+$/, ''),
                goodsId: tmp.specif.goods_id || '',
                disabled: true, //不可编辑
                editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
            },
            price: {
                label: '价格',
                id: '',
                value: tmp.price.value || 0,
                disabled: false, //可否编辑
                editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
            },
            cardStock:{
                label: '卡密库',
                id: tmp.cardStock.id, 
                value:tmp.cardStock.value,
                disabled: false, //可否编辑,活动期间不可编辑
                editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                needHide: tmp.cardStock.needHide
            },
            stock: {
                label: '库存',
                id: '',
                value: tmp.stock.value || 0,
                disabled: false, //可否编辑
                editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                needHide: tmp.stock.needHide
            },
            code: {
                label: '商品编号',
                id: '',
                value: tmp.code.value || '',
                disabled: false, //可否编辑
                editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
            }
        }
    })
    return types
}
export default function (val, cacheGoodDetail) {
    let static_resources_domain = this.Cacher.getData('static_resources_domain');
    let reg = new RegExp(static_resources_domain, 'g');

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
                img: item.replace(reg, '')
            }
        });
    } else if (val.label == '轮播图') {
        cacheGoodDetail.info1.swiperList.list = val.images.map(item => {
            return {
                img: item.replace(reg, '')
            }
        });
    } else if (val.label == '商品名称') {
        cacheGoodDetail.info1.goodName.value = val.value;
    } else if (val.label == '副标题') {
        cacheGoodDetail.info1.subTitle.value = val.value;
    } else if (val.label == '商品分类') {
        if (typeof val.value == 'object' && typeof val.value.map == 'function') {
            cacheGoodDetail.info1.classification.value = val.value.map(item => item.name).join(';').replace(/;+/g, ';');
            cacheGoodDetail.info1.classification.goodTypes = val.value;
            cacheGoodDetail.info1.classification.category_ids = val.value.map(item => item.id);
        }
    } else if (val.label == '商品编码') {
        cacheGoodDetail.info3.goodCode.value = val.value;
    } else if (val.label == '定时下架') {
        cacheGoodDetail.info3.autoExt.value = val.checked;
    } else if (val.label == '定时下架时间') {
        cacheGoodDetail.info3.autoExtTime.value = val.value;
    } else if (val.label == '快递运费') {
        cacheGoodDetail.info3.provideCost.value = val.info.subValue * 1;
        cacheGoodDetail.info3.provideCost.dispatch_id = val.info.id;
        cacheGoodDetail.info3.provideCost.dispatch_name = val.info.label;
    } else if (val.label == '商品表单') {
        cacheGoodDetail.info3.goodForm.value = val.value;
        cacheGoodDetail.info3.goodForm.id = val.id;
    } else if (val.label == '卡密库') {
        cacheGoodDetail.info2.cardStock.value = val.value;
        cacheGoodDetail.info2.cardStock.id = val.id;
    } else if (val.label == '状态') {
        cacheGoodDetail.info4.status.value = val.value;
        cacheGoodDetail.info4.status.id = val.other.id;
        cacheGoodDetail.info4.status.putaway_time = val.other.subValue;
    } else if (val.label == '规格类型') {
        cacheGoodDetail.info2.specification.list = val.other.list;
        cacheGoodDetail.info2.specification.id = val.other.list.length ? 'multi' : 'single';
        cacheGoodDetail.info2.specification.value = val.other.list.length ? '多规格' : '单规格';
        let oldList = cacheGoodDetail.info2.childrenSpecs.list;
        cacheGoodDetail.info2.childrenSpecs.list = addGoodType(oldList, val.other.list);
        cacheGoodDetail.info2.cardStock.needHide = !!val.other.list.length || cacheGoodDetail.info1.goodType.type != 3;//电子卡密
        
    } else if (val.label == '子规格详情') {
        cacheGoodDetail.info2.childrenSpecs.list = val.other.list;
    } else if (val.label == '自动发货') {
        cacheGoodDetail.info3.autoDeliver.value = val.checked;
    } else if (val.label == '自动发货内容') {
        cacheGoodDetail.info3.autoDeliverContent.value = val.value;
    } else if (val.label == '商品类型') {
        cacheGoodDetail.info1.goodType.value = val.value;
        cacheGoodDetail.info1.goodType.type = val.id; //1为实体 2为虚拟物品 3 卡密 4预约 5核销
        cacheGoodDetail.info2.cardStock.needHide = val.id == 3;
        cacheGoodDetail.info3.autoExt.needHide = val.id != 3;
        cacheGoodDetail.info3.autoExtTime.needHide = val.id != 3;
        cacheGoodDetail.info3.autoDeliver.needHide = val.id != 2;
        cacheGoodDetail.info3.autoDeliverContent.needHide = val.id != 2;
        cacheGoodDetail.info3.provideCost.needHide = val.id == 2;
        cacheGoodDetail.info3.showProCost.needHide = val.id == 2;
        cacheGoodDetail.info2.cardStock.needHide = !!cacheGoodDetail.info2.specification.list.length || val.id != 3;//电子卡密
    }
    return cacheGoodDetail;

}