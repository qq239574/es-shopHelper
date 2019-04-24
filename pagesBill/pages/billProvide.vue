<template>
    <view class="bill-provide page">
        <ProvideGoods :goodsList="goodsList" @click="selectedList"></ProvideGoods>
        <ProvideBlock :info='provideInfo' @click="clickCell" @change='getDetail'></ProvideBlock>
        <longButton @click="sure">确认发货</longButton>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
    import ProvideGoods from "../components/ProvideGoods";
    import ProvideBlock from "../components/ProvideBlock";
    import longButton from "../../components/my-components/LongButton.vue";
    let cacheSelected = [];
    let DataFrom = {};
    let DataGo = {};
    let cacheBillInfo = {};
    let sendBillInfo = {
        id: '', //订单id
        order_goods_id: '', //要发货的订单商品id集合
        no_express: 0, //	无需物流（0：需要物流 1：无需物流）
        express_id: '', //	物流公司id
        express_sn: '', //	物流单号
        remark: '', //	发货备注
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
                }
            };
        },
        methods: {
            getDetail(info) { //获取配送方式
                this.provideInfo.provideType = info.provideType;
                sendBillInfo.no_express = info.provideType == '需要物流' ? 0 : 1;
                console.log(info.provideType, 'info.provideType')
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
                cacheSelected.forEach((item, index) => {
                    sendBillInfo['order_goods_id['+index+']']=item
                })
                let canSend = true;
                if (sendBillInfo['no_express'] == 0) {
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
                console.log(sendBillInfo, 'sendBillInfo//////')
                if (canSend) {
                    this.pageLoading();
                    this.Request('sendGoods', sendBillInfo).then(res => {
                        this.closePageLoading();
                        uni.navigateBack();
                    });
                }
            },
            initPage() {
                if (DataFrom.from) {
                    sendBillInfo.id = DataFrom.bill.bill.id; //订单id
                    DataGo.data = this.Cacher.getData(DataGo.go) || {};
                    if (DataGo.go == 'billAddition') {
                        this.provideInfo.provideAddition = DataGo.data.billAddition || '未填写';
                        sendBillInfo.remark = DataGo.data.billAddition;
                    } else if (DataGo.go == 'billId') {
                        this.provideInfo.provideId = DataGo.data.billId || '填写';
                        sendBillInfo.express_sn = DataGo.data.billId;
                    } else if (DataGo.go == 'componyList') {
                        this.provideInfo.provideComp = DataGo.data.express || '请选择';
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
                                goods_id: item.id
                            };
                        });
                        cacheSelected = this.goodsList.filter(item => {
                            return !item.status
                        }).map(item => {
                            return item.goods_id
                        });
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
            this.initPage();
        }
    };
</script>

<style lang="scss" scoped>
    .bill-provide {
        padding-bottom: 50upx;
    }
</style>