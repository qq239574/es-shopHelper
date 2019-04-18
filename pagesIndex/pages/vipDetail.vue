<template>
    <view class='tip-detail page'>
        <vipWin></vipWin>
        <tabs :categories='categories' @tabChange='clickTab'></tabs>
        <vipBaseInfo v-if='tabIndex==0' @click='clickBaseInfo'></vipBaseInfo>
        <vipBussiness v-else-if='tabIndex==1'></vipBussiness>
        <vipCommission v-else></vipCommission>
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
                ]
            }
        },
        methods: {
            clickTab(val) {
                this.tabIndex = val.index;
            },
            clickBaseInfo(val) { 
                if (val.label == '余额' || val.label == '积分') {
                    if (val.type == 'add' || val.type == 'minus') {//增加或扣除
                        this.Cacher.setData('vipDetail', val);
                        uni.navigateTo({
                            url: './addSurplus?from=vipDetail'
                        })
                    } else if (val.type == 'clear') {//清空操作
                        this.pageLoading();
                    }
                } else if (val.label == '优惠券') {
                    uni.navigateTo({
                        url: './coupon'
                    })
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