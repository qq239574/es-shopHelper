<template>
    <view class='goods-block'>
        <view class="block">
            <view class="goodsList">
                <view class="item item1" @click='click(0)'>
                    <image lazy-load src='/static/img/global/home_order_after.png'></image>
                    <view class="status">待发货</view>
                    <view class="num">{{list[0].num}}</view>
                </view>
                <view class="item item2" @click='click(1)'>
                    <image lazy-load src='/static/img/global/home_order_tobepay.png'></image>
                    <view class="status">待付款</view>
                    <view class="num">{{list[1].num}}</view>
                </view>
                <view class="item item3" @click='click(2)'>
                    <image lazy-load src='/static/img/global/home_order_tobesend.png'></image>
                    <view class="status">维权订单</view>
                    <view class="num">{{list[2].num}}</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        props: {
            list: {
                type: Array,
                default: [{
                    name: '待发货',
                    num: 0,
                    cateid: 1
                }, {
                    name: '待付款',
                    num: 0,
                    cateid: 0
                }, {
                    name: '维权订单',
                    num: 0
                }, ]
            }
        },
        methods: {
            click(item) {
                this.$emit('click', this.list[item])
            }
        },
    }
</script>

<style lang="scss" scoped>
    .goods-block {
        width: 100%;
        .block {
            box-sizing: border-box;
            background: #fff;
            width: 704upx;
            height: 220upx;
            margin: 24upx auto 0;
            border-radius: 8upx;
            .goodsList {
                box-sizing: border-box;
                width: 100%;
                height: 100%;
                display: flex;
                flex-wrap: nowrap;
                .item {
                    view {
                        width: 100%;
                        text-align: center;
                        margin: 0 auto;
                    }
                    image {
                        width: 85upx;
                        height: 85upx;
                        display: block;
                        margin: 20upx auto;
                    }
                    .status {
                        font-size: 24upx;
                        line-height: 24upx;
                        height: 24upx;
                        color: #6e7685;
                    }
                    .num {
                        font-size: 30upx;
                        line-height: 30upx;
                        height: 30upx;
                        color: #33373a;
                        margin-top: 16upx;
                        font-weight: 600;
                    }
                }
                .item1,
                .item3 {
                    width: 218upx;
                    height: 100%;
                }
                .item2 {
                    width: 254upx;
                    position: relative;
                    &::before,
                    &::after {
                        content: '';
                        position: absolute;
                        height: 150upx;
                        width: 0;
                        border-left: 1upx solid #f3f5f9;
                        top: 36upx;
                    }
                    &::after {
                        right: 0;
                    }
                }
            }
        }
    }
</style>