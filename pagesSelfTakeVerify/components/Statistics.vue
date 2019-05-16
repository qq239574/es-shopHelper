<template>
    <div class='Statistics'>
        <view class="statistic-block" v-for='(item,index) in info' :key='index'>
            <view class="title">{{item.name}}</view>
            <view class="num">{{item.value}}</view>
        </view>
    </div>
</template>

<script>
    let cacheList = [{
        name: '今日核销（单）',
        value: 0
    }, {
        name: '7日核销（单）',
        value: 0
    }, {
        name: '14日核销（单）',
        value: 0
    }, {
        name: '30日核销（单）',
        value: 0
    }];
    export default {
        props: {
            info: {
                type: Array,
                default: cacheList
            }
        }, 
    }
</script>

<style lang="scss" scoped>
    .Statistics {
        width: 728upx;
        margin: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        .statistic-block {
            margin-bottom: 20upx;
            background: #fff;
            width: 340upx;
            height: 322upx;
            text-align: center;
            padding: 60upx 0 84upx 0;
            border-radius: 8upx;
            .title {
                color: #999ca7;
            }
            .num {
                font-size: 72upx;
                font-weight: 700;
            }
        }
    }
</style>