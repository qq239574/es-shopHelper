<template>
    <view class='notice-block' @click='click'>
        <view class="top">
            <view class="left">
                <view class="title">{{info.title}}</view>
                <view class="brief">{{info.brief}}</view>
            </view>
            <view class="right" v-if='info.img'>
                <image lazy-load :src='info.img'></image>
            </view>
        </view>
        <view class="bottom" >
            <view class="date">{{info.date}}</view>
            <view class="check">查看<text class="grace-icons icon-arrow-right" style='color:#5E5E5E;'></text></view>
        </view>
    </view>
</template>

<script>
    export default {
        props:{
            info:{
                title:'标题',
                brief:'简介',
                date:'2019-01-01 12:12:12',
                img:''
            }
        },
        methods: {
            click(){
                this.$emit('click',this.info)
            }
        },
    }
</script>

<style lang="scss" scoped>
    .notice-block {
        width: 726upx;
        height: fit-content;
        border-radius: 10upx;
        background: #fff;
        box-sizing: border-box;
        padding: 30upx 20upx;
        box-shadow: 0 0 20upx rgba(0, 0, 0, .05);
        margin:20upx auto 0;
        .top,
        .bottom {
            width: 100%;
            height: fit-content;
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-between;
            .right {
                width: 140upx;
                image {
                    width: 120upx;
                    height: 120upx;
                    border-radius: 6upx;
                    margin: 0 0 0 20upx;
                }
            }
            .left {
                min-width: 522upx;
                min-height: 122upx;
                .title,
                .brief {
                    width: 100%;
                }
                .title {
                    line-height: 48upx;
                    color: #333;
                    font-size: 34upx;
                }
                .brief {
                    line-height: 38upx;
                    color: #6e7685;
                    font-size: 26upx;
                    padding: 5upx 0;
                }
            }
        }
        .date,
        .check {
            font-size: 24upx;
            color: #9da3ae;
            height: 50upx;
            line-height: 50upx;
        }
    }
</style>