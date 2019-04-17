<template>
    <view class="echarts page">
        <selectItem label='筛选日期' :value='pageLabel' @click='filteDate'></selectItem>
        <view class="echarts-block">
            <mpvue-echarts class="ec-canvas" lazy-load :onInit="lineInit" canvasId="line" ref="lineChart" />
        </view>
        <view class="block">
            <view class="item">
                <view class="num">{{formater(historyTotal)}}</view>
                <view class="title">历史累计总成交额</view>
            </view>
            <view class="item">
                <view class="num">{{formater(selectTotal)}}</view>
                <view class="title">所选日期总成交额</view>
            </view>
        </view>
        <!-- <inputItem :disabled='true' label='所选日期总成交额' value='256565' valueStyle='font-weight:700;'></inputItem> -->
        <view class="dataTable">
            <view class="tablerow">
                <view class="td">日期</view>
                <view class="td">销售额</view>
            </view>
            <view class="tablerow" v-for='(item,index) in tableList' :key='index'>
                <view class="td">{{item.col1}}</view>
                <view class="td">{{formater(item.col2)}}</view>
            </view>
        </view>
        <view class="pager">
            <uni-pagination show-icon="true" total="3" current="2" @change='changePager'>
            </uni-pagination>
            <uniPagination :total="20"></uniPagination>
        </view>
    </view>
</template>

<script>
    import * as echarts from '../../components/echarts/echarts.simple.min.js';
    import mpvueEcharts from '../../components/mpvue-echarts/src/echarts.vue';
    import selectItem from '../../components/my-components/editBlock-SelectItem.vue'
    import uniPagination from "../../components/uni-pagination/uni-pagination.vue"
    import inputItem from '../../components/my-components/editBlock-InputItem.vue'
    import {
        getDate
    } from '../../components/my-components/getDateSection.js'
    import {
        getData
    } from '../../store/cache.js'
    import {
        number_format
    } from '../../components/my-components/formater.js'
    import getTableList from '../components/Detail-TableList.js'
    import getLineOption from '../components/Detail-EchartsOption.js';
    let searchSection = []; //搜索日期区间
    let datalist = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //接口获得的数据，用于echarts
    export default {
        data() {
            return {
                pageLabel: '近7日',
                updateStatus: false,
                dataList: [{ //接口数据例子
                    title: '成交额（元）',
                    subTitle: '累计总成成交额：5,000,000.00',
                    today: 15000000,
                    yesterday: 1336588,
                    x: [],
                    y: []
                }],
                historyTotal: 1235454, //历史累计总成交额
                selectTotal: 66455, //所选日期总成交额
                tableList: [], //表格数据
                totalPage: 5, //总分页数
                curTableIndex: 0, //当前表格的页码
            }
        },
        onLoad() {
            this.initPage();
        },
        onShow() {
            this.initPage();
        },
        methods: {
            formater(val) {
                return number_format(val);
            },
            initPage() { //初始化页面
                let info = getData('echarts-detail'); // ./index跳转过来携带的参数
                searchSection = getData('filte-date-moneyDetail') || [getDate(0), getDate(-1), '今天']; //默认今天
                this.$refs.lineChart.init();
                this.pageLabel = searchSection[2];
                setTimeout(() => {
                    datalist = [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 15.6, 62.2, 32.6, 20.0, 6.4, 3.3];
                    this.$refs.lineChart.init();
                    this.tableList = getTableList(); //获取表格数据
                }, 2000);
            },
            filteDate() {
                uni.navigateTo({
                    url: './filterDate?from=moneyDetail'
                })
            },
            changePager(val) {
                this.tableList = getTableList(); //获取表格数据
            },
            clickModel() {
                uni.navigateTo({
                    url: './moneyDetail'
                })
            },
            lineInit(canvas, width, height) {
                echarts.setCanvasCreator(() => canvas);
                let lineChart = echarts.init(canvas, null, {
                    width: width,
                    height: height
                })
                canvas.setChart(lineChart)
                lineChart.setOption(getLineOption(datalist));
                return lineChart
            }
        },
        components: {
            mpvueEcharts,
            selectItem,
            uniPagination,
            inputItem
        }
    }
</script>

<style lang='scss'>
    .echarts {
        .echarts-block {
            width: 100%;
            height: 440upx;
            background: #fff;
            margin: 20upx 0;
            .ec-canvas {
                width: 100%!important;
                height: 100%!important;
            }
        }
        .block {
            width: 100%;
            height: 158upx;
            background: #fff;
            display: flex;
            margin-bottom: 20upx;
            .item {
                width: 50%;
                height: 100%;
                .num,
                .title {
                    width: 100%;
                    text-align: center;
                }
                .num {
                    font-size: 36upx;
                    height: 36upx;
                    line-height: 36upx;
                    color: #333;
                    font-weight: 600;
                    margin: 47upx auto 20upx;
                }
                .title {
                    font-size: 20upx;
                    height: 20upx;
                    line-height: 20upx;
                    color: #9ea3ae;
                }
            }
        }
        .dataTable {
            width: 100%;
            background: #fff;
            display: flex;
            flex-wrap: wrap;
            .tablerow {
                width: 710upx;
                margin: auto;
                display: flex;
                flex-wrap: nowrap;
                height: 68upx;
                .td {
                    height: 100%;
                    width: 50%;
                    text-align: center;
                    line-height: 68upx;
                }
                &:nth-child(even) {
                    background-color: #fff7f5;
                }
            }
        }
        .pager {
            width: 100%;
            background: #fff;
            padding: 0 0 50upx;
        }
    }
</style>
