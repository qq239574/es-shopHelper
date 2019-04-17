<template>
    <view class='vip-busi-block1'>
        <inputItem :disabled='true' label='累计消费' value='230.50元'></inputItem>
        <inputItem :disabled='true' label='累计订单' value='230.50元'></inputItem>
        <inputItem :disabled='true' label='累计维权' value='230.50元'></inputItem>
        <inputItem :disabled='true' label='累计退款' value='230.50元'></inputItem>
    </view>
</template>

<script>
    import selectItem from '../../components/my-components/editBlock-SelectItem.vue'
    import inputItem from '../../components/my-components/editBlock-InputItem.vue'
    export default {
        components: {
            selectItem,
            inputItem
        }
    }
</script>

<style lang="scss" scoped>
.vip-busi-block1{
    background: #fff;
    margin:0 auto 20upx;
}
</style>