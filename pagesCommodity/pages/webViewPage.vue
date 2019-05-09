<template>
    <div class='qrcode-share page' @longtap='longtap'>
        <view class='tip'>长按下载二维码</view>
        <canvas style="width: 200px; height: 200px;background:#fff;" id='myQrcode' canvas-id="myQrcode" v-show='show'></canvas>
        <view class="footer">
            <longButton @click='sure'>回到首页</longButton>
        </view>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </div>
</template>

<script>
    import drawQrcode from '../../components/my-components/weapp.qrcode.esm.js'
    import savePic from '../../pages/commodity/index/savePicToAlbum.js'
    import longButton from '../../components/my-components/LongButton.vue'
    export default {
        components: {
            longButton
        },
        data() {
            return {
                webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                },
                from: '',
                show: true
            }
        },
        methods: {
            sure() {
                uni.reLaunch({
                    url: '/pages/index/index'
                })
            },
            longtap() {
                let that = this;
                this.closePageLoading();
                this.show = false;
                this.Dialog.confirm({
                    title: '保存',
                    message: '保存二维码到本地相册'
                }).then(() => {
                    this.show = true;
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
                    }) // on cancel
                }).catch(() => {
                    this.show = true;
                });
            }
        },
        onLoad(option) {
            this.from = decodeURIComponent(option.url);
            let ctx = uni.createCanvasContext('myQrcode');
            drawQrcode({ //二维码生成
                width: 200,
                height: 200,
                canvasId: 'myQrcode',
                ctx: ctx,
                text: this.from,
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
        }
    }
</script>

<style lang="scss" scoped>
    .qrcode-share {
        position: relative;
        canvas {
            position: absolute;
            top: 300upx;
            right: 0;
            left: 0;
            bottom: 0; margin:0 auto;
        }
        .tip {
            font-size: 24upx;
            width: 100%;
            position: absolute;
            top: 200upx;
            left: 0;
            text-align: center;
            color: #aaa;
        }
        .footer {
            position: fixed;
            height: 124upx;
            width: 100%;
            border-top: 1upx solid #eee;
            background: #fff;
            bottom: 0;
            left: 0;
            box-shadow: 0 0 10upx 0 rgba(0, 0, 0, .1);
            z-index: 1000;
            overflow: hidden;
            padding-top: 18upx;
            box-sizing: border-box;
            long-button {
                margin: 10upx auto 0;
            }
        }
    }
</style>