<template>
    <view class='vip-busi-block'>
        <Block1></Block1>
        <Block2></Block2>
        <view class='margin50'></view>
        <longButton>查看订单</longButton>
    </view>
</template>

<script>
    import Block1 from './Vip-Business-Block1.vue'
    import Block2 from './Vip-Business-Block2.vue'
    import longButton from '../../components/my-components/LongButton.vue'
    export default {
        components: {
            Block1,
            Block2,
            longButton
        }
    }
</script>

<style lang="scss" scoped>
.margin50{
    height:50upx;
}
</style>