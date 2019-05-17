<template>
    <view style='width:100%;hieght:100upx;'>
        <view class='my-tabbar'>
            <view v-for='(item,index) in showList' :key='index' @click='click(item,index)' class='i-tab-bar-item'>
                <image lazy-load :src='item.selectedIconPath' class='i-tab-bar-item-img' v-if='item.index==defaultIndex'></image>
                <image lazy-load :src='item.iconPath' class='i-tab-bar-item-img' v-else></image>
                <view class="i-tab-bar-item-title">
                    {{item.text}}
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        props: {
            defaultIndex: {
                type: Number,
                default: 0
            },
            Jurisdiction: {
                type: Object,
                default: {}
            },
        },
        computed: {
            showList() {
                if (typeof this.Jurisdiction['goods_view'] == 'boolean') {
                    return this.list.filter(item => {
                        if (item.text == '商品') {
                            return this.Jurisdiction['goods_view'];
                        } else if (item.text == '订单') {
                            return this.Jurisdiction['order_view'];
                        }
                        return true
                    })
                } else {
                    return []
                }
            }
        },
        data() {
            return {
                "list": [{
                    "pagePath": "/pages/index/index",
                    "text": "首页",
                    index: 0,
                    "iconPath": "/static/img/tabbar/tab_home.png",
                    "selectedIconPath": "/static/img/tabbar/tab_home1.png"
                }, {
                    "pagePath": "/pages/commodity/index",
                    "text": "商品",
                    index: 1,
                    "iconPath": "/static/img/tabbar/tab_goods.png",
                    "selectedIconPath": "/static/img/tabbar/tab_goods1.png"
                }, {
                    "pagePath": "/pages/bill/index",
                    "text": "订单",
                    index: 2,
                    "iconPath": "/static/img/tabbar/tab_order.png",
                    "selectedIconPath": "/static/img/tabbar/tab_order1.png"
                }, {
                    "pagePath": "/pages/self/index",
                    "text": "我的",
                    index: 3,
                    "iconPath": "/static/img/tabbar/tab_me.png",
                    "selectedIconPath": "/static/img/tabbar/tab_me1.png"
                }]
            }
        },
        methods: {
            click(item, index) {
                uni.switchTab({
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