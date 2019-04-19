<template>
    <view class='addition-block'>
        <view class="block">
            <view class="title">
                <view class="left">备注人：{{info.name}}</view>
                <view class="right">{{info.date}}</view>
            </view>
            <view class="body">
               {{info.content}}
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        props: {
            info: {
                name: '',
                date:'',
                content:''
            }
        }
    }
</script>

<style lang="scss" scoped>
    .addition-block {
        width: 100%;
        margin: 0 auto 20upx;
        .block {
            width: 710upx;
            margin: auto;
            box-sizing: border-box;
            padding: 7upx 25upx 27upx;
            background: #fff;
            border-radius: 10upx;
            .title {
                width: 100%;
                height: 71upx;
                display: flex;
                flex-wrap: nowrap;
                justify-content: space-between;
                .left,
                .right {
                    height: 100%;
                    width: fit-content;
                    line-height: 70upx;
                }
                .left {
                    font-size: 26upx;
                    color: 333;
                    font-weight: 600;
                }
                .right {
                    font-size: 20upx;
                    color: #9ca1ab;
                }
            }
            .body {
                width: 100%;
                font-size: 26upx;
                color: #333;
                line-height: 41upx;
            }
        }
    }
</style>