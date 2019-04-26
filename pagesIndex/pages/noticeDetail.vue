<template>
    <view class='notice-detail page'>
        <view class="title">{{notice.title}}</view>
        <view class="subTit">{{notice.date}}</view>
        <view class="brief">简介：{{notice.brief}}</view>
        <rich-text type="text" :nodes="demoHtml"></rich-text>
    </view>
</template>

<script>
    let _self;
    let content = ''
    var graceRichText = require("../../graceUI/jsTools/richText.js");
    export default {
        data() {
            return {
                notice: {},
                demoHtml: ''
            }
        },
        onLoad(option) {
            this.notice = this.Cacher.getData(option.from)
            content = graceRichText.format(this.notice.content);
            this.demoHtml = content;
        }
    }
</script>

<style lang="scss" scoped>
    .notice-detail {
        background: #fff;
    }
    .title {
        width: 680upx;
        margin: auto;
        padding: 28upx 0;
        line-height: 62upx;
        font-size: 48upx;
        font-weight: 600;
        color: #333;
    }
    .subTit {
        width: 680upx;
        line-height: 24upx;
        font-size: 24upx;
        color: #9da3ae;
        margin: 0 auto 48upx;
    }
    .brief {
        width: 680upx;
        padding: 17upx 20upx;
        line-height: 39upx;
        font-size: 24upx;
        color: #6e7685;
        background: #f5f7fa;
        border-radius: 10upx;
        margin: 0 auto 26upx;
    }
    rich-text {
        display: block;
        width: 680upx;
        margin: auto;
        font-size: 30upx;
        font-weight: 500;
        line-height: 48upx;
    }
</style>