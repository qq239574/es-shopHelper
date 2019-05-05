<template>
    <view class='card--info' @click='clickBill'>
        <view class='card--info__row'>
            <view class='card--info__row__tile'>核销时间：</view>
            <view>{{info.time}}</view>
        </view>
        <view class='card--info__row'>
            <view class='card--info__row__tile'>姓名：</view>
            <view>{{info.name}}</view>
        </view>
        <view class='card--info__row'>
            <view class='card--info__row__tile'>联系电话：</view>
            <view>{{info.tel}}</view>
        </view>
        <view class="button-group">
            <view class="content">共{{info.num}}个商品，实付
                <view class='money'>￥{{formatePrice(info.pay)}}</view>
            </view>
        </view>
    </view>
</template>

<script>
    import myButton from '../../components/my-components/RoundButton';
    import {
        number_format
    } from '../../components/my-components/formater.js'
    export default {
        components: {
            myButton
        },
        props: {
            info: {
                type: Object,
                default: () => ({
                    name: '',
                    provide: '',
                    time: '',
                    tel: '',
                    num: 0,
                    pay: 0,
                    subStatus: 0, //订单状态，1：维权
                    status: 0, ////0代付款,1代发货，2待收货，3已完成，4已关闭
                })
            }
        },
        computed: {
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
            .item1 {
                font-size: 24upx;
                line-height: 74upx;
            }
            .item2 {
                font-size: 24upx;
                line-height: 20upx;
                position: relative;
                image {
                    position: absolute;
                    display: inline-block;
                    width: 30upx;
                    height: 30upx;
                    top: 24upx;
                    right: 0;
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
            border-top:1upx solid #eee;
            margin-top:20upx;
           .content{
               white-space: nowrap;
               line-height: 91upx;
               font-size: 26upx;
               color:#6e7685;
               .money{
                   display: inline;
                   font-size: 26upx;
                   font-weight: 700;
                   color:#fd463e;
               }
           }
        }
    }
</style>