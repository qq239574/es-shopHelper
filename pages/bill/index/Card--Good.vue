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
                        img: '/static/img/global/tmp.png',
                        goodName: '',
                        color: '',
                        size: '',
                        num: 0,
                        price: '',
                        specifications: 'single', //单规格，multi多规格
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
                    height:72upx;
                    overflow:hidden;
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