<template>
    <view class='pages-bill-index page'>
        <view class="grace-fixed-top grace-gtbg-blue top1" style='background:rgba(0,0,0,0)'>
            <SearchInput @click='search' :value='searchValue' :disabled='true'></SearchInput>
            <TabCard @tabChange='tabChange' :index='tabIndex'></TabCard>
        </view>
        <view class='margin180'></view>
        <Card v-for='(item,index) in billList' :key='index' :bill='item' @click='clickBill'></Card>
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
    import Card from './index/Card';
    import SearchInput from '../../components/my-components/SearchInput.vue';
    import testdata from './index/testData.js'
    let DataFrom = {};
    let searchData = {};
    let surePassword = ''; //手动确认付款密码
    export default {
        components: {
            TabCard,
            Card,
            SearchInput
        },
        data() {
            return {
                surePassword: '',
                error: false,
                surePaying: false, //正在确认付款？
                showModel: false,
                modelTheme: {
                    title: '手动确认付款',
                    detail: '确保买家已经付款，并且与买家协商完毕确认付款',
                    state: 'pay'
                },
                searchValue: '', //查询条件 
                billList: [{
                    info: { //订单及用户信息
                        name: '张三', //客户姓名
                        provide: '到店自提', //配送方式
                        num: 4, //商品数量
                        pay: 2165653.453, //实付
                        addtion: [], //备注
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
                        goodName: '翻页蓝色的空间疯狂大富科技上来看饭店经理看时间对方离开时间slikfjsdfklklsjfdlkjslkdjfl', //商品名
                        color: '浅绿色', //颜色
                        size: 'S码', //型号
                        num: 2, //数量
                        price: '15455.2' //价格
                    }, {
                        img: '/static/img/global/tmp.png',
                        goodName: '翻页蓝色的空间疯狂大富科技上来看饭店经理看时间对方离开时间',
                        color: '浅绿色',
                        size: 'S码',
                        num: 2,
                        price: '152344.2'
                    }],
                    rights: { // 维权信息
                        status: '退款退货', //维权状态
                        addition: [{
                            content: '摔坏了'
                        }], //维权备注
                    }
                }],
                curTab: { //当前标签
                    cateid: 0,
                    index: 0,
                    name: "代付款"
                }, //{cateid: 0, index: 0, name: "代付款"}
                tabIndex: 0, //默认tabs的index
            }
        },
        onLoad(option) {
            if (option.from) {
                DataFrom = this.Cacher.getData(option.from);
            }
            this.initPage();
        },
        onShow() {
            this.initPage();
        },
        watch: {
            showModel() {
                this.surePassword = '';
                surePassword = '';
                this.error = false;
            }
        },
        methods: {
            sure() {
                this.surePaying = true;
                setTimeout(() => {
                    this.surePaying = false;
                    if (true) { //验证通过
                        this.showModel = false;
                        this.Toast(this.modelTheme.success);
                        this.initPage();
                    } else {
                        this.error = true;
                    }
                }, 2000);
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
                if (DataFrom.from == 'home') {
                    if (DataFrom.name == '待付款' || DataFrom.name == '待发货') {
                        this.tabIndex = DataFrom.cateid;
                    } else {
                        this.tabIndex = 0;
                    }
                } else if (DataFrom.from == 'searchShop') {
                    searchData = this.Cacher.getData('searchShop') || {};
                    this.searchValue = searchData.value || '';
                    this.billList = testdata(DataFrom.cateid); //测试用的 
                } else {
                    this.billList = testdata(0); //测试用的 
                }
            },
            tabChange(tab) {
                this.curTab = tab;
                this.billList = testdata(tab.cateid); //测试用的 
            },
            search(val) {
                DataFrom = { //这里预先设置返回的页面，由于back()函数无法设置query
                    from: 'searchShop',
                    value: ''
                }
                this.Cacher.setData('bill', {
                    from: 'bill',
                    title: '订单搜索',
                    placeholder: '手机号/微信昵称/姓名'
                })
                uni.navigateTo({
                    url: '../../pagesLogin/pages/searchShop?from=bill'
                })
            },
            clickBill(val) {
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