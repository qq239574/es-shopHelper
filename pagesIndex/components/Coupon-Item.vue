<template>
    <view class='coupon-items'>
        <view class='coupon-item' v-for='(item,index) in list' :key='index'>
            <view class="border">
                <view class="top">
                    <view class="title">{{item.name}}</view>
                    <view class="money">
                        ￥
                        <view class="num">{{item.price}}</view>
                    </view>
                </view>
                <view class="bottom">{{item.info}}</view>
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
                    name: '女神节专享通用优惠券',
                    price: 20,
                    info: '部分商品满100减20', 
                }]
            }
        },
        methods: {},
    }
</script>

<style lang="scss" scoped>
    .coupon-item {
        width: 665upx;
        height: 217upx;
        margin: 0 auto 20upx;
        position: relative;
        overflow: hidden;
        .border {
            width: 665upx;
            box-sizing: border-box;
            border: 1upx solid #fb6638;
            border-radius: 11upx;
            overflow: hidden;
            position: relative;
            background: #fef8f8;
            height: 217upx;
            .top,
            .bottom {
                width: 100%;
                box-sizing: border-box;
                position: absolute;
                left: 0;
            }
            .top {
                padding: 28upx 40upx 0;
                .title {
                    font-size: 29upx;
                    height: 29upx;
                    line-height: 29upx;
                    margin: 0 0 24upx;
                    font-weight: 600;
                    color: #333;
                }
                .money {
                    font-size: 20upx;
                    height: 45upx;
                    line-height: 45upx;
                    margin: 0 0 24upx;
                    font-weight: 600;
                    color: #fb6638;
                    .num {
                        font-size: 45upx;
                        height: 45upx;
                        line-height: 45upx;
                        font-weight: 700;
                        display: inline;
                        color: #fb6638;
                    }
                }
            }
            .bottom {
                height: 66upx;
                bottom: 0;
                line-height: 66upx;
                padding: 0 40upx;
                font-size: 24upx;
                color: #9da3ae;
                border-top: 1upx dashed #fddbd2;
            }
        }
        &:before,
        &:after {
            background: #fff;
            content: '';
            position: absolute;
            width: 40upx;
            height: 40upx;
            border-radius: 50%;
            border: 1upx solid #fb6638;
            bottom: 46upx;
            z-index: 10;
        }
        &:before {
            left: -20upx;
        }
        &:after {
            right: -20upx;
        }
    }
</style>