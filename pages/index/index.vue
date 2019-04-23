<template>
    <view class='page pages-index-index'>
        <view class="tunshop">
            <view class='title van-ellipsis '>
                <van-icon name="shop-o" class='shop-icon' />{{shopName}}
            </view>
            <view class="button" @click='changeShop' v-if='!onlyOneShop'>
                <image lazy-load src='/static/img/global/turnshop.png'></image>切换店铺</view>
        </view>
        <dataShower :info='showData' @click='toApp' @search='searchData'></dataShower>
        <view class="block">
            <selectItem contentStyle='width:100%;' labelStyle='color:#6e7685;' valueStyle='color:#9da3ae;' :label='execInfo.label' :value='execInfo.date' :disabled='true' @click='toPay'>
                <view class="grace-swiper-msg-icon grace-icons icon-speaker" style='display:inline-block;color:#ff9e56;' slot='icon'></view>
            </selectItem>
            <selectItem contentStyle='width:100%;' :label='newNotice.label' :value='newNotice.date' labelStyle='color:#6e7685;' valueStyle='color:#9da3ae;' @click='toNotice'>
                <view class="grace-swiper-msg-icon grace-icons icon-speaker" style='display:inline-block;color:#ff9e56;' slot='icon'></view>
            </selectItem>
        </view>
        <goodsBlock @click='toBill'></goodsBlock>
        <apps @click='toApp'></apps>
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
    let DataFrom = {};
    let newNotice = {};
    export default {
        components: {
            LongButton,
            selectItem,
            inputItem,
            switchItem,
            dataShower,
            goodsBlock,
            apps
        },
        data() {
            return {
                newNotice: { //最新公告
                    label: '',
                    date: ''
                },
                execInfo: { //逾期消息
                    label: '',
                    date: ''
                },
                shopName: '',
                genderIndex: 0,
                gender: ['男', '女'],
                dateValue: "请选择",
                onlyOneShop: false,
                showData: {
                    money: 22110,
                    payedBill: 10,
                    payedGood: 110,
                    payedVip: 2110
                }
            }
        },
        methods: {
            searchData(val) { //点击今日昨日按钮查询
                console.log(val);
                this.pageLoading();
                setTimeout(() => {
                    this.closePageLoading();
                    this.showData = {
                        money: Math.random() * 10000,
                        payedBill: Math.random() * 1000,
                        payedGood: Math.random() * 1000,
                        payedVip: Math.random() * 1000,
                    }
                }, 1000)
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
                    this.Toast('暂未开放')
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
                    list:newNotice
                }); //页面传参
                uni.navigateTo({
                    url: '../../pagesIndex/pages/noticeList?from=home'
                })
            }
        },
        onLoad(option) {
            // if (option.from && option.from == 'selectShop') {
            DataFrom = this.Cacher.getData(option.from);
            this.shopName = DataFrom.title; 
            this.Request('homeInfo').then(res => {
                this.shopName = res.shop.name;
                this.showData = {
                    money: res.data.today_payment_amount,
                    payedBill: res.data.today_order_paid,
                    payedGood: -1,
                    payedVip: -1
                }
                newNotice = res.notice.sort((a, b) => {
                    return new Date('2019-' + a.date) - new Date('2019-' + b.date)
                }); 
                this.newNotice = {
                    label: newNotice[0].title,
                    date: newNotice[0].date
                }
                this.execInfo = {//还没写过期的功能？？？？
                    label: '',
                    date: ''
                }
            })
            // }
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
                font-size: 24upx;
                border: 1upx solid #bdc8df;
                line-height: 40upx;
                text-align: center;
                color: #6e7685;
                border-radius: 20upx;
                box-sizing: border-box;
                min-width: 170upx;
                width: fit-content;
                white-space: nowrap;
                padding: 0 20upx;
                image {
                    width: 20upx;
                    height: 22upx;
                    display: inline-block;
                    margin-right: 8upx;
                }
            }
            .title {
                height: 100%;
                line-height: 88upx;
                font-size: 24upx;
                color: #6e7685; // max-width: 510upx;
            }
        }
        .block {
            background: #fff;
            width: 704upx;
            margin: 24upx auto 0;
            border-radius: 8upx;
            .grace-icons {
                margin: 0 12upx 0 24upx;
            }
        }
    }
</style>
