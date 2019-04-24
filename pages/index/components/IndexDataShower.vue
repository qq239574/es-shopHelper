<template>
    <view class='index-data-shower'>
        <view class="box">
            <image src='/static/img/global/my_bg.png'></image>
            <view class="moneybox childbox" @click='clickItem'>
                <view class="title">成交额（元）</view>
                <view class="num">{{formater(info.money,2)}}</view>
            </view>
            <view class="buttonbox childbox">
                <view class="day today" :class='activeButton==0?"active":""' @click='clickButton(0,"今天","today")'>今天</view>
                <view class="day yesterday" :class='activeButton==1?"active":""' @click='clickButton(1,"昨天","yesterday")'>昨天</view>
                <view class="day sevenday" :class='activeButton==2?"active":""' @click='clickButton(2,"七日","7day")'>七日</view>
            </view>
            <view class="datalist childbox" @click='clickItem'>
                <view class="item">
                    <view class="title">付款订单数</view>
                    <view class="num">{{formater(info.payedBill,0)}}</view>
                </view>
                <view class="item">
                    <view class="title">付款商品数</view>
                    <view class="num">{{formater(info.payedGood,0)}}</view>
                </view>
                <view class="item">
                    <view class="title">付款会员数</view>
                    <view class="num">{{formater(info.payedVip,0)}}</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import buttonGroup from '../../../components/my-components/ButtonGroup'
    import {
        number_format
    } from '../../../components/my-components/formater.js'
    export default {
        props: {
            info: {
                type: Object,
                default: {
                    money: 0,
                    payedBill: 0,
                    payedGood: 0,
                    payedVip: 0
                }
            }
        },
        components: {
            buttonGroup
        },
        data() {
            return {
                activeButton: 0, //0今天，1昨天，2七日
            }
        },
        methods: {
            formater(val, decimals) { //数字格式化
                return number_format(val, decimals, '.', ',');
            },
            clickButton(num, name, val) {
                this.activeButton = num;
                this.$emit('search', {
                    index: num,
                    name,
                    value: val
                })
            },
            clickItem() {
                this.$emit('click', {
                    title: '数据统计'
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .index-data-shower {
        width: 100%;
        height: 330upx;
        .box {
            width: 702upx;
            height: 100%;
            margin: auto;
            border-radius: 10upx;
            overflow: hidden;
            position: relative;
            image {
                width: 100%;
                height: 100%；
            }
            .childbox {
                position: absolute;
            }
            .moneybox {
                top: 48upx;
                left: 48upx;
                .title {
                    line-height: 26upx;
                    font-size: 26upx;
                    color: #bdc8df;
                }
                .num {
                    line-height: 48upx;
                    font-size: 48upx;
                    color: #fff;
                    font-weight: 600;
                    margin: 28upx 0 0 0;
                }
            }
            .buttonbox {
                top: 38upx;
                right: 24upx;
                width: 252upx;
                height: 48upx;
                box-sizing: border-box;
                border: 1upx solid #bdc8df;
                display: flex;
                justify-content: space-around;
                flex-wrap: nowrap;
                border-radius: 24upx;
                overflow: hidden;
                view {
                    font-size: 24upx;
                    line-height: 46upx;
                    height: 100%;
                    text-align: center;
                    color: #bdc8df;
                }
                .active {
                    background: #bdc8df;
                    color: #2d3b65
                }
                .yesterday {
                    width: 78upx;
                    box-sizing: border-box;
                    border-left: 1upx solid #bdc8df;
                    border-right: 1upx solid #bdc8df;
                }
                .today {
                    width: 88upx;
                    padding: 0 0 0 8upx;
                }
                .sevenday {
                    width: 88upx;
                    padding: 0 8upx 0 0;
                }
            }
            .datalist {
                left: 48upx;
                bottom: 0;
                height: 116upx;
                display: flex;
                justify-content: space-around;
                flex-wrap: nowrap;
                .item {
                    height: 100%;
                    width: 228upx;
                    .title {
                        line-height: 22upx;
                        font-size: 22upx;
                        color: #bdc8df;
                    }
                    .num {
                        line-height: 38upx;
                        font-size: 38upx;
                        color: #fff;
                        font-weight: 500;
                        margin: 16upx 0 0 0;
                    }
                }
            }
        }
    }
</style>