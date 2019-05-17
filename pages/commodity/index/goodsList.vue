<template>
    <view class='goods-list'>
        <item :Jurisdiction='Jurisdiction' @click='clickItem' :goodsList='goodsList' :toggle='toggle'></item>
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
                <view class="share-h1">商品推广</view>
                <view class="share-items model">
                    <view class="share-item" @click='clickModel("h5","微信好友")'>
                        <image class='share-img' src='/static/img/global/product_share_download.png'></image>
                        <view class='share-title'>微信好友</view>
                        <button open-type='share' id='shareByH5' class='open-share'></button>
                    </view>
                    <view class="share-item" @click='clickModel("h5","二维码")'>
                        <image class='share-img' src='/static/img/global/product_share_download.png'></image>
                        <view class='share-title'>二维码</view>
                    </view>
                    <view class="share-item" @click='clickModel("h5","复制链接")'>
                        <image class='share-img' src='/static/img/global/product_share_link.png'></image>
                        <view class='share-title'>复制链接</view>
                    </view>
                </view>
                <view class="cancel" @click='clickModel("cancel")'>取消</view>
            </scroll-view>
        </PopUp>
        <poster :toggle='showPoster' :info='posteInfo' @click='sharePoster'>
            <slot></slot>
        </poster>
    </view>
</template>

<script>
    import item from './goodsList--Item.vue';
    import PopUp from '../../../components/my-components/PopUp.vue';
    import poster from './posterShare.vue'
    import savePic from './savePicToAlbum.js'
    import drawQrcode from '../../../components/my-components/weapp.qrcode.esm.js'
    let cacheGood = {};
    let shareInfo = {}; //分享商品信息
    let shareData = {}; //
    export default {
        components: {
            item,
            PopUp,
            poster
        },
        props: {
            Jurisdiction: {
                type: Object,
                default: {},
                required: true
            },
            userChannels: { // 业务端启用状态 0: 未启用 1: 已经启用
                type: Object,
                default: {
                    h5: 0,
                    wxapp: 0
                }
            },
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
                        status: 0, //0出售中,1已售罄,2仓库中,3回收站 
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
            sharePoster(val) { //点击海报模板后触发
                let that = this;
                if (val.type == 'share') {
                    // uni.showShareMenu({
                    //     title: 'ES业务系统小程序'
                    // })
                } else if (val.type == 'save') { //保存二维码到相册
                    uni.canvasToTempFilePath({
                        x: 0,
                        y: 0,
                        width: 200,
                        height: 200,
                        destWidth: 200,
                        destHeight: 200,
                        canvasId: 'myQrcode',
                        success: function(res) {
                            savePic(that, res.tempFilePath); //保存图片至相册 
                        }
                    })
                }
            },
            closeAll() {
                this.show = false;
                this.show2 = false;
            },
            clickItem(val) {
                cacheGood = val;
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
                        this.pageLoading();
                        this.Request('introGoodInfo', {
                            id: cacheGood.detail.goodId
                        }).then(res => {
                            if (!res.error) {
                                shareInfo = res;
                                this.show2 = true;
                                this.$emit('shareGoodInfo', Object.assign(val, {
                                    shareByWxApp: res.wx_app_qrcode,
                                    shareByH5: res.goods_url
                                }))
                            }
                        }).catch(res => {
                            that.Toast(res.message)
                        })
                    }
                } else {
                    this.$emit('click', val)
                }
            },
            clickModel(val1, val2) {
                let that = this;
                this.pageLoading();
                if (val1 == '小程序') {} else if (val1 == 'h5') {
                    if (val2 == '微信好友') {} else if (val2 == '二维码') {
                        this.showPoster = !this.showPoster;
                        let ctx = uni.createCanvasContext('myQrcode')
                        drawQrcode({ //二维码生成
                            width: 200,
                            height: 200,
                            canvasId: 'myQrcode',
                            ctx: ctx,
                            text: shareInfo.goods_url,
                            // v1.0.0+版本支持在二维码上绘制图片
                            image: {
                                imageResource: '',
                                dx: 70,
                                dy: 70,
                                dWidth: 60,
                                dHeight: 60
                            },
                            callback() {}
                        })
                    } else if (val2 == '复制链接') {
                        if (shareInfo.goods_url) {
                            uni.setClipboardData({
                                data: shareInfo.goods_url,
                                success: function() {
                                }
                            });
                        } else {
                            this.Toast('复制链接失败')
                        }
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
            height: 500upx;
            position: relative;
            overflow: auto;
            box-sizing: border-box;
            .cancel {
                position: absolute;
                bottom: 0;
                left: 0;
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
                .open-share {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    opacity: 0;
                }
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