<template>
    <view class='tip-detail page'>
        <vipWin></vipWin>
        <tabs :categories='categories' @tabChange='clickTab'></tabs>
        <vipBaseInfo v-if='tabIndex==0'></vipBaseInfo>
        <vipBussiness v-else-if='tabIndex==1'></vipBussiness>
        <vipCommission v-else></vipCommission>
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
               this.tabIndex=val.index;
            }
        },
    }
</script>

<style lang="scss" scoped>
    .tip-detail {}
</style>