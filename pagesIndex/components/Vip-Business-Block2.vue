<template>
    <view class='vip-busi-block2'>
        <inputItem :disabled='true' label='最近下单时间' value='230.50元'></inputItem>
        <inputItem :disabled='true' label='最近浏览时间' value='230.50元'></inputItem>
       
    </view>
</template>

<script>
    import inputItem from '../../components/my-components/editBlock-InputItem.vue' 
    export default {
        components: {
            inputItem
        }
    }
</script>

<style lang="scss" scoped>
    .vip-busi-block2 {
        background: #fff;
    }
</style>