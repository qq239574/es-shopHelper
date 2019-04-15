<template>
    <view class='provide-goods'>
        <view class="grace-items">
            <image class='cart-icon' src='/static/img/global/cart.png'></image>
            <view class="grace-label">发货商品</view>
            <view class='address'>{{address}}</view>
        </view>
        <view class='card--good'>
            <radio-group name="danxuan" @change='changeSelect'>
                <view class="card--good-item" v-for='(item,index) in tmpgoodsList' :key='index' @click='clickGood(item)'>
                    <view class='radio-box'>
                        <radio class='radio' :value="index" color='#fd6b3e' v-show='!item.status'></radio>
                    </view>
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
                            <view class="status" v-show='item.status'>已发货</view>
                        </view>
                    </view>
                </view>
            </radio-group>
        </view>
    </view>
</template>

<script>
    import {
        number_format
    } from '../../components/my-components/formater.js'
    export default {
        methods: {
            changeSelect(val) {
                console.log(val)
            },
            clickGood(item) {
                console.log('object,item', item)
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
        data() {
            return {
                defaultIndex: 1,
                tmpgoodsList: [{
                    img: '/static/img/global/tmp.png',
                    goodName: '翻页蓝色的空间疯狂大富科技上来看饭店经理看时间对方离开时间slikfjsdfklklsjfdlkjslkdjfl',
                    color: '浅绿色',
                    size: 'S码',
                    num: 2,
                    price: '15455.2',
                    status: 0, //0未发货
                }, {
                    img: '/static/img/global/tmp.png',
                    goodName: '翻页蓝色的空间疯狂大富科技上来看饭店经理看时间对方离开时间',
                    color: '浅绿色',
                    size: 'S码',
                    num: 2,
                    price: '152344.2',
                    status: 1, //已发货
                }]
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
                        }, {
                            img: '/static/img/global/tmp.png',
                            goodName: '翻页蓝色的空间疯狂大富科技上来看饭店经理看时间对方离开时间',
                            color: '浅绿色',
                            size: 'S码',
                            num: 2,
                            price: '152344.2'
                        }, {
                            img: '/static/img/global/tmp.png',
                            goodName: '翻页蓝色的空间疯狂大富科技上来看饭店经理看时间对方离开时间',
                            color: '浅绿色',
                            size: 'S码',
                            num: 2,
                            price: '1533334'
                        }]
                    }]
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .provide-goods {
        background: #fff;
        margin:20upx auto; 
        .grace-items {
            display: flex;
            justify-content: flex-start;
            flex-wrap: nowrap;
            height:88upx;
            width:100%;
            border-bottom: 1upx solid #eee;
            .cart-icon {
                width: 36upx;
                height: 28upx;
                margin:30upx 20upx 0;
            }
            view{
                height:100%;
                line-height: 88upx;
                font-size: 28upx;
                font-weight: 600;
            }
        }
        .card--good {
            width: 710upx;
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
                    margin-right: 20upx;
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
                        .status {
                            height: 31upx;
                            line-height: 31upx;
                            box-sizing: border-box;
                            color: #fff;
                            background: #9da3ae;
                            font-weight: 500;
                            font-size: 20upx;
                            padding: 0 10upx;
                            border-radius: 4upx;
                        }
                    }
                }
            }
            .radio-box {
                width: 54upx;
                height: 54upx;
                .radio {
                    width: 54upx;
                    height: 54upx;
                    margin-top: 44upx;
                }
            }
        }
    }
</style>