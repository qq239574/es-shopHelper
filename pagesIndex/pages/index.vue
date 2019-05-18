<template>
    <view class="echarts page">
        <echartBlock :info='dataList[0]'>
            <mpvue-echarts class="ec-canvas" lazyLoad :onInit="lineInit1" canvasId="line" ref="lineChart1" />
        </echartBlock>
        <echartBlock :info='dataList[1]'>
            <mpvue-echarts class="ec-canvas" lazyLoad :onInit="lineInit2" canvasId="line" ref="lineChart2" />
        </echartBlock>
        <echartBlock :info='dataList[2]'>
            <mpvue-echarts class="ec-canvas" lazyLoad :onInit="lineInit3" canvasId="line" ref="lineChart3" />
        </echartBlock>
        <echartBlock :info='dataList[3]'>
            <mpvue-echarts class="ec-canvas" lazyLoad :onInit="lineInit4" canvasId="line" ref="lineChart4" />
        </echartBlock>
        <topList></topList>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
    import * as echarts from '../../components/echarts/echarts.simple.min.js';
    import mpvueEcharts from '../../components/mpvue-echarts/src/echarts.vue';
    import echartBlock from '../components/Index-Echarts.vue'
    import topList from '../components/Index-Top.vue'
    import {
        number_format
    } from '../../components/my-components/formater.js'
    import {
        getLineOption1,
        getLineOption2,
        getLineOption3,
        getLineOption4
    } from '../components/Index-EchartsOption.js';
    import {
        getDate
    } from '../../components/my-components/getDateSection.js'
    let initing = false; //是否正在刷新
    /**
     * 缓存接口数据
     */
    let dataList1 = [0, 0, 0, 0, 0, 0, 0],
        dataList2 = [0, 0, 0, 0, 0, 0, 0],
        dataList3 = [0, 0, 0, 0, 0, 0, 0],
        dataList4 = [0, 0, 0, 0, 0, 0, 0];
    let initdata = [{
        title: '成交额（元）',
        subTitle: '累计总成成交额：' + 0,
        today: 0,
        yesterday: 0,
        id: 'trade'
    }, {
        title: '付款订单数（个）',
        subTitle: '',
        today: 0,
        yesterday: 0,
        id: 'pay'
    }, {
        title: '付款商品数（件）',
        subTitle: '',
        today: 0,
        yesterday: 0,
        id: 'good'
    }, {
        title: '付款会员数',
        subTitle: '',
        today: 0,
        yesterday: 0,
        id: 'vip'
    }];
    let cacheDataList = [];
    let timeBar = ''
    export default {
        data() {
            return {
                dataList: initdata,
            }
        },
        onShow() {
            this.initPage()
        },
        onPullDownRefresh() {
            this.dataList = [{
                title: '成交额（元）',
                subTitle: '累计总成交额：' + 0,
                today: 0,
                yesterday: 0,
                id: 'trade'
            }, {
                title: '付款订单数（个）',
                subTitle: '',
                today: 0,
                yesterday: 0,
                id: 'pay'
            }, {
                title: '付款商品数（件）',
                subTitle: '',
                today: 0,
                yesterday: 0,
                id: 'good'
            }, {
                title: '付款会员数',
                subTitle: '',
                today: 0,
                yesterday: 0,
                id: 'vip'
            }]
            this.initPage();
        },
        methods: {
            initPage() {
                cacheDataList = [{
                    title: '成交额（元）',
                    subTitle: '累计总成交额：' + 0,
                    today: 0,
                    yesterday: 0,
                    id: 'trade'
                }, {
                    title: '付款订单数（个）',
                    subTitle: '',
                    today: 0,
                    yesterday: 0,
                    id: 'pay'
                }, {
                    title: '付款商品数（件）',
                    subTitle: '',
                    today: 0,
                    yesterday: 0,
                    id: 'good'
                }, {
                    title: '付款会员数',
                    subTitle: '',
                    today: 0,
                    yesterday: 0,
                    id: 'vip'
                }];
                if (!initing) {
                    let reqResult = []; //用来统计请求是否全部完成
                    initing = true;
                    this.pageLoading();
                    this.Request('getStatisticsData', { //今天的数据
                        is_yesterday: 0
                    }).then(res => {
                        this.initLine1(res.order_count_chart['7'].order_pay_price); //成交额
                        this.initLine2(res.order_count_chart['7'].order_pay_count); //付款订单数
                        this.initLine4(res.pay_rate_chart['7'].order_member_pay_count); //付款会员数
                        cacheDataList[0].today = number_format(res.order_pay_price, 2, '.', '');
                        cacheDataList[1].today = res.order_pay_count;
                        cacheDataList[3].today = res.order_member_count;
                        reqResult.push(1);
                        if (reqResult.length > 4) {
                            initing = false;
                            this.dataList = cacheDataList;
                            this.closePageLoading();
                        }
                    });
                    this.Request('getStatisticsData', { //昨天的数据
                        is_yesterday: 1
                    }).then(res => {
                        cacheDataList[0].yesterday = res.order_pay_price;
                        cacheDataList[1].yesterday = res.order_pay_count;
                        cacheDataList[3].yesterday = res.order_member_count;
                        reqResult.push(1)
                        if (reqResult.length > 4) {
                            initing = false;
                            this.dataList = cacheDataList;
                            this.closePageLoading();
                        }
                    })
                    this.Request('getGoodStatisticsData', { //7天的商品曲线
                        start: getDate(-6),
                        end: getDate(0)
                    }).then(res => {
                        let arr = [],
                            tmp = res.data.graph;
                        for (let key in tmp) {
                            arr.push(tmp[key].goods_paid_count)
                        }
                        this.initLine3(arr); //付款商品数
                    })
                    this.Request('getGoodNumberByDate', { //今天的商品数
                        date: getDate(0)
                    }).then(res => {
                        reqResult.push(1)
                        cacheDataList[2].today = res.data.goods_paid_count;
                        if (reqResult.length > 4) {
                            initing = false;
                            this.dataList = cacheDataList;
                            this.closePageLoading();
                        }
                    })
                    this.Request('getGoodNumberByDate', { //昨天的商品数
                        date: getDate(-1)
                    }).then(res => {
                        reqResult.push(1)
                        cacheDataList[2].yesterday = res.data && res.data.goods_paid_count || {
                            goods_added_cart_count: 0,
                            goods_onsale_count: 0,
                            goods_paid_count: 0,
                            goods_visited_count: 0,
                        };
                        if (reqResult.length > 4) {
                            initing = false;
                            this.dataList = cacheDataList;
                            this.closePageLoading();
                        }
                    })
                    this.Request('getHistoryData', {}).then(res => { //获取历史总成交额
                        reqResult.push(1)
                        cacheDataList[0].subTitle = '累计总成交额：' + number_format(res.all_order_price, 2, '.', ',');
                        if (reqResult.length > 4) {
                            initing = false;
                            this.dataList = cacheDataList;
                            this.closePageLoading();
                        }
                    })
                } else {
                    clearTimeout(timeBar)
                    timeBar = setTimeout(() => {
                        initing = false;
                    }, 3000)
                }
            },
            initLine1(datalist) { //初始化第1个echarts,入参为数据数组
                dataList1 = datalist;
                this.$refs.lineChart1.init();
            },
            initLine2(datalist) { //初始化第2个echarts,入参为数据数组
                dataList2 = datalist;
                this.$refs.lineChart2.init();
            },
            initLine3(datalist) { //初始化第3个echarts,入参为数据数组
                dataList3 = datalist;
                this.$refs.lineChart3.init();
            },
            initLine4(datalist) { //初始化第4个echarts,入参为数据数组
                dataList4 = datalist;
                this.$refs.lineChart4.init();
            },
            lineInit1(canvas, width, height) {
                echarts.setCanvasCreator(() => canvas);
                let lineChart = echarts.init(canvas, null, {
                    width: width,
                    height: height
                })
                canvas.setChart(lineChart)
                lineChart.setOption(getLineOption1(dataList1));
                return lineChart
            },
            lineInit2(canvas, width, height) {
                echarts.setCanvasCreator(() => canvas);
                let lineChart = echarts.init(canvas, null, {
                    width: width,
                    height: height
                })
                canvas.setChart(lineChart)
                lineChart.setOption(getLineOption2(dataList2));
                return lineChart
            },
            lineInit3(canvas, width, height) {
                echarts.setCanvasCreator(() => canvas);
                let lineChart = echarts.init(canvas, null, {
                    width: width,
                    height: height
                })
                canvas.setChart(lineChart)
                lineChart.setOption(getLineOption3(dataList3));
                return lineChart
            },
            lineInit4(canvas, width, height) {
                echarts.setCanvasCreator(() => canvas);
                let lineChart = echarts.init(canvas, null, {
                    width: width,
                    height: height
                })
                canvas.setChart(lineChart)
                lineChart.setOption(getLineOption4(dataList4));
                return lineChart
            },
        },
        components: {
            mpvueEcharts,
            echartBlock,
            topList
        }
    }
</script>

<style lang='scss'>
    .echarts {
        background: #fff;
        view {
            display: flex;
        }
        .ec-canvas {
            width: 100%!important;
            height: 80%!important;
            position: absolute;
            top: 10%;
        }
    }
</style>
