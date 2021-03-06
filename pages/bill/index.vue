<template>
    <view class='pages-bill-index page'>
        <view class="grace-fixed-top grace-gtbg-blue top1" style='background:rgba(0,0,0,0)'>
            <SearchInput @click='search' :value='searchValue' placeholder='请输入订单号' :disabled='true'></SearchInput>
            <TabCard @tabChange='tabChange' :index='tabIndex'></TabCard>
        </view>
        <view class='margin180'></view>
        <Card :Jurisdiction='Jurisdiction' v-for='(item,index) in billList' :key='index' :bill='item' @click='clickBill'></Card>
        <nodata type='noresult' :tip='searching?"正在搜索相关订单":"没有搜索到相关订单"' v-if='!billList.length'></nodata>
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
            <view class="model__error" :style='error?"color:red;":"color:#fff;"'>*{{sureErrorMessage}}</view>
            <block v-if='!surePaying'>
                <input class='model__input model__input--tel' type="text" :value='sureMobile' @input='getSureMobile' placeholder='请输入提货手机号' v-if='modelTheme.title=="手动确认自提"'>
                <input class='model__input model__input--pw' type="text" :value='surePassword' @input='getSurePassword' placeholder='请输入系统登录密码'>
            </block>
            <view class="model__img" v-else>
                <image src='/static/img/global/loading.jpg'></image>
            </view>
        </i-modal>
        <!-- 交互组件 -->
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
        <loadMore :loadingType="LoadingType" :loadingText="LoadingText" :show="ShowLoadMore"></loadMore>
        <MyTabbar :defaultIndex='2' :Jurisdiction='Jurisdiction'></MyTabbar>
    </view>
</template>

<script>
    import MyTabbar from '../../components/my-components/myTabbar1'
    import TabCard from '../../components/my-components/Tabs.vue';
    import Card from './index/Card.vue';
    import SearchInput from '../../components/my-components/SearchInput.vue';
    import getBillList from './index/getBillList.js'
    import nodata from '../../components/my-components/nodata.vue'
    let DataFrom = {};
    let searchData = {};
    let surePassword = ''; //手动确认付款密码
    let sureMobile = ''; //手动确认手机号
    let member_id = '';
    let curTab = { //当前标签
        cateid: 0,
        index: 0,
        name: "代付款"
    } //{cateid: 0, index: 0, name: "代付款"}
    let requestQueue = ''; //请求队列，标签操作过快会导致结果混乱
    let searching = false;
    let cacheBill = {}; //缓存将要操作的订单 
    import {
        getJurisdiction
    } from '../../components/my-components/getJurisdiction.js'
    export default {
        components: {
            TabCard,
            Card,
            SearchInput,
            nodata,
            MyTabbar
        },
        data() {
            return {
                Jurisdiction: {}, //权限
                current: 1,
                totalPage: 1,
                surePassword: '', //弹窗输入密码
                sureMobile: '', ////弹窗输入手机号
                error: false, //弹窗输入密码错误提示用
                surePaying: false, //正在确认付款？
                showModel: false, //是否显示弹窗
                modelTheme: { //弹窗提示信息
                    title: '',
                    detail: '',
                    state: ''
                },
                searchValue: '', //查询条件 
                billList: [],
                tabIndex: 0, //默认tabs的index
                searching: true,
                sureErrorMessage: ''
            }
        },
        onLoad(option) {
            uni.hideTabBar({ //隐藏tabbar
                animation: false
            })
            this.billList = [];
            if (option.from) {
                DataFrom = this.Cacher.getData(option.from);
            }
            getJurisdiction.call(this).then(res => {
                this.Jurisdiction = res;
                if (!res.order_view) { //无权限
                    uni.switchTab({
                        url: '/pages/index/index'
                    });
                }
            }).catch(res => {
                this.Toast(res.message)
            })
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
                let apiNames = ['payBill', 'receiveBill', 'sureSelfGet'];
                let apiname = '';
                let data = {
                    id: cacheBill.bill.bill.id, //订单id
                    password: surePassword
                }
                if (this.modelTheme.state == 'pay') { //确认付款
                    apiname = apiNames[0];
                } else if (this.modelTheme.state == 'receive') { //确认收货
                    apiname = apiNames[1];
                } else if (this.modelTheme.state == 'self') {
                    apiname = apiNames[2];
                    data.mobile = sureMobile;
                }
                this.Request(apiname, data).then(res => {
                    this.Toast(this.modelTheme.success);
                    this.initPage();
                    this.showModel = false;
                    this.surePaying = false;
                    this.closePageLoading();
                }).catch(res => {
                    this.error = true;
                    this.Toast(res.message);
                    this.surePaying = false;
                    this.closePageLoading();
                    this.sureErrorMessage = res.message;
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
            getSureMobile(val) {
                sureMobile = val.detail.value;
                this.sureMobile = sureMobile;
                this.error = false;
                console.log('sureMobile',sureMobile)
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
                    this.Cacher.clearData('searchShop');
                    this.searchValue = searchData.value || '';
                    this.tabIndex = searchData.cateId || 0;
                } else {
                    this.tabIndex = curTab.cateid;
                }
                getBillList.call(this, this.tabIndex, { //里面设置了总页数
                    keywords: searchData.value || '',
                    page: this.current,
                    pageSize: 20
                }).then(res => {
                    this.closePageLoading();
                    this.billList = res;
                    this.searching = false;
                }).catch(res => {
                    this.searching = false;
                    this.closePageLoading();
                    this.Toast(res.message || '出错啦')
                });
            },
            tabChange(tab) {
                if (!searching) {
                    searching = true;
                    this.pageLoading();
                    curTab = tab;
                    this.current = 1;
                    this.billList = [];
                    this.tabIndex = tab.cateid;
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
                        searching = false;
                        requestQueue && this.tabChange(requestQueue);
                        requestQueue = '';
                    }).catch(res => {
                        this.searching = false;
                        searching = false;
                        this.closePageLoading();
                        requestQueue && this.tabChange(requestQueue);
                        requestQueue = '';
                    });
                } else {
                    requestQueue = tab;
                }
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
                    placeholder: '请输入订单号',
                    cateId: this.tabIndex,
                    default: this.searchValue
                })
                uni.navigateTo({
                    url: '../../pagesLogin/pages/searchShop?from=bill'
                })
            },
            clickBill(val) {
                cacheBill = val;
                this.closePageLoading();
                this.Cacher.setData('bill', Object.assign({
                    from: 'bill',
                }, val));
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
                    } else if (val.detail.val == '确认自提') {
                        this.showModel = true;
                        this.modelTheme = {
                            title: '手动确认自提',
                            detail: '确保买家已经付款，并且与买家协商完毕确认自提',
                            state: 'self',
                            success: '确认自提成功'
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
                    } else if (val.detail.val == '确认收款' || val.detail.val == '确认收货') {
                        this.showModel = true;
                        this.modelTheme = {
                            title: '手动' + val.detail.val,
                            detail: '确保买家已经收到您的商品，并且与买家协商完毕提前' + val.detail.val,
                            state: 'receive',
                            success: val.detail.val + '成功'
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
    @import '../../components/my-components/pager.scss';
    .margin180 {
        height: 176upx;
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
        &.model__input--tel {
            margin-bottom: 20upx;
        }
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
</style>