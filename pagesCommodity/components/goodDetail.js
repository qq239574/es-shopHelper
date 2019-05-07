 export function goodData(data) { //单规格商品
     let static_resources_domain = this.Cacher.getData('static_resources_domain');
     let reg = new RegExp(static_resources_domain, 'g');

     let typeList = ['实体商品', '虚拟物品', '电子卡密', '预约', '核销']; //商品类型
     let goodCateList = data.cate_list.map(item => { //商品一级分类
         return {
             name: item.title,
             id: item.id,
             children: item.children || []
         }
     }); //商品分类列表
     let cardSocks = data.virtual_list || []; //卡密库
     let virtual_card_id = data.goods.virtual_card_id || '';
     let cardType = {};
     let cardStocksLen = cardSocks.length;
     let tmpCard = {};
     for (let i = 0; i < cardStocksLen; i++) {
         tmpCard = cardSocks[i];
         if (tmpCard.id == virtual_card_id) {
             cardType = tmpCard;
             break;
         }
     }
     let tmparr = data.goods.category_ids;
     let allTypes = []; //商品一二级分类
     data.cate_list.forEach(item => {
         allTypes.push({
             name: item.title,
             id: item.id,
             children: item.children || []
         });
         if (item.children && item.children.length) {
             item.children.forEach(val => {
                 allTypes.push({
                     name: val.title,
                     id: val.id,
                     children: val.children || []
                 });
             })
         }

     }); //商品分类列表
     let goodTypes = allTypes.filter(item => {
         let len = tmparr.length;
         let result = false;
         for (let i = 0; i < len; i++) {
             if (item.id == tmparr[i]) {
                 result = true;
                 break;
             }
         }

         return result;
     }); //商品所属分类
     let formList = data.form_list;
     let statusList = ['已删除', '下架', '上架售卖', '上架隐藏', '定时上架'];

     return {
         info1: {
             goodType: {
                 label: '商品类型',
                 id: data.goods.id,
                 type: data.goods.type, ////1为实体 2为虚拟物品 3 卡密 4预约 5核销
                 value: typeList[data.goods.type - 1],
                 disabled: true, //可否编辑,false可以，true不可
                 editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
             },
             goodName: {
                 label: '商品名称',
                 id: data.goods.id,
                 value: data.goods.title,
                 disabled: false, //可否编辑
                 editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
             },
             subTitle: {
                 label: '副标题',
                 id: data.goods.id,
                 value: data.goods.sub_title,
                 disabled: false, //可否编辑
                 editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
             },
             classification: {
                 label: '商品分类',
                 id: data.goods.id,
                 value: goodTypes.map(item => {
                     return item.name;
                 }).join(';'),
                 list: goodCateList, //全部类型 
                 category_ids: data.goods.category_ids,
                 goodTypes, //商品的类型
                 disabled: false, //可否编辑
                 editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
             },
             mainImage: {
                 label: '主图',
                 id: '',
                 img: data.goods.thumb,
                 list: data.goods.thumb ? [{
                     img: data.goods.thumb.replace(reg, ''),
                 }] : [],
                 disabled: false, //可否编辑
                 editable: 'image', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
             },
             swiperList: {
                 label: '',
                 list: data.goods.thumbs.map(item => ({
                     img: item.replace(reg, '')
                 })),
                 disabled: false, //可否编辑
                 editable: 'imagelist', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
             }
         },
         info2: {
             specification: {
                 label: '规格类型',
                 id: data.goods.has_option == 0 ? 'single' : 'multi', //是否有多规格
                 value: data.goods.has_option == 0 ? "单规格" : "多规格",
                 list: (data.options || []).map(item => {
                     return {
                         specif: {
                             label: '规格',
                             id: item.id,
                             value: item.title,
                             goodsId: item.goods_id,
                             disabled: true, //可否编辑
                             editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                         },
                         price: {
                             label: '价格',
                             id: '',
                             value: item.price,
                             disabled: false, //可否编辑
                             editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                         },
                         stock: {
                             label: '库存',
                             id: '',
                             value: item.stock,
                             disabled: false, //可否编辑
                             editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                         },
                         code: {
                             label: '商品编号',
                             id: '',
                             value: item.goods_code,
                             disabled: false, //可否编辑
                             editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                         }
                     }
                 }),
                 disabled: true, //可否编辑
                 editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                 type:'edit',//add为添加
             },
             price: { //售卖价格
                 label: '售卖价格',
                 id: '',
                 value: data.goods.price,
                 disabled: false, //可否编辑
                 editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
             },
             delPrice: { //划线价格
                 label: '划线价格',
                 id: '',
                 value: data.goods.original_price,
                 disabled: false, //可否编辑
                 editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
             },
             cardStock: { //划线价格
                 label: '卡密库',
                 id: virtual_card_id,
                 value: cardType.name,
                 formList: cardSocks,
                 needHide: data.goods.type == 3,
                 disabled: false, //可否编辑
                 editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
             },
             stockNum: { //商品库存
                 label: '商品库存',
                 id: '',
                 value: data.goods.stock,
                 disabled: false, //可否编辑
                 editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
             },
             showStock: { //显示库存
                 label: '显示库存',
                 id: '',
                 value: data.goods.stock_hide == 0,
                 disabled: false, //可否编辑
                 editable: 'switch', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
             },
             soldNum: { //已出售数
                 label: '已出售数',
                 id: '',
                 value: data.goods.sales_count,
                 disabled: false, //可否编辑
                 editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
             },
             showSold: { //显示销量
                 label: '显示销量',
                 id: '',
                 value: data.goods.sales_hide == 0,
                 disabled: false, //可否编辑
                 editable: 'switch', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
             }
         },
         info3: {
             goodCode: {
                 label: '商品编码',
                 id: '',
                 value: data.goods.goods_code,
                 disabled: false, //可否编辑
                 editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
             },
             autoExt: {
                 label: '定时下架',
                 id: '',
                 value: data.goods.auto_warehouse == 1,
                 disabled: false, //可否编辑
                 editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                 needHide: data.goods.type != 3, ///3为电子卡密
             },
             autoExtTime: {
                 label: '定时下架时间',
                 id: '',
                 value: data.goods.auto_warehouse_time,
                 disabled: false, //可否编辑
                 editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                 needHide: data.goods.type != 3, //3为电子卡密,
             },
             autoDeliver: {
                 label: '自动发货',
                 id: '',
                 value: data.goods.auto_delivery == 1,
                 disabled: false, //可否编辑
                 editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                 needHide: data.goods.type != 2, //虚拟商品无快递运费相关选项，多出自动发货相关
             },
             autoDeliverContent: {
                 label: '自动发货内容',
                 id: '',
                 value: data.goods.auto_delivery_content,
                 disabled: false, //可否编辑
                 editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                 needHide: data.goods.type != 2, //虚拟商品无快递运费相关选项，多出自动发货相关
             },
             provideCost: {
                 label: '快递运费',
                 id: '',
                 value: data.goods.dispatch_price,
                 dispatch_list: data.dispatch_list,
                 disabled: false, //可否编辑
                 editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                 needHide: data.goods.type == 2, //虚拟商品无快递运费相关选项，多出自动发货相关
             },
             showProCost: {
                 label: '显示快递',
                 id: '',
                 value: data.goods.dispatch_hide == 0,
                 disabled: false, //可否编辑
                 editable: 'switch', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                 needHide: data.goods.type == 2, //虚拟商品无快递运费相关选项，多出自动发货相关
             },
             joinCount: {
                 label: '参与会员折扣',
                 id: '',
                 value: data.goods.is_discount == 1,
                 disabled: false, //可否编辑
                 editable: 'switch', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
             },
             goodForm: {
                 label: '商品表单',
                 id: data.goods.form_id,
                 value: formList.filter(item => { 
                     return item.id == data.goods.form_id
                 }).map(item => {
                     return item.name
                 }).join(''),
                 formList,
                 disabled: false, //可否编辑
                 editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
             }
         },
         info4: {
             status: {
                 label: '状态',
                 id: data.goods.status,
                 value: statusList[data.goods.status * 1 + 1],
                 putaway_time: data.goods.putaway_time,
                 disabled: false, //可否编辑
                 editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
             }
         },
     }
 }
 export function addGoodsModel(data) {
     let dataModel = goodData.call(this,data);
     dataModel.info1.goodType.disabled = false;
     dataModel.info2.specification.disabled = false;
     dataModel.info2.specification.type = 'add';

     return dataModel;


 }