<template>
    <view class="coupon-item">
        <view class="border">
            <view class="top">
                <view class="title">{{info.name}}</view>
                <view class="money">
                    ￥
                    <view class="num">{{info.price}}</view>
                </view>
            </view>
            <view class="bottom">{{info.info}}</view>
        </view>
        <view class="buttons">
            <graceNumberBox @change='change' :value='info.num'></graceNumberBox>
        </view>
    </view>
</template>

<script>
    import graceNumberBox from "../../components/my-components/Number-Box.vue";
    export default {
        props: {
            info: {
                type: Object,
                default: {
                    name: '女神节专享通用优惠券',
                    price: 20,
                    info: '部分商品满100减20',
                    num: 0
                }
            }
        },
        components: {
            graceNumberBox
        },
        methods: {
            change(num) {
                this.$emit('change', Object.assign(this.info, {
                    num: num[0]
                }))
            }
        },
    }
</script>

<style lang="scss" scoped>
    .coupon-item {
        display: flex;
        flex-wrap: nowrap;
        justify-content: flex-start;
        margin-bottom: 20upx;
        .border {
            width: 540upx;
            height: 220upx;
            box-sizing: border-box;
            border-radius: 11upx;
            overflow: hidden;
            position: relative;
            background: #fef8f8;
            margin: 0 24upx 0 20upx;
            .top,
            .bottom {
                width: 510upx;
                box-sizing: border-box;
                position: absolute;
                left: 15upx;
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
        .buttons {
            margin: auto 0;
        }
    }
</style>