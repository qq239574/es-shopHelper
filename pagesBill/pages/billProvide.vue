<template>
    <view class="bill-provide page">
        <ProvideGoods :goodsList="goodsList" @click="selectedList"></ProvideGoods>
        <ProvideBlock :info='provideInfo' :cityProvide='cityProvide' :needProvide='needProvide' @click="clickCell" @change='getDetail'></ProvideBlock>
        <longButton @click="sure">确认发货</longButton>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
    import ProvideGoods from "../components/ProvideGoods.vue";
    import ProvideBlock from "../components/ProvideBlock.vue";
    import longButton from "../../components/my-components/LongButton.vue";
    let cacheSelected = [];
    let DataFrom = {};
    let DataGo = {};
    let cacheBillInfo = {};
    let sendBillInfo = {
        id: '', //订单id
        order_goods_id: '', //要发货的订单商品id集合
        no_express: 0, //	无需物流（0：需要物流 1：无需物流）//商家配送 三方配送
        express_id: '', //	物流公司id
        express_sn: '', //	物流单号
        remark: '', //	发货备注
        isCity: 0
    }; //发货信息
    export default {
        components: {
            ProvideGoods,
            ProvideBlock,
            longButton
        },
        data() {
            return {
                goodsList: [{
                    img: "/static/img/global/tmp.png",
                    goodName: "",
                    color: "",
                    size: "",
                    num: 0,
                    price: 0,
                    status: 0, //0未发货
                    goods_id: ''
                }],
                provideInfo: {
                    address: '请选择',
                    provideType: '需要物流',
                    provideComp: '请选择',
                    provideId: '填写',
                    provideAddition: '未填写',
                    express: [], //物流公司
                },
                cityProvide: 0, ////是否同城快递，0快递 1同城
                needProvide: 0, //是否需要物流 0需要 1不需要
            };
        },
        methods: {
            getDetail(info) { //获取配送方式
                this.provideInfo.provideType = info.provideType;
                if (!this.cityProvide) { //快递
                    sendBillInfo.no_express = (info.provideType == '商家自配送' || info.provideType == '需要物流') ? 0 : 1;
                    this.needProvide = info.provideType != '需要物流' ? 1 : 0; //显示隐藏物流公司选项
                } else {
                    sendBillInfo.city_distribution_type = (info.provideType == '商家自配送' || info.provideType == '需要物流') ? 0 : 1;
                }
            },
            clickCell(val) {
                this.Cacher.setData('billProvide', {
                    from: 'billProvide',
                    value: val,
                    bill: DataFrom.bill
                })
                if (val.name == "备注") {
                    DataGo.go = 'billAddition';
                    uni.navigateTo({
                        url: "./billAddition?from=billProvide"
                    });
                } else if (val.name == "物流单号") {
                    DataGo.go = 'billId';
                    uni.navigateTo({
                        url: "./billId?from=billProvide"
                    });
                } else if (val.name == "物流公司") {
                    DataGo.go = 'componyList';
                    uni.navigateTo({
                        url: "./componyList?from=billProvide"
                    });
                }
            },
            selectedList(list) {
                cacheSelected = list.map(item => {
                    return item.goods_id
                });
            },
            sure() {
                // sendBillInfo.order_goods_id = cacheSelected;
                for (let k in sendBillInfo) {
                    if (k.indexOf('order_goods_id') > -1) {
                        delete sendBillInfo[k]
                    }
                }
                cacheSelected.forEach((item, index) => {
                    sendBillInfo['order_goods_id[' + index + ']'] = item
                });  
                let canSend = true;
                if (!this.cityProvide && sendBillInfo['no_express'] == 0) { //需要物流
                    if (!cacheSelected.length) {
                        canSend = false;
                        this.Toast('请选择发货商品')
                    } else if (!sendBillInfo['express_id']) {
                        canSend = false;
                        this.Toast('请选择物流公司')
                    } else if (!sendBillInfo['express_sn']) {
                        canSend = false;
                        this.Toast('请填写物流单号')
                    }
                }
                if (canSend) {
                    this.pageLoading();
                    this.Request('sendGoods', sendBillInfo).then(res => {
                        this.closePageLoading();
                        uni.navigateBack();
                    }).catch(res=>{
                        this.closePageLoading();
                        this.Toast(res.message)
                    });
                }
            },
            initPage() {
                if (DataFrom.from) {
                    sendBillInfo.id = DataFrom.bill.bill.id; //订单id
                    DataGo.data = this.Cacher.getData(DataGo.go) || {};
                    if (DataGo.go == 'billAddition') {
                        this.provideInfo.provideAddition = DataGo.data.billAddition || '';
                        sendBillInfo.remark = DataGo.data.billAddition;
                    } else if (DataGo.go == 'billId') {
                        this.provideInfo.provideId = DataGo.data.billId || '';
                        sendBillInfo.express_sn = DataGo.data.billId;
                    } else if (DataGo.go == 'componyList') {
                        this.provideInfo.provideComp = DataGo.data.label || '';
                        sendBillInfo.express_id = DataGo.data.id;
                    } 
                    this.Request("canSendGoods", {
                        id: DataFrom.bill.bill.id
                    }).then(res => {
                        cacheBillInfo = res;
                        this.goodsList = res.order_goods.map(item => {
                            return {
                                img: item.thumb,
                                goodName: item.title,
                                color: item.option_title,
                                size: '',
                                num: item.total,
                                price: item.price_unit,
                                status: item.can_send == 0 ? 1 : 0, //0未发货
                                goods_id: item.id,
                                refund_type: item.refund_type * 1, //0 无效 1 仅退款 2 退款退货 3 换货
                            };
                        });
                        cacheSelected = this.goodsList.filter(item => {
                            return !item.status
                        }).map(item => {
                            return item.goods_id
                        });
                        this.cityProvide = res.is_city_distribution * 1; //是否同城快递，0快递 1同城
                        this.provideInfo.address = res.address;
                        this.provideInfo.express = res.express;
                    });
                }
            }
        },
        onShow() {
            this.initPage();
        },
        onLoad(option) {
            DataFrom = this.Cacher.getData(option.from); 
        },
        onUnload() {
            this.Cacher.clearData(['billProvide','billId','billAddition','componyList']);
        }
    };
</script>

<style lang="scss" scoped>
    .bill-provide {
        padding-bottom: 50upx;
    }
</style>