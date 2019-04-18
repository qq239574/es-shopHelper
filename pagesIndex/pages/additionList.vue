<template>
    <view class='addition-list page'>
        <view class="counter">共<text>1</text>条</view>
        <additionBlock></additionBlock>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
    import additionBlock from '../components/AdditionShower'
    export default {
        components: {
            additionBlock
        }
    }
</script>

<style lang="scss" scoped>
    .addition-list {
        .counter {
            display: block;
            width: 690upx;
            margin: auto;
            font-size: 26upx;
            color: #9da3ae;
            line-height: 66upx;
        }
    }
</style>