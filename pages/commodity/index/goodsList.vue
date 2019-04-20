<template>
    <view class='goods-list'>
        <item @click='clickItem' :goodsList='goodsList' :toggle='toggle'></item>
        <view class="grace-shade grace-shade-black" v-if="show" @click='closeAll'>
            <view class="  grace-animate fadeIn">
                <view class="body">
                    <view class="box">
                        <view>
                            <image :src="staticUrl" style="width:100%;" mode="widthFix"></image>
                        </view>
                    </view>
                    <view class='share'>
                        <img src="/static/img/global/product_share_link.png" alt=""><img src="/static/img/global/product_share_wechat.png" alt="">
                    </view>
                </view>
            </view>
        </view>
        <PopUp @close='closeAll' :show='show2'>
            <scroll-view class='scroll' :scroll-y='true'>
                <view class="share-h1">使用小程序推广</view>
                <view class="share-items model">
                    <view class="share-item" @click='clickModel("小程序","微信好友")'>
                        <image class='share-img' src='/static/img/global/product_share_download.png'></image>
                        <view class='share-title'>微信好友</view>
                    </view>
                    <view class="share-item" @click='clickModel("小程序","二维码海报")'>
                        <image class='share-img' src='/static/img/global/product_share_download.png'></image>
                        <view class='share-title'>二维码海报</view>
                    </view>
                </view>
                <view class="share-h1">使用h5推广</view>
                <view class="share-items model">
                    <view class="share-item" @click='clickModel("h5","微信好友")'>
                        <image class='share-img' src='/static/img/global/product_share_download.png'></image>
                        <view class='share-title'>微信好友</view>
                    </view>
                    <view class="share-item" @click='clickModel("h5","二维码海报")'>
                        <image class='share-img' src='/static/img/global/product_share_download.png'></image>
                        <view class='share-title'>二维码海报</view>
                    </view>
                    <view class="share-item" @click='clickModel("h5","复制链接")'>
                        <image class='share-img' src='/static/img/global/product_share_link.png'></image>
                        <view class='share-title'>复制链接</view>
                    </view>
                </view>
                <view class="cancel" @click='clickModel("cancel")'>取消</view>
            </scroll-view>
        </PopUp>
        <poster :toggle='showPoster' :info='posteInfo' @click='sharePoster'></poster>
    </view>
</template>

<script>
    import item from './goodsList--Item';
    import PopUp from '../../../components/my-components/PopUp.vue';
    import poster from './posterShare.vue'
    import savePic from './savePicToAlbum.js'
    export default {
        components: {
            item,
            PopUp,
            poster
        },
        props: {
            goodsList: {
                type: Array,
                default () {
                    return [{
                        img: '/static/img/global/tmp.png',
                        goodName: '',
                        color: '',
                        size: '',
                        num: 0, //库存
                        price: '0', //价格
                        saled: 0, //销量
                        status: 0 //0出售中,1已售罄,2仓库中,3回收站
                    }]
                }
            },
            toggle: { //隐藏浮层
                type: Boolean,
                default: false
            }
        },
        watch: {
            toggle() {}
        },
        data() {
            return {
                menuItem: {},
                goodData: {},
                staticUrl: '/static/img/global/tmpAct.png',
                show: false,
                show2: false,
                showPoster: false,
                posteInfo: {
                    img: '/static/img/temp/poster.jpg',
                    type: 'mini', //mini:小程序，h5: H5
                }
            }
        },
        methods: {
            sharePoster(val) {//点击海报模板后触发
                console.log(val);
                let that = this;
                if (val.type == 'share') {
                    // uni.showShareMenu({
                    //     title: 'ES业务系统小程序'
                    // })
                } else if (val.type == 'save') {
                    savePic(this, val.info.img); //保存图片至相册
                }
            },
            closeAll() {
                this.show = false;
                this.show2 = false;
            },
            clickItem(val) {
                if (val.type == 'menu-item') {
                    // this.show = true;
                    if (val.name == '编辑') {
                        this.$emit('click', val);
                    } else if (val.name == '下架' || val.name == '上架' || val.name == '恢复' || val.name == '删除') { //需要二次确认
                        this.Dialog.confirm({
                            title: '',
                            message: '您确认' + val.name + '此商品吗？'
                        }).then(() => {
                            this.$emit('click', val)
                        }).catch(() => {
                            // on cancel
                        });
                    } else if (val.name == '推广商品') {
                        this.show2 = true;
                    }
                } else {
                    this.$emit('click', val)
                }
            },  
            clickModel(val1, val2) {
                let that = this;
                if (val1 == '小程序') {
                    if (val2 == '微信好友') { //分享事件onShareAppMessage
                    } else if (val2 == '二维码海报') {
                        this.posteInfo = {
                            img: '/static/img/temp/poster.jpg',
                            type: 'mini', //mini:小程序，h5: H5
                        };
                        this.showPoster = !this.showPoster;
                    }
                } else if (val1 == 'h5') {
                    if (val2 == '微信好友') {} else if (val2 == '二维码海报') {
                        this.showPoster = !this.showPoster;
                        this.posteInfo = {
                            img: '/static/img/temp/poster.jpg',
                            type: 'h5', //mini:小程序，h5: H5
                        }
                    } else if (val2 == '复制链接') {
                        uni.setClipboardData({
                            data: '这是链接',
                            success: function() {
                                that.Toast('链接已复制')
                            }
                        });
                    }
                }  
            }
        }
    }
</script>

<style lang="scss" scoped>
    .goods-list {
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