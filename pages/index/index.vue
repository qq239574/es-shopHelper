<template>
    <view class='page pages-index-index'>
        <view class="tunshop">
            <view class='title van-ellipsis '>
                <van-icon name="shop-o" class='shop-icon' />{{shopName}}
            </view>
            <view class="button" @click='changeShop' v-if='showTurnShop'>
                <image lazy-load src='/static/img/global/turnshop.png'></image>切换店铺</view>
        </view>
        <dataShower :info='showData' @click='toApp' @search='searchData' v-if='Jurisdiction.statistics_index_view'></dataShower>
        <view class="block">
            <selectItem contentStyle='width:100%;' fontStyle='font-weight: 500;' labelStyle='color:#6e7685; ' valueStyle='color:#9da3ae; font-size: 12px;' :label='execInfo.label' :value='execInfo.date' :disabled='true' @click='toPay' v-if='expireDay<31&&expireDay>0'>
                <view class="grace-swiper-msg-icon grace-icons icon-speaker" style='display:inline-block;color:#ff9e56;' slot='icon'></view>
            </selectItem>
            <selectItem contentStyle='width:100%;' fontStyle='font-weight: 500;' :label='newNotice.label' :value='newNotice.date' labelStyle='color:#6e7685;' valueStyle='color:#9da3ae; font-size: 12px;' @click='toNotice' v-if='newNotice.label||newNotice.date'>
                <view class="grace-swiper-msg-icon grace-icons icon-speaker" style='display:inline-block;color:#ff9e56;' slot='icon'></view>
            </selectItem>
        </view>
        <goodsBlock :list='billList' @click='toBill' v-if='Jurisdiction.order_view'></goodsBlock>
        <apps @click='toApp' :Jurisdiction='Jurisdiction'></apps>
        <MyTabbar fontStyle='border-top: 1px solid #f7f8fa' :defaultIndex='0' :Jurisdiction='Jurisdiction'></MyTabbar>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </view>
</template>
<script>
    import LongButton from '../../components/my-components/LongButton'
    import selectItem from '../../components/my-components/editBlock-SelectItem.vue'
    import inputItem from '../../components/my-components/editBlock-InputItem.vue'
    import switchItem from '../../components/my-components/editBlock-SwitchItem.vue'
    import dataShower from './components/IndexDataShower.vue'
    import goodsBlock from './components/IndexGoods.vue'
    import apps from './components/IndexApps.vue'
    import MyTabbar from '../../components/my-components/myTabbar.vue'
    import {
        getDate,
        GetDateDiffNoAbs
    } from '../../components/my-components/getDateSection.js'
    let DataFrom = {};
    let newNotice = {};
    let searchDay = {
        value: 'today'
    };
    import {
        getJurisdiction
    } from '../../components/my-components/getJurisdiction.js'
    export default {
        components: {
            LongButton,
            selectItem,
            inputItem,
            switchItem,
            dataShower,
            goodsBlock,
            apps,
            MyTabbar
        },
        data() {
            return {
                Jurisdiction: {},
                showTurnShop: true,
                billList: [{
                    name: '待发货',
                    num: 0,
                    cateid: 1
                }, {
                    name: '待付款',
                    num: 0,
                    cateid: 0
                }, {
                    name: '维权订单',
                    num: 0,
                    cateid: 0
                }],
                newNotice: { //最新公告
                    label: '',
                    date: ''
                },
                execInfo: { //逾期消息
                    label: '',
                    date: '续费'
                },
                shopName: '',
                genderIndex: 0,
                gender: ['男', '女'],
                dateValue: "请选择",
                showData: {
                    money: 0,
                    payedBill: 0,
                    payedGood: 0,
                    payedVip: 0
                },
                expireDay: 0,
            }
        },
        methods: {
            searchData(val) { //点击今日昨日按钮查询 
                searchDay = val;
                this.pageLoading();
                this.Request('checkDealInfo', {
                    type: val.value
                }).then(res => {
                    this.closePageLoading();
                    if (res.error == 0) {
                        this.showData = {
                            money: res.sell_data.yesterday_turnover,
                            payedBill: res.sell_data.yesterday_order_num,
                            payedGood: res.sell_data.yesterday_goods_num,
                            payedVip: res.sell_data.yesterday_pay_member_num
                        }
                    }
                }).catch(res => {
                    this.Toast(res.message)
                });
            },
            changeShop() {
                this.Cacher.setData('home', {
                    from: 'home',
                    info: {}
                })
                uni.navigateTo({
                    url: '../../pagesLogin/pages/selectShop?from=home&&status=switchShop'
                })
            },
            toApp(val) {
                this.Cacher.setData('home', {
                    from: 'home',
                    info: this.showData,
                })
                if (val.title == '数据统计') {
                    uni.navigateTo({
                        url: '../../pagesIndex/pages/index?from=home'
                    })
                } else if (val.title == '会员管理') {
                    uni.navigateTo({
                        url: '../../pagesIndex/pages/vipManage?from=home'
                    })
                } else if (val.title == '自提核销') {
                    this.closePageLoading();
                    uni.navigateTo({
                        url: '../../pagesSelfTakeVerify/pages/index?from=home'
                    })
                }
            },
            toBill(val) { //跳转订单页
                this.Cacher.setData('home', {
                    from: 'home',
                    ...val,
                    info: this.showData,
                }); //页面传参 
                uni.reLaunch({
                    url: '../bill/index?from=home'
                });
            },
            toPay() {
                this.Dialog.alert({
                    title: '请登录PC端后台进行续费',
                    message: '抱歉~当前版本小程序暂不支持续费操作',
                    confirmButtonText: '知道了'
                }).then(() => {
                    // on close
                });
            },
            toNotice(val) {
                this.Cacher.setData('home', {
                    from: 'home',
                    ...val,
                    list: newNotice
                }); //页面传参
                uni.navigateTo({
                    url: '../../pagesIndex/pages/noticeList?from=home'
                })
            },
            initPage() {
                this.searchData(searchDay); //初始化数据框
                this.Request('homeInfo', {}).then(res => {
                    this.searchData(searchDay);
                    this.shopName = res.shop.name;
                    newNotice = res.notice;
                    this.newNotice = {
                        label: newNotice[0].title || '',
                        date: newNotice[0].date || ''
                    }
                    this.expireDay = Math.round(GetDateDiffNoAbs(res.shop.expire_time, getDate(0)));
                    this.execInfo = { //还没写过期的功能？？？？
                        label: '还有' + Math.ceil(this.expireDay) + '天到期',
                        date: '续费'
                    }
                    this.billList = [{
                        name: '待发货',
                        num: res.data.order_wait_send,
                        cateid: 1
                    }, {
                        name: '待付款',
                        num: res.data.order_wait_pay,
                        cateid: 0
                    }, {
                        name: '维权订单',
                        num: res.data.order_refund
                    }]
                })
                let userInfo = this.Cacher.getData('login');
                // if (!userInfo.haveBindWx && userInfo.encryptedData) {
                //     this.closePageLoading();
                //     this.Dialog.confirm({
                //         title: '没有绑定微信',
                //         message: '为方便您的使用，是否与微信账号绑定？',
                //         confirmButtonText: '绑定'
                //     }).then(() => {
                //         this.pageLoading();
                //         this.Request('bindWechat', {
                //             encrypted_data: userInfo.encryptedData,
                //             session_key: userInfo.session_key,
                //             iv: userInfo.iv,
                //             user_id: userInfo.userId
                //         }).then(res => {
                //             this.closePageLoading();
                //             if (res.error == 0) {
                //                 this.Toast('绑定成功')
                //             } else {
                //                 this.Toast('绑定失败')
                //             }
                //         }).catch(res => {
                //             this.closePageLoading();
                //             this.Toast(res.message)
                //         })
                //     });
                // }
            }
        },
        onPullDownRefresh() {
            this.initPage();
        },
        onLoad(option) {
            uni.hideTabBar({ //隐藏tabbar
                animation: false
            })
            // if (option.from && option.from == 'selectShop') {
            DataFrom = this.Cacher.getData(option.from);
            this.shopName = DataFrom.title;
            if (option && option.status == 'onlyOne') {
                this.showTurnShop = false;
            }
            getJurisdiction.call(this).then(res => {
                this.Jurisdiction = res;
            }).catch(res => {
                this.Toast(res.message)
            })
            // }
        },
        onShow() {
            this.initPage();
        }
    }
</script>
<style lang="scss" scoped>
    .pages-index-index {
        background: #f3f5f9;
        .shop-icon {
            line-height: 88upx;
            height: 88upx;
            margin: 0 5upx 0 0;
            box-sizing: border-box;
        }
        .tunshop {
            vertical-align: text-bottom;
            width: 100%;
            height: 88upx;
            display: flex;
            justify-content: space-between;
            box-sizing: border-box;
            padding: 0 24upx;
            .button {
                margin: auto 0;
                font-size: 26upx;
                border: 1upx solid #bdc8df;
                line-height: 40upx;
                text-align: center;
                color: #6e7685;
                border-radius: 20upx;
                box-sizing: border-box;
                min-width: 170upx;
                width: fit-content;
                white-space: nowrap;
                padding: 0 16upx;
                image {
                    width: 20upx;
                    height: 22upx;
                    display: inline-block;
                    margin-right: 8upx;
                }
            }
            .title {
                height: 100%;
                line-height: 86upx;
                font-size: 26upx;
                color: #6e7685; // max-width: 510upx;
                position: relative;
                padding-left: 30upx;
                .shop-icon {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    left: 0;
                }
            }
        }
        .block {
            background: #fff;
            width: 704upx;
            margin: 0 auto 24upx;
            border-radius: 8upx;
            overflow: hidden;
            .grace-icons {
                margin: 0 12upx 0 24upx;
            }
        }
    }
</style>
