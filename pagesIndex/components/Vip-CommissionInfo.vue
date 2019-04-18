<template>
    <view class='vip-commission-block'>
        <block v-if='info.isCommission==2'>
            <Block1></Block1>
            <Block2></Block2>
            <view class="button">取消分销商</view>
        </block>
        <Block3 v-else-if='info.isCommission==1'></Block3>
        <Block4 v-else></Block4>
    </view>
</template>

<script>
    import Block1 from './Vip-CommissionInfo-Block1.vue'
    import Block2 from './Vip-CommissionInfo-Block2.vue'
    import Block3 from './Vip-CommissionInfo-Block3.vue'
    import Block4 from './Vip-CommissionInfo-Block4.vue'
    export default {
        props: {
            info: {
                type: Object,
                default: {
                    isCommission: 0, //是否分销商，0不是，1曾是，2是
                }
            }
        },
        components: {
            Block1,
            Block2,
            Block3,
            Block4
        }
    }
</script>

<style lang="scss" scoped>
    .vip-commission-block {
        .button {
            height: 60upx;
            width: 240upx;
            box-sizing: border-box;
            line-height: 58upx;
            border: 1upx solid #fd6b3e;
            color: #fd6b3e;
            text-align: center;
            font-size: 27upx;
            margin: 40upx auto;
            border-radius: 30upx;
        }
    }
</style>