<template>
    <view class="echarts-block" @click='clickModel'>
        <view class="echarts-header">
            <view class="echarts-header__title">{{info.title}}</view>
            <view class="echarts-header__money" v-if='info.subTitle'>{{info.subTitle}}</view>
        </view>
        <view class="echarts-box">
            <view class="title">
                <view class='title__day title__today'>今日
                    <view class="title__day__num">{{formater(info.today)}}</view>
                </view>
                <view class='title__day title__yesterday'>昨日
                    <view class="title__day__num">{{formater(info.yesterday)}}</view>
                </view>
            </view>
            <view class="canvasView">
                <slot></slot>
            </view>
        </view>
    </view>
</template>

<script>
    import {
        number_format
    } from '../../components/my-components/formater.js'
    import {
        setData
    }from '../../store/cache.js'
    export default {
        props: {
            info: {
                type: Object,
                default: {
                    title: '',
                    subTitle: "",
                    today: 0,
                    yesterday: 0
                }
            }
        },
        methods: {
            clickModel() {
                setData('echarts-detail',this.info);
                uni.navigateTo({
                    url: './moneyDetail'
                })
            },
            formater(num) {
                return number_format(num)
            }
        },
    }
</script>

<style lang="scss" scoped>
    .echarts-block {
        width: 704upx;
        margin: 0 auto 12upx;
        flex-wrap: wrap;
        height: fit-content;
        view {
            display: flex;
        }
        .echarts-header {
            width: 100%;
            height: 77upx;
            color: #000;
            font-weight: 500;
            line-height: 77upx;
            justify-content: space-between;
            flex-wrap: nowrap;
            padding: 0 16upx 0 9upx;
            box-sizing: border-box;
            >view {
                height: 100%;
                line-height: 77upx;
                font-size: 28upx;
            }
            .echarts-header__money {
                font-size: 24upx;
                color: #6f7685;
            }
        }
        .echarts-box {
            width: 100%;
            height: 205upx;
            border-radius: 12upx;
            background: #223455;
            position: relative;
            >.title {
                width: 320upx;
                height: 100%;
                flex-wrap: wrap;
                position: relative;
                >.title__day {
                    position: absolute;
                    height: 30upx;
                    line-height: 30upx;
                    width: 100%;
                    color: #fff;
                    font-size: 22upx;
                    box-sizing: border-box;
                    padding: 0 0 0 30upx;
                    font-weight: 400;
                    >.title__day__num {
                        font-size: 26upx;
                        font-weight: 600;
                        margin-left: 20upx;
                        color: #fff;
                        line-height: 26upx;
                    }
                }
                >.title__today {
                    top: 66upx;
                }
                >.title__yesterday {
                    bottom: 66upx;
                    color: #b8bbc6;
                    >.title__day__num {
                        font-size: 24upx;
                        font-weight: 600;
                    }
                }
            }
            >.canvasView {
                flex-direction: column;
                position: absolute;
                width: 338upx!important;
                height: 205upx!important;
                top: 0;
                right: 46upx;
                &:after {
                    position: absolute;
                    content: '';
                    background: linear-gradient(90deg, rgba(34, 52, 85, 1) 0, rgba(34, 52, 85, 0) 35%, rgba(34, 52, 85, 0) 75%, rgba(34, 52, 85, 1) 100%);
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                }
            }
        }
    }
</style>