<template>
    <!-- 主要用于首页数据展示中的昨日、今日、7日 -->
    <view class='my-button-group'>
        <view class="my-button-group__button my-button-group__button1">今日</view>
        <view class="my-button-group__button my-button-group__button2">昨日</view>
        <view class="my-button-group__button my-button-group__button3">七日</view>
    </view>
</template>

<script>
    export default {}
</script>

<style lang="scss" scoped>
    .my-button-group {
        display: flex;
        >.my-button-group__button {
            font-size: 24upx;
        }
    }
</style>
