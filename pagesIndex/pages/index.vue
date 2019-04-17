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
    /**
     * 缓存接口数据
     */
    let dataList1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        dataList2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        dataList3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        dataList4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    export default {
        data() {
            return {
                dataList: [{
                    title: '成交额（元）',
                    subTitle: '累计总成成交额：5,000,000.00',
                    today: 15000000,
                    yesterday: 1336588
                }, {
                    title: '付款订单数（个）',
                    subTitle: '',
                    today: 777,
                    yesterday: 555
                }, {
                    title: '付款商品数（件）',
                    subTitle: '',
                    today: 5757,
                    yesterday: 755
                }, {
                    title: '付款会员数',
                    subTitle: '',
                    today: 1000,
                    yesterday: 7457
                }, ]
            }
        },
        onLoad() {
          this.initPage()
        },
        onShow(){
            this.initPage()
        },
        methods: {
            initPage() {
                this.initLine1([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                this.initLine2([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                this.initLine3([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                this.initLine4([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                setTimeout(() => { //数据请求后在此初始化
                    this.initLine1([1, 4.9, 7.0, 23.2, 15.6, 76.7, 35.6, 12.2, 32.6, 20.0, 6.4, 3.3]);
                    this.initLine2([2.0, 4.9, 7.0, 23.2, 25.6, 11, 1, 5, 32.6, 20.0, 6.4, 3.3]);
                    this.initLine3([2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 5.6, 162.2, 32.6, 20.0, 6.4, 3.3]);
                    this.initLine4([2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 35.6, 62.2, 32.6, 20.0, 6.4, 3.3]);
                }, 2000);
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
