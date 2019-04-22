<template>
    <view class='img-code'>
        <image class='imgCode' :src='imgSrc' @click='refresh'></image>
    </view>
</template>

<script>
    export default {
        props:{
            imageCode:{
                type:String,
                default:''
            }
        },
        data() {
            return {
                imgSrc: 'http://user.qdev.eldev.cn/utility/captcha/get?type=forget&width=135&height=32&timestamp=' + new Date().getTime()
            }
        },
        methods: {
            refresh() {
                this.imgSrc = 'http://user.qdev.eldev.cn/utility/captcha/get?type=forget&width=135&height=32&timestamp=' + new Date().getTime()
            }
        },
        beforeMount() {
            this.refresh();
        },
    }
</script>

<style lang="scss" scoped>
.img-code{
    display: flex;
    flex-wrap: nowrap;
}
    .my-round-button {
        width: 150upx;
        box-sizing: border-box;
        height: 54upx;
        border-radius: 27upx;
        line-height: 52upx;
        text-align: center;
        font-size: 24upx;
        font-weight: 500;
        color: #fb6638;
        border: 1upx solid #fb6638;
    }
    .my-round-button.timing {
        color: #9da3ae;
        border: 1upx solid #9da3ae;
    }
    .imgCode {
        width: 150upx;
        height: 54upx;
        margin: auto 10upx auto 0;
    }
    .password-code {
        display: flex;
        flex-wrap: nowrap;
    }
</style>
