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
        </view>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
    import * as echarts from '../../components/echarts/echarts.simple.min.js';
    import mpvueEcharts from '../../components/mpvue-echarts/src/echarts.vue';
    import selectItem from '../../components/my-components/editBlock-SelectItem.vue'
    import uniPagination from "../../components/uni-pagination/uni-pagination.vue"
    import inputItem from '../../components/my-components/editBlock-InputItem.vue'
    import {
        getDate,
        GetDateDiff
    } from '../../components/my-components/getDateSection.js'
    import {
        number_format
    } from '../../components/my-components/formater.js'
    import getTableList from '../components/Detail-TableList.js'
    import getLineOption from '../components/Detail-EchartsOption.js';
    let searchSection = []; //搜索日期区间
    let datalist = [0, 0, 0, 0, 0, 0, 0]; //接口获得的数据，用于echarts
    let keylist = [];
    let DataFrom = {};
    let DataGo = {
        go: 'filterDate'
    };
    let requesting = false;
    export default {
        data() {
            return {
                pageLabel: '近7日',
                updateStatus: false,
                historyTotal: 0, //历史累计总成交额
                selectTotal: 0, //所选日期总成交额
                tableList: [], //表格数据
                totalPage: 5, //总分页数
                curTableIndex: 0, //当前表格的页码
            }
        },
        onLoad(option) {
            DataFrom = this.Cacher.getData(option.from);
            this.initPage();
        },
        onShow() {
            this.initPage();
        },
        onUnload() {
            this.Cacher.setData(DataGo.go, {}); //清理记录
        },
        onPullDownRefresh() {
            this.initPage();
        },
        methods: {
            formater(val) {
                return number_format(val);
            },
            initPage() { //初始化页面  
                DataGo = this.Cacher.getData('filterDate') || {
                    go: 'filterDate',
                    date: [getDate(-6), getDate(0), '7日']
                };
                if (!requesting) {
                    requesting = true;
                    this.$refs.lineChart.init();
                    this.pageLabel = DataGo.date[2];
                    let dateGap = GetDateDiff(DataGo.date[0], DataGo.date[1]);
                    if (dateGap > 90) { //查询间隔最大90天
                        this.Toast('查询日期间隔最大90天');
                        let fromNowGap = GetDateDiff(DataGo.date[1], getDate(0)); //距离今天的间隔
                        DataGo.date[0] = getDate(-fromNowGap - 89); //
                    }
                    this.Request('getHistoryData', {}).then(res => { //获取历史总成交额
                        this.historyTotal = res.all_order_price;
                    })
                    this.Request('getTradeDataByDate', {
                        start: DataGo.date[0],
                        end: DataGo.date[1],
                        pageSize: 90,
                        page: 1
                    }).then(res => {
                        requesting = false;
                        let arr = [];
                        let keys = [];
                        let table = []
                        let tmp = res.data;
                        let total = '';
                        for (let key in tmp) {
                            if (DataFrom.id == 'vip') { //付款会员数 
                                table.push({
                                    col1: key,
                                    col2: tmp[key].order_member_pay_count
                                })
                                keys.push(key)
                                arr.push(tmp[key].order_member_pay_count);
                                total = res.total.order_member_pay_count;
                            } else if (DataFrom.id == 'trade') { //..成交额（元）
                                table.push({
                                    col1: key,
                                    col2: tmp[key].order_pay_price
                                })
                                keys.push(key)
                                arr.push(tmp[key].order_pay_price);
                                total = res.total.order_pay_price;
                            } else if (DataFrom.id == 'pay') { //付款订单数（个）
                                table.push({
                                    col1: key,
                                    col2: tmp[key].order_pay_count
                                })
                                keys.push(key)
                                arr.push(tmp[key].order_pay_count);
                                total = res.total.order_pay_count;
                            } else if (DataFrom.id == 'good') { //付款商品数（件） 
                                table.push({
                                    col1: key,
                                    col2: tmp[key].goods_paid_count
                                })
                                keys.push(key)
                                arr.push(tmp[key].goods_paid_count);
                                total = res.total.goods_paid_count;
                            }
                        }
                        datalist = arr;
                        keylist = keys;
                        this.tableList = table;
                        this.selectTotal = total;
                        this.$refs.lineChart.init();
                    }).catch(res => {
                        requesting = false;
                        this.Toast(res.message)
                    })
                }
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
                lineChart.setOption(getLineOption(datalist, keylist));
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
            padding: 0 0 150upx;
        }
    }
</style>
