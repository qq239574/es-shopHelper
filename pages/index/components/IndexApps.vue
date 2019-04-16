<template>
    <view class='index-apps'>
        <view class="block">
            <view class="items" v-for='(item,index) in list' :key='index' @click='click(item)'>
                <image lazy-load :src='item.img'></image>
                <view class="title">{{item.title}}</view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        props: {
            list: {
                type: Array,
                default: [{
                    img: '/static/img/global/tmp.png',
                    title: "会员管理",
                    url: ''
                }, {
                    img: '/static/img/global/tmp.png',
                    title: "自提核销",
                    url: ''
                }, {
                    img: '/static/img/global/tmp.png',
                    title: "数据统计",
                    url: ''
                }]
            }
        },
        methods: {
            click(item) {
                this.$emit('click', item)
            }
        },
    }
</script>

<style lang="scss" scoped>
    .index-apps {
        width: 100%;
        .block {
            box-sizing: border-box;
            background: #fff;
            width: 704upx;
            margin: 24upx auto 0;
            border-radius: 8upx;
            display: flex;
            flex-wrap: wrap;
            padding: 20upx 0;
            .items {
                width: 25%;
                height: 131upx;
                box-sizing: border-box;
                image {
                    width: 61upx;
                    height: 48upx;
                    display: block;
                    margin: 15upx auto 0;
                }
                .title {
                    width: 100%;
                    line-height: 22upx;
                    font-size: 22upx;
                    height: 22upx;
                    text-align: center;
                    margin: 20upx 0 0;
                    color: #495576;
                }
            }
        }
    }
</style>