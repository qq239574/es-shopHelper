<template>
    <view class='index-top'>
        <view class="echarts-header">
            <view class="echarts-header__title">排行榜</view>
        </view>
        <view class="rankList">
            <view class="rank__item top-goods" @click='toTop("goods")'>
                <image lazy-load src='/static/img/global/date_shop.png'></image>
                <view class="title">TOP商品</view>
                <view class="button">点击查看</view>
            </view>
            <view class="rank__item top-vip" @click='toTop("vip")'>
                <image lazy-load src='/static/img/global/date_vip.png'></image>
                <view class="title">TOP会员</view>
                <view class="button">点击查看</view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        methods: {
            toTop(val) {
                this.Cacher.setData('dataGraph', {
                    from: 'dataGraph',
                    show: val
                })
                uni.navigateTo({
                    url: './toper?from=dataGraph'
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
    .index-top {
        width: 100%;
        flex-wrap: wrap;
        margin: 10upx auto 0;
        justify-content: space-around;
        .echarts-header {
            width: 710upx;
            height: 77upx;
            color: #000;
            font-weight: 500;
            line-height: 77upx;
            justify-content: space-between;
            flex-wrap: nowrap;
            padding: 0 16upx 0 9upx;
            box-sizing: border-box;
            >view {
                height: 100%;
                line-height: 77upx;
                font-size: 28upx;
            }
            .echarts-header__money {
                font-size: 24upx;
                color: #6f7685;
            }
        }
        .rankList {
            width: 704upx;
            height: 262upx;
            margin: 0 auto 140upx;
            ;
            flex-wrap: nowrap;
            justify-content: space-between;
            display: flex;
            >.rank__item {
                width: 340upx;
                height: 100%;
                border-radius: 11upx;
                position: relative;
                image {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                }
                >.title {
                    color: #fff;
                    font-size: 28upx;
                    font-weight: 600;
                    line-height: 66upx;
                    top: 7upx;
                    left: 22upx;
                    position: absolute;
                    height: fit-content;
                }
                >.button {
                    position: absolute;
                    width: 120upx;
                    height: 38upx;
                    background: rgba(255, 255, 255, .2);
                    line-height: 38upx;
                    position: relative;
                    box-sizing: border-box;
                    padding: 0 27upx 0 15upx;
                    border-radius: 19upx;
                    font-size: 20upx;
                    color: #fff;
                    top: 72upx;
                    left: 22upx;
                    &:after {
                        position: absolute;
                        height: 0;
                        width: 0;
                        content: '';
                        border: 7upx solid #fff;
                        border-top: 7upx solid rgba(0, 0, 0, 0);
                        border-right: 7upx solid rgba(0, 0, 0, 0);
                        border-bottom: 7upx solid rgba(0, 0, 0, 0);
                        right: 4upx;
                        top: 0;
                        bottom: 0;
                        margin: auto;
                    }
                }
            }
        }
    }
</style>