<template>
    <view class='provide-goods'>
        <view class="grace-items">
            <image class='cart-icon' src='/static/img/global/cart.png'></image>
            <view class="grace-label">发货商品</view>
            <view class='address'></view>
        </view>
        <view class='card--good'>
            <!-- <radio-group name="danxuan" @change='changeSelect'> -->
            <view class="card--good-item" v-for='(item,index) in goodsList' :key='index' @click='clickGood(item,index)'>
                <view class='radio-box'>
                    <radio class='radio' :value="index" :checked='true' color='#fd6b3e' v-if='(!item.status&&!item.refund_type)&&defaultIndex[index]'></radio>
                    <radio class='radio' :value="index" :checked='false' color='#fd6b3e' v-if='(!item.status&&!item.refund_type)&&!defaultIndex[index]'></radio>
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
                        <view class="status" v-show='item.status&&!item.refund_type'>已发货</view>
                        <view class="status" v-show='item.refund_type'>维权中</view>
                    </view>
                </view>
            </view>
            <!-- </radio-group> -->
        </view>
    </view>
</template>

<script>
    import {
        number_format
    } from '../../components/my-components/formater.js'
    let cachelist = [];
    export default {
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
                        price: '0',
                        status: 0, //0未发货
                    }, ]
                }
            }
        },
        watch: {
            goodsList() {
                cachelist = this.goodsList.map(item => true);
                this.defaultIndex = [...cachelist];
            }
        },
        beforeMount() {
            cachelist = this.goodsList.map(item => true);
            this.defaultIndex = [...cachelist];
        },
        methods: {
            clickGood(item, index) {
                let tmp = cachelist[index];
                cachelist[index] = !tmp;
                this.$emit('click', this.goodsList.filter((item, index) => {
                    return cachelist[index] && !item.status&&!item.refund_type
                }));
                this.defaultIndex = [...cachelist];
            },
            formatePrice(val) {
                return number_format(val, 2, '.', ',')
            }
        },
        data() {
            return {
                defaultIndex: 1,
            }
        },
    }
</script>

<style lang="scss" scoped>
    .provide-goods {
        background: #fff;
        margin: 20upx auto;
        .grace-items {
            display: flex;
            justify-content: flex-start;
            flex-wrap: nowrap;
            height: 88upx;
            width: 100%;
            border-bottom: 1upx solid #eee;
            .cart-icon {
                width: 36upx;
                height: 28upx;
                margin: 30upx 20upx 0;
            }
            view {
                height: 100%;
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