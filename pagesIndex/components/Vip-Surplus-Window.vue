<template>
    <view class='vip-detail-win'>
        <view class="center">
            <image lazy-load src='/static/img/global/wechat.png'></image>
            <view class="name">小花花买花花</view>
        </view>
    </view>
</template>

<script>
    export default {}
</script>

<style lang="scss" scoped>
    .vip-detail-win {
        width: 100%;
        height: 210upx;
        background: #203352;
        .center {
            height: 100%;
            width: 628upx;
            margin: auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            image {
                width: 110upx;
                height: 110upx;
                border-radius: 50%;
                margin: 10upx auto 0;
            }
            .name {
                width: 100%;
                height: 28upx;
                color: #fff;
                font-size: 28upx;
                line-height: 28upx;
                text-align: center;
            }
        }
    }
</style>