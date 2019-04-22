<template>
    <view class='tip-detail page'>
        <vipWin></vipWin>
        <tabs :categories='categories' @tabChange='clickTab'></tabs>
        <vipBaseInfo v-if='tabIndex==0' @click='clickBaseInfo'></vipBaseInfo>
        <vipBussiness v-else-if='tabIndex==1'></vipBussiness>
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
                    isCommission:0, //是否分销商，0不是，1曾是，2是
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
            clickTab(val) {
                this.tabIndex = val.index;
            },
            clickBaseInfo(val) {//点击基础信息中的组件
                if (val.label == '余额' || val.label == '积分') {
                    if (val.type == 'add' || val.type == 'minus') { //增加或扣除
                        this.Cacher.setData('vipDetail', val);
                        uni.navigateTo({
                            url: './addSurplus?from=vipDetail'
                        })
                    } else if (val.type == 'clear') { //清空操作
                        this.pageLoading();
                    }
                } else if (val.label == '优惠券') {
                    uni.navigateTo({
                        url: './coupon'
                    })
                }
            },
            clickDistriInfo(val) {//点击分销商信息中的组件
                console.log(val)
               
                if(val.type=='remove'){

                }else if(val.type=='set'){

                }else if(val.type=='refuse'){

                }else if(val.type=='allow'){

                }
            }
        },
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