<template>
    <view class='card--vip'>
        <view class="card--vip-item" v-for='(item,index) in vipsList' :key='index' >
            <view class="imgbox" @click.stop='clickItem(index,item)'>
                <image :src='item.img'></image>
            </view>
            <view class="vip-info" @click.stop='clickItem(index,item)'>
                <view class="vip-name van-multi-ellipsis--l2">
                    {{item.title}}
                </view>
                <view class="vip-others">
                    <view class="color">
                        <view class='vip-class'>{{item.vipClass}}</view>
                        <view>{{item.tel}}</view>
                        <view>余额：{{item.money}}</view>
                        <view>积分：{{item.score}}</view>
                    </view>
                </view>
            </view>
            <view class="menu" @click='showMenu(index)'>
                <view class="point"></view>
            </view>
            <view class="model" v-if='menuIndex==="vip-"+index' @click.stop='showMenu("")'>
                <view class="item" @click.stop='clickMenuItem(index,item,"查看")'>
                    <image class='img' src='/static/img/global/product_share_link.png'></image>
                    <view class='title'>查看</view>
                </view>
                <view class="item" @click.stop='clickMenuItem(index,item,"充值")' v-if='Jurisdiction.member_list_manage'>
                    <image class='img' src='/static/img/global/product_share_link.png'></image>
                    <view class='title'>充值</view>
                </view>
                <view class="item" @click.stop='clickMenuItem(index,item,"订单")' v-if='Jurisdiction.member_list_manage'>
                    <image class='img' src='/static/img/global/product_share_link.png'></image>
                    <view class='title'>订单</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import {
        number_format
    } from '../../components/my-components/formater.js'
    export default {
        data() {
            return {
                menuIndex: '',
            }
        },
        props: {
             Jurisdiction:{
                type:Object,
                default:{},
                required:true
            },
            toggle: {
                type: Boolean,
                default: true
            },
            vipsList: {
                type: Array,
                default: [{
                    img: '/static/img/global/home_order_tobepay.png',
                    title: '',
                    vipClass: '会员',
                    tel: 1524516566,
                    money: 0,
                    score: 0
                }]
            }
        },
        watch: {
            toggle() {
                this.menuIndex = ''
            }
        },
        methods: {
            showMenu(vipindex) {
                this.menuIndex = 'vip-' + vipindex;
            },
            clickItem(vipindex, item) {
                this.$emit('click', {
                    type: 'item',
                    detail: {
                        vipIndex: vipindex,
                        ...item
                    }
                })
            },
            clickMenuItem(vipindex, item, name) {
                this.menuIndex = '';
                this.$emit('click', {
                    type: 'menu-item',
                    name: name,
                    detail: {
                        vipIndex: vipindex,
                        ...item
                    }
                })
            },
            formatePrice(val) {
                return number_format(val, 2, '.', ',')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .card--vip {
        width: 710upx;
        margin: 0 auto 20upx;
        box-sizing: border-box;
        height: fit-content;
        min-height: 210upx;
        .card--vip-item {
            position: relative;
            width: 100%;
            min-height: 210upx;
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
            .vip-info {
                height: 100%;
                width: 390upx;
                padding: 13upx 0 0;
                .vip-name {
                    width: 100%;
                    font-size: 26upx;
                    line-height: 36upx;
                }
                .vip-others {
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
                        flex-wrap: wrap;
                        width: fit-content;
                        view {
                            min-width: 40%;
                            margin: 0 36upx 0 0;
                            line-height: 44upx;
                        }
                        .vip-class {
                            height: 36upx;
                            padding: 0 16upx;
                            color: #fff;
                            text-align: center;
                            background: linear-gradient(90deg, #bd8e61, #d4b18f);
                            font-size: 20upx;
                            line-height: 36upx;
                            border-radius: 18upx;
                        }
                    }
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
                        bottom: 30upx;
                        font-size: 24upx;
                        color: #c5cede;
                    }
                }
            }
        }
    }
</style>