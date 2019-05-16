<template>
    <view class='my-tabbar'>
        <view v-for='(item,index) in list' :key='index' @click='click(item,index)' class='i-tab-bar-item'>
            <image lazy-load :src='item.selectedIconPath' class='i-tab-bar-item-img' v-if='curIndex==index'></image>
            <image lazy-load :src='item.iconPath' class='i-tab-bar-item-img' v-else></image>
            <view class="i-tab-bar-item-title">
                {{item.text}}
            </view>
        </view>
    </view>
</template>

<script>
    let cacheList = [{
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "/static/img/tabbar/tab_home.png",
        "selectedIconPath": "/static/img/tabbar/tab_home1.png"
    }, {
        "pagePath": "pages/commodity/index",
        "text": "商品",
        "iconPath": "/static/img/tabbar/tab_goods.png",
        "selectedIconPath": "/static/img/tabbar/tab_goods1.png"
    }, {
        "pagePath": "pages/bill/index",
        "text": "订单",
        "iconPath": "/static/img/tabbar/tab_order.png",
        "selectedIconPath": "/static/img/tabbar/tab_order1.png"
    }, {
        "pagePath": "pages/self/index",
        "text": "我的",
        "iconPath": "/static/img/tabbar/tab_me.png",
        "selectedIconPath": "/static/img/tabbar/tab_me1.png"
    }];
    export default {
        props: {
            defaultIndex: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                curIndex: 0,
                "list": [{
                    "pagePath": "/pages/index/index",
                    "text": "首页",
                    "iconPath": "/static/img/tabbar/tab_home.png",
                    "selectedIconPath": "/static/img/tabbar/tab_home1.png"
                }, {
                    "pagePath": "/pages/commodity/index",
                    "text": "商品",
                    "iconPath": "/static/img/tabbar/tab_goods.png",
                    "selectedIconPath": "/static/img/tabbar/tab_goods1.png"
                }, {
                    "pagePath": "/pages/bill/index",
                    "text": "订单",
                    "iconPath": "/static/img/tabbar/tab_order.png",
                    "selectedIconPath": "/static/img/tabbar/tab_order1.png"
                }, {
                    "pagePath": "/pages/self/index",
                    "text": "我的",
                    "iconPath": "/static/img/tabbar/tab_me.png",
                    "selectedIconPath": "/static/img/tabbar/tab_me1.png"
                }]
            }
        },
        mounted() {
            this.curIndex = this.defaultIndex; 
        },
        watch: {
            defaultIndex() {
                this.curIndex = this.defaultIndex; 
            }
        },
        methods: {
            click(item, index) {
                this.curIndex = index;
                uni.reLaunch({
                    url: item.pagePath
                });
            }
        },
    }
</script>

<style lang="scss" scoped>
    .my-tabbar {
        height: 100upx;
        background: #fff;
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        position: fixed;
        bottom: 0;
        left: 0;
        border-top: 1upx solid #ccc;
        .i-tab-bar-item {
            flex: 1;
            display: flex;
            width: 100%;
            -webkit-box-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            align-items: center;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            flex-direction: column;
            text-align: center
        }
        .i-tab-bar-item-img {
            display: flex;
            -webkit-box-pack: center;
            justify-content: center;
            box-sizing: border-box;
            width: 56upx;
            height: 56upx
        }
        .i-tab-bar-item-title {
            font-size: 10px;
            margin: 3px 0 0;
            line-height: 1;
            text-align: center;
            box-sizing: border-box;
            color: #80848f
        }
        .i-tab-bar-item-img {
            display: flex;
            -webkit-box-pack: center;
            justify-content: center;
            box-sizing: border-box;
            color: #80848f
        }
    }
</style>