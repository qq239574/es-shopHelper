<template>
    <view class='card--good'>
        <view class='card--good-items' :class='(item.rightsType||0)>0?"righting":""' v-for='(item,index) in goodsList' :key='index' @click='clickGood(item)'>
            <view class="card--good-item">
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
            <view class='card--info__row' v-if='(item.rightsType||0)>0'>
                <view class='card--info__row__tile'>维权状态</view>
                <view class='card--info__row__status'>{{item.rightsTypeText}}</view>
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
        padding: 5upx 0 ;
        height: fit-content;
        .card--good-items {
            &.righting {
                background: #f4f4f4;
                border-radius: 8upx;
                overflow: hidden;
                margin-bottom:5upx;
            }
            width: 100%;
            padding: 0 15upx;
            .card--good-item {
                width: 100%;
                height: fit-content;
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
                    width: 500upx;
                    padding: 23upx 0 0;
                    .good-name {
                        width: 100%;
                        font-size: 28upx;
                        line-height: 36upx;
                        height: 72upx;
                        overflow: hidden;
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
                            padding: 0 0;
                        }
                    }
                }
            }
        }
        .card--info__row {
            width: 100%;
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-between;
            overflow: hidden;
            box-sizing: border-box;
            padding: 5upx 10upx 5upx 145upx;
            background: #f4f4f4;
            border-radius: 6upx;
            border-top:1upx solid #ededed;
            view {
                font-size: 24upx;
                color: #33373a;
                width: fit-content;
            }
            .card--info__row__tile {
                color: #6e7685;
            }
            .card--info__row__status {
                color: #fd6b3e;
            }
        }
    }
</style>