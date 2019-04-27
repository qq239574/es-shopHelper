<template>
    <view class='card--good'>
        <view class="card--good-item" @click='clickGood'>
            <view class="imgbox">
                <image :src='info.img'></image>
            </view>
            <view class="good-info">
                <view class="good-name van-multi-ellipsis--l2">
                    {{info.goodName}}
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        methods: {
            clickGood() {
                this.$emit('click', {
                    type: 'good',
                    detail: {
                        ...this.info
                    }
                })
            }
        },
        props: {
            info: {
                type: Object,
                default () {
                    return {
                        img: '',
                        goodName: '',
                        color: '',
                        size: '',
                        num: 0,
                    }
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .card--good {
        width: 100%;
        margin: auto;
        padding: 5upx 0 15upx;
        height: fit-content;
        background: #fcfcfc;
        .card--good-item {
            width: 100%;
            height: 150upx;
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-between;
            .imgbox {
                width: 120upx;
                height: 100%;
                margin-left:20upx;
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
                box-sizing: border-box;
                padding-right: 20upx;
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