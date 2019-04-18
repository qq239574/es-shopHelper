<template>
    <view class='block-foot '>
        <view class="info">已选择
            <view class="price">{{num}}</view>张
        </view>
        <view class="button">确认添加</view>
    </view>
</template>

<script>
    export default {
        props:{
            num:{
                type:Number,
                default:0
            }
        }
    }
</script>

<style lang="scss" scoped>
    .block-foot {
        width: 100%;
        height: 100upx;
        background: #f7f8f9;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        position: fixed;
        bottom: 0;left: 0;
        view {
            height: 100%;
            line-height: 100upx;
            font-size: 28upx;
            font-weight: 600;
        }
        .info {
            width: 488upx;
            padding: 0 40upx 0;
        }
        .price {
            color: #fd6b3e;
            display: inline;
        }
        .button {
            width: 262upx;
            color: #fff;
            text-align: center;
            background: #fd6b3e;
        }
    }
</style>