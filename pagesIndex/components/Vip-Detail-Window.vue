<template>
    <view class='vip-detail-win'>
        <view class="center">
            <view class="image">
                <image lazy-load :src='info.img'></image>
            </view>
            <view class="info">
                <view class="title">{{info.name}}</view>
                <view class="detail">
                    <view class="left">{{info.verification}}</view>
                    <view class="right">{{info.tel}}</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        props: {
            info: {
                type: Object,
                default: {
                    img: '',
                    name: '',
                    tel: '',
                    verification: '已验证'
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .vip-detail-win {
        width: 100%;
        height: 190upx;
        background: #203352;
        .center {
            height: 100%;
            width: 628upx;
            margin: auto;
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-between;
            .image,
            .info {
                height: 100%;
            }
            .image {
                width: 110upx;
                display: flex;
                image {
                    width: 110upx;
                    height: 110upx;
                    border-radius: 50%;
                    margin: auto;
                }
            }
            .info {
                width: 498upx;
                .title,
                .detail {
                    width: 100%;
                }
                .title {
                    font-size: 30upx;
                    height: 30upx;
                    line-height: 30upx;
                    color: #fff;
                    margin: 50upx 0 24upx;
                    font-weight: 600;
                }
                .detail {
                    display: flex;
                    flex-wrap: nowrap;
                    justify-content: flex-start;
                    height: 32upx;
                    view {
                        height: 32upx;
                        box-sizing: border-box;
                        line-height: 32upx;
                        font-size: 20upx;
                        color: #bdc8df;
                    }
                    .left {
                        width: 80upx;
                        height: 100%;
                        border: 1upx solid #bdc8df;
                        text-align: center;
                        border-radius: 4upx;
                        margin: 0 10upx 0 0;
                        line-height: 30upx;
                    }
                }
            }
        }
    }
</style>