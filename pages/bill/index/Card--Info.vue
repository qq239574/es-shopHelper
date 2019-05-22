<template>
    <view class='card--info' @click='clickBill'>
        <view class='card--info__row'>
            <view class='card--info__row__tile'>买家姓名：</view>
            <view class="card--info__row__name">{{info.name}}</view>
        </view>
        <view class='card--info__row'>
            <view class='card--info__row__tile'>配送方式：</view>
            <view class="card--info__row__name">{{info.provide}}</view>
        </view>
        <view class='card--info__row card--info__footer'>
            <view class='card--info__footer-item item1'>共{{info.num*1}}件商品</view>
            <view class='card--info__footer-item item2' :style='showPayType?"":"padding-right:0;"' :class='info.payType?"pay-type":""'>应付：
                <view class='card--info__footer-item__price'>￥{{formatePrice(info.pay)}}</view>(含运费:￥{{formatePrice(info.dispatch_price)}})
                <view class="imgBox" v-if='info.payTypeImg'>
                    <image lazy-load :src='info.payTypeImg'></image>
                </view>
            </view>
        </view>
        <view class="button-group" v-if='info.subStatus==0||info.subStatus==2'>
            <myButton @click='clickButton("备注")' :badge='info.addtion' v-if='Jurisdiction.order_manage'>备注</myButton>
            <myButton @click='clickButton("改价")' v-if='info.status=="0"&&Jurisdiction["order_change-price"]'>改价</myButton>
            <myButton type='primary' @click='clickButton("确认付款")' v-if='info.status=="0"&&Jurisdiction.order_manage'>确认付款</myButton>
            <myButton :type='canSendGood' @click='clickButton("确认发货")' v-if='info.status=="1"&&Jurisdiction.order_send'>确认发货</myButton>
            <myButton type='primary' @click='clickButton(info.payType==3?"确认收款":"确认收货")' v-if='info.status=="2"&&Jurisdiction.order_manage'>{{info.payType==3?"确认收款":"确认收货"}}</myButton>
        </view>
    </view>
</template>

<script>
    import myButton from '../../../components/my-components/RoundButton.vue';
    import {
        number_format
    } from '../../../components/my-components/formater.js'
    export default {
        components: {
            myButton
        },
        props: {
            Jurisdiction: {
                type: Object,
                default: {},
                required: true
            },
            info: {
                type: Object,
                default: () => ({
                    name: '',
                    provide: '',
                    num: 0,
                    pay: 0,
                    addtion: 0,
                    payType: 'wx',
                    subStatus: 0, //订单状态，1：维权
                    status: 0, ////0待付款,1代发货，2待收货，3已完成，4已关闭
                })
            }
        },
        computed: {
            canSendGood() { //判断可否发货
                if (this.info.groups_success == 1 || this.info.groups_success === undefined) {
                    return !!this.info.send_able ? "primary" : "disable"
                } else {
                    return "disable";
                }
            },
            showPayType() {
                return (this.info.status != 0 && this.info.status != 4) && this.info.payType == "wx"
            }
        },
        methods: {
            formatePrice(val) {
                return number_format(val, 2, '.', ',')
            },
            clickButton(val) {
                this.$emit('click', {
                    type: 'button',
                    detail: {
                        val
                    }
                })
            },
            clickBill() {
                this.$emit('click', {
                    type: 'info',
                    detail: {
                        val: this.info
                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .card--info {
        width: 670upx;
        margin: auto;
        border-top: 1upx solid #eee;
        .card--info__row {
            width: 100%;
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-between;
            margin-top: 10upx;
            view {
                font-size: 24upx;
                color: #33373a;
                width: fit-content;
            }
            .card--info__row__tile {
                color: #6e7685;
            }
            .card--info__row__name {
                font-weight: 700;
            }
            .item1 {
                font-size: 24upx;
                line-height: 74upx;
                width: fit-content;
            }
            .item2 {
                font-size: 24upx;
                line-height: 20upx;
                box-sizing: border-box;
                white-space: pre-wrap;
                word-break: break-all;
                .imgBox {
                    position: relative;
                    display: inline-block;
                    width: 30upx;
                    height: 30upx;
                    margin: 0 0 0 5upx;
                    image {
                        position: absolute;
                        width: 30upx;
                        height: 30upx;
                        top: 8upx;
                        right: 0;
                    }
                }
                &.pay-type {
                    padding-right: 32upx;
                }
            }
            .card--info__footer-item__price {
                display: inline;
                color: #fd6b3e;
                font-weight: 600;
                font-size: 34upx;
            }
        }
        .card--info__footer {
            margin: 10upx auto 10upx;
        }
        .button-group {
            display: flex;
            flex-wrap: nowrap;
            justify-content: flex-end;
            height: 91upx;
            width: 100%;
            my-button {
                margin: 0 0 0 20upx;
            }
        }
    }
</style>