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
                        <view>库存:{{item.num}}</view>
                        <view>销量:{{item.saled}}</view>
                    </view>
                </view>
                <view class="price">￥{{formatePrice(item.price)}}</view>
            </view>
            <view class="menu" @click='showMenu(index)'>
                <view class="point"></view>
            </view>
            <view class="model" v-if='menuIndex==="good-"+index' @click.stop='showMenu("")'>
                <view class="item" @click.stop='clickMenuItem(index,item,"编辑")'>
                    <image class='img' src='/static/img/global/product_share_download.png'></image>
                    <view class='title'>编辑</view>
                </view>
                <view class="item" @click.stop='clickMenuItem(index,item,"下架")'>
                    <image class='img' src='/static/img/global/product_share_download.png'></image>
                    <view class='title'>下架</view>
                </view>
                <view class="item" @click.stop='clickMenuItem(index,item,"删除")'>
                    <image class='img' src='/static/img/global/product_share_download.png'></image>
                    <view class='title'>删除</view>
                </view>
                <view class="item" @click.stop='clickMenuItem(index,item,"推广商品")'>
                    <image class='img' src='/static/img/global/product_share_download.png'></image>
                    <view class='title'>推广商品</view>
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
        data() {
            return {
                menuIndex: ''
            }
        },
        methods: {
            showMenu(goodindex) {
                this.menuIndex = 'good-' + goodindex;
            },
            clickMenuItem(goodindex, item, name) {
                this.menuIndex = '';
                this.$emit('click', {
                    type: 'menu-item',
                    name: name,
                    detail: {
                        goodIndex: goodindex,
                        ...item
                    }
                })
            },
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
                        goodName: '翻页蓝色的空间疯狂大富科技上来看饭店经理看时间对方离开时间slikfjsdfklklsjfdlkjslkdjfl',
                        color: '浅绿色',
                        size: 'S码',
                        num: 2,
                        price: '15455.2',
                        saled: 1
                    }, {
                        img: '/static/img/global/tmp.png',
                        goodName: '翻页蓝色的空间疯狂大富科技上来看饭店经理看时间对方离开时间',
                        color: '浅绿色',
                        size: 'S码',
                        num: 2,
                        price: '152344.2',
                        saled: 1
                    }, {
                        img: '/static/img/global/tmp.png',
                        goodName: '翻页蓝色的空间疯狂大富科技上来看饭店经理看时间对方离开时间',
                        color: '浅绿色',
                        size: 'S码',
                        num: 2,
                        price: '1533334',
                        saled: 1
                    }]
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .card--good {
        width: 710upx;
        margin: 0 auto 20upx;
        box-sizing: border-box;
        height: fit-content;
        min-height: 200upx;
        .card--good-item {
            position: relative;
            width: 100%;
            min-height: 160upx;
            height: fit-content;
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-between;
            background: #fff;
            margin: 0 auto 20upx;
            box-sizing: border-box;
            padding: 20upx 20upx 0;
            border-radius: 6upx;
            overflow: hidden;
            .imgbox {
                width: 160upx;
                height: 100%;
                overflow: hidden;
                display: flex;
                margin-top: 5upx;
                image {
                    border-radius: 6upx;
                    width: 100%;
                    height: 160upx;
                    margin: auto;
                }
            }
            .good-info {
                height: 100%;
                width: 390upx;
                padding: 13upx 0 0;
                .good-name {
                    width: 100%;
                    font-size: 26upx;
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
                            margin: 0 36upx 0 0;
                            line-height: 32upx;
                        }
                    }
                }
                .price {
                    color: #f1495c;
                    font-weight: 600;
                    font-size: 28upx;
                    margin-bottom: 10upx;
                }
            }
            .menu {
                width: 59upx;
                height: 34upx;
                box-sizing: border-box;
                border-radius: 1upx solid #eee;
                border-radius: 17upx;
                display: flex;
                border: 1upx solid #dbdbdb;
                line-height: 32upx;
                flex-wrap: nowrap;
                justify-content: space-between;
                padding: 0 11upx;
                margin: auto 0;
                .point {
                    width: 6upx;
                    height: 6upx;
                    box-sizing: border-box;
                    border: 1upx solid #666;
                    border-radius: 50%;
                    margin: auto;
                }
                &:after,
                &:before {
                    content: '';
                    width: 6upx;
                    height: 6upx;
                    box-sizing: border-box;
                    border: 1upx solid #666;
                    border-radius: 50%;
                    margin: auto;
                }
            }
            .model {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                background: rgba(0, 0, 0, .5);
                display: flex;
                flex-wrap: nowrap;
                justify-content: space-around;
                box-sizing: border-box;
                padding: 0 60upx;
                .item {
                    width: 63upx;
                    height: 100%;
                    position: relative;
                    .img {
                        width: 100%;
                        height: 63upx;
                        margin-top: 48upx;
                    }
                    .title {
                        color: #fff;
                        white-space: nowrap;
                        width: fit-content;
                        text-align: center;
                        left: 50%;
                        transform: translate(-50%, 0);
                        position: absolute;
                        bottom: 40upx;
                        font-size: 24upx;
                        color: #c5cede;
                    }
                }
            }
        }
    }
</style>