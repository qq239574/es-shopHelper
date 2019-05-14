<template>
    <view class='pages-bill-index page'>
        <view class="grace-fixed-top grace-gtbg-blue top1" style='background:rgba(0,0,0,0)'>
            <view class="margin20"></view>
            <SearchInput @click='search' :value='searchValue' placeholder='请输入订单号' :disabled='true'></SearchInput>
            <TabCard @tabChange='tabChange' :index='tabIndex'></TabCard>
        </view>
        <view class='margin200'></view>
        <Card v-for='(item,index) in billList' :key='index' :bill='item' @click='clickBill'></Card>
        <nodata type='noresult' tip='没有搜索到相关订单' v-if='!searching&&!billList.length'></nodata>
        <view class="pager" v-else>
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
        <!-- 确认付款与收货的弹窗 -->
        <i-modal :visible="showModel" :show-ok='!surePaying' :show-cancel='!surePaying' @ok='sure' @cancel='cancel'>
            <view class="model__title">{{modelTheme.title}}</view>
            <view class="model__content">{{modelTheme.detail}}</view>
            <view class="model__error" :style='error?"color:red;":"color:#fff;"'>*密码输入错误</view>
            <input class='model__input' type="text" :value='surePassword' @input='getSurePassword' placeholder='请输入系统登录密码' v-if='!surePaying'>
            <view class="model__img" v-else>
                <image src='/static/img/global/loading.jpg'></image>
            </view>
        </i-modal>
        <!-- 交互组件 -->
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
        <loadMore :loadingType="LoadingType" :loadingText="LoadingText" :show="ShowLoadMore"></loadMore>
    </view>
</template>

<script>
    import TabCard from '../../components/my-components/Tabs';
    import Card from '../../pages/bill/index/Card';
    import SearchInput from '../../components/my-components/SearchInput.vue';
    import getBillList from '../../pages/bill/index/getBillList.js'
    import nodata from '../../components/my-components/nodata.vue'
    let DataFrom = {};
    let searchData = {};
    let surePassword = ''; //手动确认付款密码
    let member_id = '';
    let curTab = { //当前标签
        cateid: 0,
        index: 0,
        name: "待付款"
    } //{cateid: 0, index: 0, name: "代付款"}
    let cacheBill = {}; //缓存将要操作的订单 
    export default {
        components: {
            TabCard,
            Card,
            SearchInput,
            nodata
        },
        data() {
            return {
                current: 1,
                totalPage: 1,
                surePassword: '', //弹窗输入密码
                error: false, //弹窗输入密码错误提示用
                surePaying: false, //正在确认付款？
                showModel: false, //是否显示弹窗
                modelTheme: { //弹窗提示信息
                    title: '手动确认付款',
                    detail: '确保买家已经付款，并且与买家协商完毕确认付款',
                    state: 'pay'
                },
                searchValue: '', //查询条件 
                billList: [{ //完整数据
                    info: { //订单及用户信息
                        name: '张三', //客户姓名
                        provide: '到店自提', //配送方式
                        num: 4, //商品数量
                        pay: 2165653.453, //实付
                        addtion: 0, //备注
                        payType: 'wx', //支付方式
                        subStatus: 0, //订单状态，1：维权
                        status: 0, //0代付款,1代发货，2待收货，3已完成，4已关闭
                    },
                    bill: { //订单信息
                        billId: 'ES204565656526265656565', //订单号
                        billDate: '2018-05-12 15:23:12', //订单时间
                        billType: 0, //订单类型，0：分销订单，1：普通订单
                        billPrice: 121212
                    },
                    goodsList: [{ //订单商品信息
                        img: '/static/img/global/tmp.png', //商品图片
                        goodName: '', //商品名
                        color: '', //颜色
                        size: '', //型号
                        num: 0, //数量
                        price: 0, //价格
                        specifications: 'single', //单规格
                    }],
                    rights: { // 维权信息
                        status: '退款退货', //维权状态
                        addition: 0, //维权备注
                    }
                }],
                tabIndex: 0, //默认tabs的index
                searching: false
            }
        },
        onLoad(option) {
            this.billList = [];
            DataFrom = this.Cacher.getData(option.from) || {};
        },
        onShow() {
            this.current = 1;
            this.initPage();
        },
        watch: {
            current() {
                this.initPage();
            },
            showModel() {
                this.surePassword = '';
                surePassword = '';
                this.error = false;
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
            sure() {
                this.surePaying = true;
                let apiNames = ['payBill', 'receiveBill'];
                let apiname = '';
                if (this.modelTheme.state == 'pay') { //确认付款
                    apiname = apiNames[0];
                } else if (this.modelTheme.state == 'receive') { //确认收货
                    apiname = apiNames[1];
                }
                this.Request(apiname, {
                    id: cacheBill.bill.bill.id, //订单id
                    password: surePassword
                }).then(res => {
                    this.Toast(this.modelTheme.success);
                    this.initPage();
                    this.showModel = false;
                }).catch(res => {
                    this.error = true;
                }).finally(res => {
                    this.surePaying = false;
                    this.closePageLoading();
                })
            },
            cancel() {
                this.showModel = false;
            },
            getSurePassword(val) {
                surePassword = val.detail.value;
                this.surePassword = surePassword;
                this.error = false;
            },
            initPage() {
                this.searching = true;
                this.pageLoading();
                member_id = '';
                if (DataFrom.from == 'home') {
                    if (DataFrom.name == '待付款' || DataFrom.name == '待发货') {
                        this.tabIndex = DataFrom.cateid;
                    } else {
                        this.tabIndex = 0;
                    }
                } else if (DataFrom.from == 'searchShop') {
                    searchData = this.Cacher.getData('searchShop') || {};
                    this.searchValue = searchData.value || '';
                    this.tabIndex = DataFrom.cateid || 0;
                } else if (DataFrom.from == 'vipDetail') {
                    member_id = DataFrom.member_id;
                }else if (DataFrom.from == 'vipManage') {
                    member_id = DataFrom.info.id;
                }  else {
                    this.tabIndex = curTab.cateid;
                }
                getBillList.call(this, this.tabIndex, {
                    keywords: searchData.value || '',
                    page: this.current,
                    member_id: member_id,
                    pageSize: 20
                }).then(res => {
                    this.closePageLoading();
                    this.billList = res;
                    this.searching = false;
                });
            },
            tabChange(tab) {
                this.pageLoading();
                curTab = tab;
                this.current = 1;
                this.billList = [];
                this.searching = true;
                this.totalPage = 1;
                getBillList.call(this, tab.cateid, {
                    keywords: searchData.value || '',
                    member_id: member_id,
                    page: 1,
                    pageSize: 20
                }).then(res => {
                    this.billList = res;
                    this.closePageLoading();
                    this.searching = false;
                });
            },
            search(val) {
                DataFrom = Object.assign(DataFrom, { //这里预先设置返回的页面，由于back()函数无法设置query
                    from: 'searchShop',
                    value: '',
                    cateid: this.tabIndex
                })
                this.Cacher.setData('bill', {
                    from: 'searchShop',
                    title: '订单搜索',
                    placeholder: '请输入订单号'
                })
                uni.navigateTo({
                    url: '../../pagesLogin/pages/searchShop?from=bill'
                })
            },
            clickBill(val) {
                cacheBill = val;
                this.closePageLoading();
                this.Cacher.setData('bill', {
                    from: 'bill',
                    ...val
                });
                if (val.type != 'button') {
                    uni.navigateTo({ //去详情页
                        url: '../../pagesBill/pages/billDetail?from=bill'
                    })
                } else if (val.type == 'button') {
                    if (val.detail.val == '备注') {
                        DataFrom = Object.assign(DataFrom, {
                            from: 'additionList'
                        })
                        uni.navigateTo({
                            url: '../../pagesBill/pages/additionList?from=bill'
                        })
                    } else if (val.detail.val == '改价') {
                        DataFrom = Object.assign(DataFrom, {
                            from: 'changePrice'
                        })
                        uni.navigateTo({
                            url: '../../pagesBill/pages/changePrice?from=bill'
                        })
                    } else if (val.detail.val == '确认付款') {
                        this.showModel = true;
                        this.modelTheme = {
                            title: '手动确认付款',
                            detail: '确保买家已经付款，并且与买家协商完毕确认付款',
                            state: 'pay',
                            success: '确认付款成功'
                        }
                    } else if (val.detail.val == '维权备注') {
                        DataFrom = Object.assign(DataFrom, {
                            from: 'additionList'
                        })
                        uni.navigateTo({
                            url: '../../pagesBill/pages/additionList?from=bill'
                        })
                    } else if (val.detail.val == '维权中') {
                        this.Dialog.alert({
                            title: '',
                            message: '维权订单处理，请登录PC端后台进行操作',
                            confirmButtonText: '知道了'
                        }).then(() => {
                            // on close
                        });
                    } else if (val.detail.val == '确认发货') {
                        DataFrom = Object.assign(DataFrom, {
                            from: 'billProvide'
                        })
                        uni.navigateTo({
                            url: '../../pagesBill/pages/billProvide?from=bill'
                        })
                    } else if (val.detail.val == '确认收货') {
                        this.showModel = true;
                        this.modelTheme = {
                            title: '手动确认收货',
                            detail: '确保买家已经收到您的商品，并且与买家协商完毕提前确认收货',
                            state: 'receive',
                            success: '确认收货成功'
                        }
                    }
                }
            }
        },
        onPullDownRefresh() {
            this.initPage();
        }
    }
</script>

<style lang="scss" scoped>
    .margin200 {
        height: 196upx;
    }
    .margin20 {
        height: 20upx;
        width: 100%;
        background: #fff;
    }
    .model__title {
        font-weight: 700;
        font-size: 30upx;
        line-height: 30upx;
        height: 30upx;
        box-sizing: border-box;
        overflow: hidden;
        width: 100%;
        margin: 0 auto 15upx;
    }
    .model__content {
        line-height: 36upx;
        font-size: 26upx;
        color: #9ca1ab;
        width: 80%;
        margin: 0 auto 0;
        text-align: left;
        box-sizing: border-box;
        overflow: hidden;
    }
    .model__input {
        height: 46upx;
        width: 70%;
        margin: auto;
        border: 1upx solid #eee;
        border-radius: 10upx;
        line-height: 46upx;
        text-align: left;
        padding: 0 20upx;
        font-size: 24upx;
    }
    .model__img {
        width: 100upx;
        height: 100upx;
        margin: -20upx auto 0;
        image {
            width: 100%;
            height: 100%;
        }
    }
    .model__error {
        color: red;
        width: 80%;
        margin: auto;
        font-size: 20upx;
        line-height: 26upx;
        height: 28upx;
        box-sizing: border-box;
        text-align: left;
    }
    .pager {
        width: 100%;
        height: 80upx;
        margin: 30upx auto 100upx;
        .button {
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-around;
            font-size: 30upx;
            color: 999;
            line-height: 70upx;
        }
        /deep/button {
            height: 70upx;
            font-size: 30upx;
            color: 999;
            line-height: 70upx;
            border-radius: 10upx;
            margin: 0;
        }
        .prev {
            padding: 0 10upx 0 5upx;
        }
        .next {
            padding: 0 5upx 0 10upx;
        }
        /deep/.pager-button {
            line-height: 70upx;
            height: 70upx;
        }
    }
</style>