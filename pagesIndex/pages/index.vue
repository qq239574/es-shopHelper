<template>
    <view class="echarts page">
        <view class="echarts-block">
            <view class="echarts-header">
                <view class="echarts-header__title">成交额（元）</view>
                <view class="echarts-header__money">累计总成成交额：5,000,000.00</view>
            </view>
            <view class="echarts-box">
                <view class="title">
                    <view class='title__day title__today'>今日
                        <view class="title__day__num">1,111.00</view>
                    </view>
                    <view class='title__day title__yesterday'>昨日
                        <view class="title__day__num">222.00</view>
                    </view>
                </view>
                <view class="canvasView">
                    <mpvue-echarts class="ec-canvas" :onInit="lineInit" canvasId="line" ref="lineChart" />
                </view>
            </view>
        </view>
        <view class="rankList">
            <view class="rank__item top-goods">
                <image lazy-load src='/static/img/global/date_shop.png'></image>
                <view class="title">TOP商品</view>
                <view class="button">点击查看</view>
            </view>
            <view class="rank__item top-vip">
                <image lazy-load src='/static/img/global/date_vip.png'></image>
                <view class="title">TOP会员</view>
                <view class="button">点击查看</view>
            </view>
        </view>
    </view>
</template>

<script>
    import * as echarts from '../../components/echarts/echarts.simple.min.js';
    import mpvueEcharts from '../../components/mpvue-echarts/src/echarts.vue';
    const cityList = [{
        value: 55,
        name: '北京'
    }, {
        value: 38,
        name: '上海'
    }, {
        value: 20,
        name: '广州'
    }];
    let pieOption = {
        animation: false,
        backgroundColor: '#F8F8F8',
        color: ['#37A2DA', '#32C5E9', '#67E0E3', '#91F2DE', '#FFDB5C', '#FF9F7F'],
        series: [{
            label: {
                normal: {
                    fontSize: 14
                }
            },
            type: 'pie',
            center: ['50%', '50%'],
            radius: [0, '60%'],
            data: [],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 2, 2, 0.3)'
                }
            }
        }]
    };
    let lineOption = {
        animation: true,
        color: ['#fff'],
        grid: {
            x: 0,
            x2: 0,
            y: 0,
            y2: 0,
            // show:false
        },
        calculable: false,
        xAxis: [{
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            show: false
        }],
        yAxis: [{
            type: 'value',
            show: false,
            splitArea: {
                show: true
            }
        }],
        series: [{
            name: '蒸发量',
            type: 'line',
            smooth: true,
            symbol: "none",
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        }]
    };
    export default {
        data() {
            return {
                // echarts: echarts,
                updateStatus: false,
                dataList: [{
                    title: '成交额（元）',
                    subTitle:'累计总成成交额：5,000,000.00',
                    today: 15000000,
                    yesterday: 1336588,
                    x: [],
                    y: []
                },]
            }
        },
        onLoad() {
            pieOption.series[0].data = cityList.slice(0);
        },
        methods: {
            goBrowser() {
                // #ifdef APP-PLUS
                plus.runtime.openURL('https://github.com/F-loat/mpvue-echarts');
                // #endif
                // #ifdef MP-WEIXIN
                uni.showModal({
                    content: '请复制链接在浏览器里打开',
                    showCancel: false
                })
                // #endif
            },
            lineInit(canvas, width, height) {
                echarts.setCanvasCreator(() => canvas);
                let lineChart = echarts.init(canvas, null, {
                    width: width,
                    height: height
                })
                canvas.setChart(lineChart)
                lineChart.setOption(lineOption)
                return lineChart
            }
        },
        components: {
            mpvueEcharts
        }
    }
</script>

<style lang='scss'>
    .echarts {
        background: #fff;
        view {
            display: flex;
        }
        .echarts-block {
            width: 704upx;
            margin: 0 auto 12upx;
            flex-wrap: wrap;
            height: fit-content;
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
                .ec-canvas {
                    width: 100%!important;
                    height: 80%!important;
                    position: absolute;
                    top: 10%;
                }
            }
        }
        .rankList {
            width: 704upx;
            height: 262upx;
            margin: auto;
            flex-wrap: nowrap;
            justify-content: space-between;
            >.rank__item {
                width: 340upx;
                height: 100%;
                border-radius: 11upx;
                position: relative;
                image {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                }
                >.title {
                    color: #fff;
                    font-size: 28upx;
                    font-weight: 600;
                    line-height: 66upx;
                    top: 7upx;
                    left: 22upx;
                    position: absolute;
                    height: fit-content;
                }
                >.button {
                    position: absolute;
                    width: 120upx;
                    height: 38upx;
                    background: rgba(255, 255, 255, .2);
                    line-height: 38upx;
                    position: relative;
                    box-sizing: border-box;
                    padding: 0 27upx 0 15upx;
                    border-radius: 19upx;
                    font-size: 20upx;
                    color: #fff;
                    top: 72upx;
                    left: 22upx;
                    &:after {
                        position: absolute;
                        height: 0;
                        width: 0;
                        content: '';
                        border: 7upx solid #fff;
                        border-top: 7upx solid rgba(0, 0, 0, 0);
                        border-right: 7upx solid rgba(0, 0, 0, 0);
                        border-bottom: 7upx solid rgba(0, 0, 0, 0);
                        right: 4upx;
                        top: 0;
                        bottom: 0;
                        margin: auto;
                    }
                }
            }
        }
    }
</style>
