<template>
    <view class='vip-list'>
        <itemList :Jurisdiction='Jurisdiction' :toggle='toggle' @click='clickItem' :vipsList='list'></itemList>
        <view class="grace-shade grace-shade-black" v-if="show" @click='closeAll'>
            <view class="  grace-animate fadeIn">
                <view class="body">
                    <view class="box">
                        <view>
                            <image :src="staticUrl" style="width:100%;" mode="widthFix"></image>
                        </view>
                    </view>
                    <view class='share'>
                        <img src="/static/img/global/product_share_link.png" alt=""><img src="/static/img/global/product_share_wechat.svg" alt="">
                    </view>
                </view>
            </view>
        </view>
        <PopUp @close='closeAll' :show='show2'>
            <scroll-view class='scroll' :scroll-y='true'>
                <view class="share-h1">使用小程序推广</view>
                <view class="share-items model">
                    <view class="share-item">
                        <image class='share-img' src='/static/img/global/product_share_download.png'></image>
                        <view class='share-title'>微信好友</view>
                    </view>
                    <view class="share-item">
                        <image class='share-img' src='/static/img/global/product_share_download.png'></image>
                        <view class='share-title'>二维码海报</view>
                    </view>
                </view>
                <view class="share-h1">使用h5推广</view>
                <view class="share-items model">
                    <view class="share-item">
                        <image class='share-img' src='/static/img/global/product_share_download.png'></image>
                        <view class='share-title'>微信好友</view>
                    </view>
                    <view class="share-item">
                        <image class='share-img' src='/static/img/global/product_share_download.png'></image>
                        <view class='share-title'>二维码海报</view>
                    </view>
                    <view class="share-item">
                        <image class='share-img' src='/static/img/global/product_share_link.png'></image>
                        <view class='share-title'>复制链接</view>
                    </view>
                </view>
                <view class="cancel">取消</view>
            </scroll-view>
        </PopUp>
    </view>
</template>

<script>
    import itemList from './VipList--Item.vue';
    import PopUp from '../../components/my-components/PopUp.vue';
    export default {
        components: {
            itemList,
            PopUp
        },
        data() {
            return {
                menuItem: {},
                goodData: {},
                staticUrl: '/static/img/global/tmpAct.png',
                show: false,
                show2: false,
            }
        },
        props: {
            Jurisdiction: {
                type: Object,
                default: {},
                required: true
            },
            list: {
                type: Array,
                default: [{
                    img: '/static/img/global/home_order_tobepay.png',
                    title: '',
                    vipClass: '',
                    tel: '',
                    money: '',
                    score: ''
                }]
            },
            toggle: {
                type: Boolean,
                default: true
            }
        },
        watch: {
            toggle() {
                console.log('tooggle')
                this.show2 = false;
                this.show = false;
            }
        },
        methods: {
            closeAll() {
                this.show = false;
                this.show2 = false;
            },
            clickItem(val) {
               
                this.$emit('click', val)
            },
            showBanner: function() {
                this.show = true;
            },
            closeBanner: function() {
                this.show = false;
            },
        },
    }
</script>

<style lang="scss" scoped>
    .vip-list {
        .box {
            position: relative;
            width: 524upx;
            height: 838upx;
            background: #000;
            margin: 50upx auto 0;
            border-radius: 6upx;
            overflow: hidden;
        }
        .share {
            height: 100upx;
            display: flex;
            justify-content: space-between;
            width: 320upx;
            margin: 52upx auto 0;
            image {
                width: 100upx;
                height: 100upx;
            }
        }
        .share-h1 {
            padding: 0 24upx;
            font-size: 28upx;
        }
        .scroll {
            width: 100%;
            padding: 0 0 60upx;
            ;
            height: fit-content;
            overflow: auto;
            .cancel {
                height: 84upx;
                width: 100%;
                background: #fafafa;
                line-height: 84upx;
                text-align: center;
                font-size: 28upx;
            }
        }
        .model {
            width: 100%;
            top: 0;
            left: 0;
            background: #fff;
            display: flex;
            flex-wrap: nowrap;
            box-sizing: border-box;
            margin: 30upx 0 0;
            position: relative;
            .share-item {
                width: 190upx;
                height: 187upx;
                position: relative;
                background: #fff;
                .share-img {
                    width: 100upx;
                    height: 100upx;
                    margin: auto;
                    display: block;
                }
                .share-title {
                    color: #fff;
                    white-space: nowrap;
                    width: fit-content;
                    text-align: center;
                    margin: auto;
                    bottom: 38upx;
                    font-size: 26upx;
                    color: #6f7685;
                }
            }
            &:after {
                content: '';
                height: 0;
                border-bottom: 1upx solid #eee;
                position: absolute;
                width: 710upx;
                left: 0;
                right: 0;
                margin: auto;
                bottom: 0;
            }
        }
    }
</style>