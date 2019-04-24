<template>
    <view class='bill-block0'>
        <view class="left">
            <view class="title">{{info.billStatusText}}</view>
            <view class="money">订单金额：￥{{info.billPrice}}</view>
        </view>
        <view class="right">
            <image lazy-load :src='info.image'></image>
        </view>
    </view>
</template>

<script>
    export default {
        props: {
            info: {
                type: Object,
                default: {
                    billStatus: '',
                    billPrice:0,
                    image:''
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .bill-block0 {
        width: 710upx;
        margin: 20upx auto;
        border-radius: 6upx;
        height: 160upx;
        background: linear-gradient(left, #ff8245, #fb6638);
        display: flex;
        flex-wrap: nowrap;
        .left,
        .right {
            height: 100%;
        }
        .left {
            box-sizing: border-box;
            padding: 38upx 0;
            width: 448upx;
            margin-left: 70upx;
            .title {
                width: 100%;
                line-height: 30upx;
                height: 30upx;
                font-size: 30upx;
                color: #fff;
                font-weight: 700;
            }
            .money {
                width: 100%;
                line-height: 26upx;
                height: 26upx;
                font-size: 26upx;
                color: #fff;
                margin: 23upx 0 0 0;
            }
        }
        .right {
            width: 112upx;
            display: flex;
            image {
                width: 112upx;
                margin: auto;
                max-height: 100upx;
                ;
            }
        }
    }
</style>