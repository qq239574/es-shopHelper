<template>
    <div class='qrcode-share page' @longtap='longtap'>
        <canvas style="width: 200px; height: 200px;background:#fff;" id='myQrcode' canvas-id="myQrcode" v-show='show'></canvas>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </div>
</template>

<script>
    import drawQrcode from '../../components/my-components/weapp.qrcode.esm.js'
    import savePic from '../../pages/commodity/index/savePicToAlbum.js'
    export default {
        data() {
            return {
                webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                },
                from: '',
                show:true
            }
        },
        methods: {
            longtap() {
                let that = this;
                this.closePageLoading();
                this.show=false;
                this.Dialog.confirm({
                    title: '保存',
                    message: '保存二维码到本地相册'
                }).then(() => {
                    this.show=true;
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
                     this.show=true;
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
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            margin: auto;
        }
    }
</style>