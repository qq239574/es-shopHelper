<template>
    <div class='history-record page' :style='showNodata?"background:#fff":""'>
        <SearchInput @input='search' placeholder='请输入商品名称或订单编号' inputStyle='background:#f5f7fa;margin:10px auto;' bgStyle='background:#fff;'></SearchInput>
        <TabCard @tabChange='tabChange' :categories='categories' :index='tabIndex'></TabCard>
        <block v-if='tabIndex==0'>
            <recordsList v-for='(item,index) in records' :key='index' :bill='item' @click='clickBill'></recordsList>
        </block>
        <statisticBlock :info='statisticInfo' v-else></statisticBlock>
        <nodata bgStyle='background:#fff;' type='noresult' tip='没有搜索到相关订单' v-if='showNodata'></nodata>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
        <view class="pager" v-if='showPager'>
            <i-page i-class='pager-button' :current="current" :total="totalPage" @change="handleChange">
                <view class='prev button' slot="prev">
                    <i-icon type="return"></i-icon>
                    上一步
                </view>
                <view class='next button' slot="next">
                    下一步
                    <i-icon type="enter"></i-icon>
                </view>
            </i-page>
        </view>
    </div>
</template>

<script>
    import TabCard from '../../components/my-components/Tabs';
    import SearchInput from '../../components/my-components/SearchInput.vue';
    import nodata from '../../components/my-components/nodata.vue'
    import statisticBlock from '../components/Statistics.vue'
    import recordsList from '../components/Card.vue'
    let cacheSearchKey = '';
    let bar = '';
    let curTab = { //当前标签
        cateid: 0,
        index: 0,
        name: "核销记录",
        searchId: 1
    } // 
    export default {
        components: {
            TabCard,
            SearchInput,
            nodata,
            statisticBlock,
            recordsList
        },
        computed: {
            showNodata() {
                return !this.searching && !this.records.length && !this.tabIndex
            },
            showPager() {
                return !this.tabIndex && (this.searching || this.records.length)
            }
        },
        data() {
            return {
                searching: true,
                current: 1, //当前分页页码
                totalPage: 1,
                tabIndex: 0,
                categories: [{ //
                        cateid: 0,
                        index: 0,
                        name: "核销记录",
                        searchId: 1
                    },
                    {
                        cateid: 1,
                        index: 1,
                        name: "核销统计",
                        searchId: 2
                    },
                ],
                records: [{ //完整数据
                    info: { //订单及用户信息
                        name: '',
                        provide: '',
                        time: '',
                        tel: '',
                        num: 0,
                        pay: 0,
                        subStatus: 0, //订单状态，1：维权
                        status: 0, ////0代付款,1代发货，2待收货，3已完成，4已关闭
                    },
                    bill: { //订单信息
                        billId: '', //订单号
                        billDate: '', //订单时间
                        billType: 0, //订单类型，0：分销订单，1：普通订单
                        billPrice: 0,
                        id: ''
                    },
                    goodsList: [{ //订单商品信息
                        img: '', //商品图片
                        goodName: '', //商品名
                        color: '', //颜色
                        size: '', //型号
                        num: 0, //数量
                        price: 0, //价格
                        specifications: 'single', //单规格
                    }],
                    rights: { // 维权信息
                        status: '', //维权状态
                        addition: 0, //维权备注
                    }
                }],
                statisticInfo: [{
                    name: '今日核销（单）',
                    value: 0
                }, {
                    name: '7日核销（单）',
                    value: 0
                }, {
                    name: '14日核销（单）',
                    value: 0
                }, {
                    name: '30日核销（单）',
                    value: 0
                }]
            }
        },
        methods: {
            handleChange(obj) {
                let {
                    detail: {
                        type
                    }
                } = obj;
                if (type == 'next') {
                    this.current = Math.min(this.current + 1, this.totalPage);
                } else {
                    this.current = Math.max(this.current - 1, 1);
                }
            },
            clickBill(val) {
                this.closePageLoading();
                this.Cacher.setData('selfVerifyHistory',Object.assign({
                    from: 'selfVerifyHistory' 
                },val) )
                uni.navigateTo({
                    url: '../../pagesBill/pages/billDetail?from=selfVerifyHistory'
                })
            },
            initPage() {
                this.totalPage = 1;
                this.pageLoading();
                this.searching = true;
                this.Request('verifyCount', {}).then(res => { 
                    this.statisticInfo = [{
                        name: '今日核销（单）',
                        value: res.today || 0
                    }, {
                        name: '7日核销（单）',
                        value: res.seven || 0
                    }, {
                        name: '14日核销（单）',
                        value: res.fourteen || 0
                    }, {
                        name: '30日核销（单）',
                        value: res.thirty || 0
                    }]
                })
                this.Request('selfVerifyLog', {
                    page: this.current, //订单id号
                    pagesize: 20,
                    search: cacheSearchKey
                }).then(res => {
                    this.searching = false;
                    this.closePageLoading();
                    if (res.error == 0) {
                        this.totalPage = Math.ceil(res.count / 20) || 1;
                        this.records = res.list.map(item => { 
                            return {
                                info: { //订单及用户信息
                                    name: item.buyer_name,
                                    provide: '',
                                    time: item.create_time,
                                    tel: item.buyer_mobile,
                                    num: item.goods_num,
                                    pay: item.pay_price,
                                    subStatus: 0, //订单状态，1：维权
                                    status: 0, ////0代付款,1代发货，2待收货，3已完成，4已关闭
                                },
                                bill: { //订单信息
                                    billId: item.order_no, //订单号
                                    billDate: item.create_time, //订单时间
                                    billType: 0, //订单类型，0：分销订单，1：普通订单
                                    billPrice: 0,
                                    id: item.id
                                },
                                goodsList:  item.goods_info instanceof Array && item.goods_info.map(val => {
                                    return { //订单商品信息
                                        img: val.thumb, //商品图片
                                        goodName: val.title, //商品名
                                        color: val.option_title, //颜色
                                        size: '', //型号
                                        num: val.total, //数量
                                        price: val.price_unit, //价格
                                        specifications: 'single', //单规格
                                    }
                                }),
                                rights: { // 维权信息
                                    status: '', //维权状态
                                    addition: 0, //维权备注
                                }
                            }
                        })
                    } else {
                        this.Toast(res.message)
                    }
                }).catch(res => { 
                    this.closePageLoading();
                    this.searching = false;
                    this.Toast(res.message)
                })
            },
            search(val) {
                clearTimeout(bar);
                bar = setTimeout(() => {
                    this.current = 1;
                    cacheSearchKey = val.value;
                    this.initPage();
                    this.pageLoading()
                }, 500)
            },
            tabChange(tab) {
                this.tabIndex = tab.index; 
                curTab = tab;
                this.current = 1;
                this.recordsList = [];
                this.totalPage = 1;
            }
        },
        onShow() {
            this.initPage()
        },
    }
</script>

<style lang="scss" scoped>
    @import '../../components/my-components/pager.scss';
    .history-record {
        min-height: 100%;
    }
</style>