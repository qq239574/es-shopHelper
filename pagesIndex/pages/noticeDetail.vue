<template>
    <view class='notice-detail page'>
        <view class="title">热烈庆贺易联互动2019年年会圆满完成</view>
        <view class="subTit">易联互动 2019-01-11 14:25</view>
        <view class="brief">简介：谁看见的回复可见还是空间发挥开始结合妇科技术的开发将联合谁看见的回复可见时候到付款还是看风景很少看到金凤凰看实践活动付款就是对方空间还是打开房间还是风景客户谁看见大富豪水库将东方红看实践活动疯狂就收到货分</view>
        <rich-text type="text" :nodes="demoHtml"></rich-text>
    </view>
</template>

<script>
    let _self;
    let content=''
    var graceRichText = require("../../graceUI/jsTools/richText.js");
    export default {
        data() {
            return {
                demoHtml: ''
            }
        },
        onLoad() {
            content= graceRichText.format(' <p>1111</p> <p>2222</p> <p>333</p> <img src="/static/img/global/cart.png" alt="">');
            this.demoHtml=content; 
        }
    }
</script>

<style lang="scss" scoped>
.notice-detail{
    background: #fff;
}
    .title{
        width:680upx;
        margin:auto;
        padding: 28upx 0;
        line-height: 62upx;
        font-size: 48upx;
        font-weight: 600;
        color:#333;
    }
    .subTit{
        width:680upx;
        line-height: 24upx;
        font-size: 24upx;
        color:#9da3ae;
        margin:0 auto 48upx;
    }
    .brief{
        width:680upx;
        padding: 17upx 20upx;
        line-height: 39upx;
        font-size: 24upx;
        color:#6e7685;
        background: #f5f7fa;
        border-radius: 10upx;
        margin:0  auto 26upx;
    }
    rich-text{
        display: block;
        width:680upx;
        margin:auto;
        font-size: 30upx;
        font-weight: 500;
        line-height: 48upx;
    }
</style>