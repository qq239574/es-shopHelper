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
    export default {
        data() {
            return {
                dataList: [{
                    title: '成交额（元）',
                    subTitle: '累计总成成交额：0',
                    today: 0,
                    yesterday: 0
                }, {
                    title: '付款订单数（个）',
                    subTitle: '',
                    today: 0,
                    yesterday: 0
                }, {
                    title: '付款商品数（件）',
                    subTitle: '',
                    today: 0,
                    yesterday: 0
                }, {
                    title: '付款会员数',
                    subTitle: '',
                    today: 0,
                    yesterday: 0
                }, ],
            }
        },
        onLoad() {
            this.initPage()
        },
        onShow() {
            this.initPage()
        },
        methods: {
            initPage() {
                if (!initing) {
                    initing = true;
                    this.pageLoading();
                    this.initLine1([0, 0, 0, 0, 0, 0, 0]);
                    this.initLine2([0, 0, 0, 0, 0, 0, 0]);
                    this.initLine3([0, 0, 0, 0, 0, 0, 0]);
                    this.initLine4([0, 0, 0, 0, 0, 0, 0]);
                    this.Request('getStatisticsData', { //今天的数据
                        is_yesterday: 0
                    }).then(res => {
                        this.initLine1(res.order_count_chart['7'].order_pay_price); //成交额
                        this.initLine2(res.order_count_chart['7'].order_pay_count); //付款订单数
                        this.initLine4(res.pay_rate_chart['7'].order_member_pay_count); //付款会员数
                        this.closePageLoading();
                        this.dataList[0].today = res.order_pay_price;
                        this.dataList[1].today = res.order_pay_count;
                        this.dataList[3].today = res.order_member_count;
                        initing = false;
                        this.dataList=[...this.dataList];
                    });
                    this.Request('getStatisticsData', { //昨天的数据
                        is_yesterday: 1
                    }).then(res => {
                        this.dataList[0].yesterday = res.order_pay_price;
                        this.dataList[1].yesterday = res.order_pay_count;
                        this.dataList[3].yesterday = res.order_member_count;
                        initing = false;
                        this.dataList=[...this.dataList];
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
                        this.dataList[2].today = res.data.goods_paid_count;
                        this.dataList=[...this.dataList];
                    })
                    this.Request('getGoodNumberByDate', { //昨天的商品数
                        date: getDate(-1)
                    }).then(res => {
                        this.dataList[2].yesterday = res.data.goods_paid_count;
                        this.dataList=[...this.dataList];
                    })
                } else {
                    setTimeout(() => {
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
