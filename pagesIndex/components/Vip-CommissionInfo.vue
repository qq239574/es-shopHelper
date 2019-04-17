<template>
    <view class='vip-commission-block'>
        <Block1></Block1>
        <Block2></Block2>
        <view class="button">取消分销商</view>
    </view>
</template>

<script>
    import Block1 from './Vip-CommissionInfo-Block1.vue'
    import Block2 from './Vip-CommissionInfo-Block2.vue'

    export default {
        components: {
            Block1,
            Block2
        }
    }
</script>

<style lang="scss" scoped>
.vip-commission-block{
    .button{
        height:60upx;
        width:240upx;
        box-sizing: border-box;
        line-height: 58upx;
        border:1upx solid #fd6b3e;
        color:#fd6b3e;
        text-align: center;
        font-size: 27upx;
        margin:40upx auto;
        border-radius:30upx;
    }
}
</style>