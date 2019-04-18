<template>
    <view class='page pages-index-index'>
        <view class="tunshop">
            <view class='title'>
                花花的店铺-网红自营直销第一店铺
            </view>
            <view class="button" @click='changeShop'>
                <image lazy-load src='/static/img/global/turnshop.png'></image>切换店铺</view>
        </view>
        <dataShower></dataShower>
        <view class="block">
            <inputItem contentStyle='width:100%;' labelStyle='color:#6e7685;' valueStyle='color:#9da3ae;' label='还有29天到期' value='续费' @click='toPay'>
                <view class="grace-swiper-msg-icon grace-icons icon-speaker" style='display:inline-block;color:#ff9e56;' slot='icon'></view>
            </inputItem>
            <selectItem label='微信系统于7月10日出现警告' value='03-28' labelStyle='color:#6e7685;' valueStyle='color:#9da3ae;' @click='toNotice'>
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
                genderIndex: 0,
                gender: ['男', '女'],
                dateValue: "请选择"
            }
        },
        methods: {
            changeShop() {
                uni.navigateTo({
                    url: '../../pagesLogin/pages/selectShop?from=home&&status=switchShop'
                })
            },
            toApp(val) {
                if (val.title == '数据统计') {
                    uni.navigateTo({
                        url: '../../pagesIndex/pages/index'
                    })
                } else if (val.title == '会员管理') {
                    uni.navigateTo({
                        url: '../../pagesIndex/pages/vipManage'
                    })
                } else if (val.title == '自提核销') {}
            },
            toBill(val) {
                console.log(val);
            },
            toPay() {
                this.Toast('暂未开通该业务')
            },
            toNotice(val) {
                this.Cacher.setData('home',{from:'home',...val});//页面传参
                uni.navigateTo({
                    url: '../../pagesIndex/pages/noticeList?from=home'
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .pages-index-index {
        background: #f3f5f9;
        .tunshop {
            width: 100%;
            height: 88upx;
            display: flex;
            justify-content: space-between;
            box-sizing: border-box;
            padding: 0 24upx;
            .button {
                margin: auto 0;
                font-size: 24upx;
                border: 1upx solid #dbc8df;
                line-height: 40upx;
                text-align: center;
                color: #6e7685;
                border-radius: 20upx;
                box-sizing: border-box;
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
                color: #6e7685;
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
