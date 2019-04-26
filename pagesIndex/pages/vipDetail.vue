<template>
    <view class='tip-detail page'>
        <vipWin :info='vipInfo'></vipWin>
        <tabs :categories='categories' @tabChange='clickTab'></tabs>
        <vipBaseInfo v-if='tabIndex==0' :info='baseInfo' @click='clickBaseInfo'></vipBaseInfo>
        <vipBussiness @click='checkBill' :info='bussinessInfo' v-else-if='tabIndex==1'></vipBussiness>
        <vipCommission :info='commissionInfo' @click='clickDistriInfo' v-else></vipCommission>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
    import tabs from '../../components/my-components/Tabs'
    import vipBaseInfo from '../components/Vip-BaseInfo.vue'
    import vipBussiness from '../components/Vip-Business.vue'
    import vipCommission from '../components/Vip-CommissionInfo.vue'
    import vipWin from '../components/Vip-Detail-Window.vue'
    import getCommissionInfo from '../components/getCommisssionInfo.js'
    let DataFrom = {};
    let DataGo = {};
    export default {
        components: {
            tabs,
            vipBaseInfo,
            vipBussiness,
            vipCommission,
            vipWin
        },
        data() {
            return {
                baseInfo: { //基本资料
                    info1: {
                        registerTime: '',
                        origin: '',
                        vipClass: '',
                        vipTag: ''
                    },
                    info2: {
                        score: 0,
                        money: 0,
                        coupon: 0
                    }
                },
                bussinessInfo: {
                    info1: {
                        pay: 0,
                        bill: 0,
                        rights: 0,
                        refund: 0
                    },
                    info2: {
                        newBillTime: '',
                        newBrowserTime: ''
                    }
                },
                vipInfo: {
                    img: '',
                    name: '',
                    tel: '',
                    verification: ''
                },
                tabIndex: 0,
                categories: [{
                        cateid: 0,
                        name: "基本资料"
                    },
                    {
                        cateid: 1,
                        name: "交易统计"
                    },
                    {
                        cateid: 2,
                        name: "分销商信息"
                    }
                ],
                commissionInfo: { //分销商信息
                    isCommission: 0, //是否分销商，0不是，1曾是，2是
                    registerTime: '2017-12-23 12:12:12', //注册时间
                    superDistributor: { //上级分销商
                        name: '总店'
                    },
                    beDistributorTime: { //成为分销商时间
                        value: '2017-12-23 12:12:12'
                    },
                    distributorClass: { //分销商等级
                        name: '普通分销商'
                    },
                    accumCommission: { //累计佣金
                        value: 121
                    },
                    hadGet: { //已提现佣金
                        value: 121
                    },
                    waitMoney: { //待入账佣金
                        value: 121
                    },
                    commBill: { //分销订单
                        value: 12
                    },
                    subDistributor: { //分销下级
                        num: 1
                    },
                    firstSub: { //一级
                        num: 12,
                        distributor: 2
                    },
                    secondSub: { //二级
                        num: 12,
                        distributor: 2
                    },
                    thirdSub: { //三级
                        num: 12,
                        distributor: 2
                    }
                }
            }
        },
        methods: {
            checkBill() {
                console.log('object')
                this.Cacher.setData('vipDetail', {
                    from: 'vipDetail',
                    member_id: DataFrom.detail.info.id
                })
                uni.navigateTo({
                    url: './vipBills?from=vipDetail'
                })
            },
            initPage() {
                this.Request('vipDetail', { //会员信息
                    id: DataFrom.detail.info.id
                }).then(res => {
                    let data = res.data;
                    let commission = data.commission || {};
                    this.baseInfo = { //基本资料
                        info1: {
                            registerTime: data.create_time,
                            origin: data.come_from,
                            vipClass: data.level_name,
                            vipTag: data.tags.map(item => item.name).join(' ') || ' '
                        },
                        info2: {
                            score: data.credit,
                            money: data.balance,
                            coupon: data.coupon_count
                        }
                    };
                    this.vipInfo = {
                        img: data.avatar,
                        name: data.nickname,
                        tel: data.mobile,
                        verification: data.mobile_verified == 0 ? '未验证' : '已验证',
                    }
                    this.commissionInfo = getCommissionInfo(commission);
                });
                this.Request('vipTradeInfo', { //会员交易信息 
                    member_id: DataFrom.detail.info.id
                }).then(res => {
                    let data = res.statistics;
                    this.bussinessInfo = {
                        info1: {
                            pay: data.order_money,
                            bill: data.order_count,
                            rights: data.refund_count,
                            refund: data.refund_money
                        },
                        info2: {
                            newBillTime: res.last_order_time,
                            newBrowserTime: res.last_view_time
                        }
                    }
                })
            },
            clickTab(val) {
                this.tabIndex = val.index;
            },
            clickBaseInfo(val) { //点击基础信息中的组件
                if (val.label == '余额' || val.label == '积分') {
                    if (val.type == 'add' || val.type == 'minus') { //增加或扣除
                        this.Cacher.setData('vipDetail', {
                            from: 'vipDetail',
                            value: val,
                            info: DataFrom.detail.info
                        });
                        uni.navigateTo({
                            url: './addSurplus?from=vipDetail'
                        })
                    } else if (val.type == 'clear') { //清空操作
                        this.pageLoading();
                        let api = '';
                        if (val.label == '余额') {
                            api = 'changeVipMoney'
                        } else if (val.label == '积分') {
                            api = 'changeVipScore'
                        }
                        let num = 0;
                        num = Math.min(this.money, this.curnum) * -1;
                        this.Request(api, {
                            member_id: DataFrom.detail.info.id,
                            sum: val.value * -1, //充值数量 正数添加余额, 负数减少积分
                            remark: '用户确认清空账户' //
                        }).then(res => {
                            this.closePageLoading();
                            this.initPage();
                        });
                    }
                } else if (val.label == '优惠券') {
                    this.Cacher.setData('vipDetail', {
                        from: 'vipDetail',
                        value: val,
                        info: DataFrom.detail.info
                    });
                    uni.navigateTo({
                        url: './coupon?from=vipDetail'
                    })
                }
            },
            clickDistriInfo(val) { //点击分销商信息中的组件 
                if (val.type == 'remove') { //取消分销商
                    this.Request('changeCommissionStatus', {
                        member_id: DataFrom.detail.info.id,
                        status: 0
                    }).then(res => {
                        this.initPage();
                    })
                } else if (val.type == 'set') { //设为分销商
                    this.Request('changeCommissionStatus', {
                        member_id: DataFrom.detail.info.id,
                        status: 1
                    }).then(res => {
                        this.initPage();
                    })
                } else if (val.type == 'refuse') { //拒绝
                    this.Request('changeCommissionStatus', {
                        member_id: DataFrom.detail.info.id,
                        status: 0
                    }).then(res => {
                        this.initPage();
                    })
                } else if (val.type == 'allow') {
                    this.Request('changeCommissionStatus', {
                        member_id: DataFrom.detail.info.id,
                        status: 1
                    }).then(res => {})
                }
                this.initPage();
            }
        },
        onShow() {
            this.initPage()
        },
        onLoad(option) {
            DataFrom = this.Cacher.getData(option.from)
        }
    }
</script>

<style lang="scss" scoped>
    .tip-detail {
        .margin20 {
            height: 20upx;
            width: 100%;
            background: #f5f7fa;
        }
    }
</style>