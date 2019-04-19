<template>
    <view class='card--good'>
        <view class="card--good-item" v-for='(item,index) in goodsList' :key='index' @click='clickGood(item)'>
            <view class="imgbox">
                <image :src='item.img'></image>
            </view>
            <view class="good-info">
                <view class="good-name van-multi-ellipsis--l2">
                    {{item.goodName}}
                </view>
                <view class="good-others">
                    <view class="color">
                        <view>{{item.color+' '+item.size}}</view>
                        <view style='color:#fb6638;'> x {{item.num}}</view>
                    </view>
                    <view class="price">￥{{formatePrice(item.price)}}</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import {
        number_format
    } from '../../../components/my-components/formater.js'
    export default {
        methods: {
            clickGood(item) {
                this.$emit('click', {
                    type: 'good',
                    detail: {
                        val: item
                    }
                })
            },
            formatePrice(val) {
                return number_format(val, 2, '.', ',')
            }
        },
        props: {
            goodsList: {
                type: Array,
                default () {
                    return [{
                        info: {
                            name: '张三',
                            provide: '到店自提',
                            num: 4,
                            pay: 2165653.453,
                        },
                        bill: {
                            billId: 'ES204565656526265656565',
                            billDate: '2018-05-12 15:23:12',
                            billType: 0 //订单类型，0：分销订单，1：普通订单
                        },
                        goodsList: [{
                            img: '/static/img/global/tmp.png',
                            goodName: '翻页蓝色的空间疯狂大富科技上来看饭店经理看时间对方离开时间slikfjsdfklklsjfdlkjslkdjfl',
                            color: '浅绿色',
                            size: 'S码',
                            num: 2,
                            price: '15455.2'
                        }]
                    }]
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .card--good {
        width: 670upx;
        margin: auto;
        padding: 5upx 0 15upx;
        height: fit-content;
        .card--good-item {
            width: 100%;
            height: 150upx;
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-between;
            .imgbox {
                width: 120upx;
                height: 100%;
                border-radius: 6upx;
                overflow: hidden;
                image {
                    width: 100%;
                    height: 120upx;
                    margin: 15upx 0;
                }
            }
            .good-info {
                height: 100%;
                width: 527upx;
                padding: 23upx 0 0;
                .good-name {
                    width: 100%;
                    font-size: 28upx;
                    line-height: 36upx;
                }
                .good-others {
                    width: 100%;
                    flex-wrap: nowrap;
                    display: flex;
                    margin: 10upx 0 0;
                    justify-content: space-between;
                    view {
                        font-size: 24upx;
                        color: #6e7685;
                        width: fit-content;
                        line-height: 28upx;
                    }
                    .color {
                        display: flex;
                        flex-wrap: nowrap;
                        width: fit-content;
                        view {
                            margin: 0 8upx 0 0;
                            line-height: 32upx;
                        }
                    }
                    .price {
                        color: #000;
                        font-weight: 600;
                        font-size: 28upx;
                        padding: 0 10upx;
                    }
                }
            }
        }
    }
</style>