<template>
    <view class='shops-list'>
        <view class='shop-block' v-for='(shop,index) in shops' :key='index' @click='select(shop)'>
            <image :src='shop.img'></image>
            <view class="info">
                <view class="title">{{shop.title}}</view>
                <view class="date">{{shop.left}}</view>
            </view>
            <view class="status">
                <view class="tab" :class='states[shop.status].id'>
                    {{states[shop.status].name}}
                </view>
            </view>
            <view class="icon grace-icons icon-arrow-right" style='color:#5E5E5E;'></view>
        </view>
    </view>
</template>

<script>
    export default {
        props: {
            shops: {
                type: Array,
                default: [{
                    title: '',
                    left: '',
                    status: 0,
                    img: ''
                }]
            }
        },
        data() {
            return {
                states: [{
                    id: 'busy',
                    name: '营业中'
                }, {
                    id: 'close',
                    name: '已打烊'
                }, {
                    id: 'exc',
                    name: '已过期'
                }, {
                    id: 'examing',
                    name: '审核中'
                }, {
                    id: 'disable',
                    name: '已禁用'
                }]
            }
        },
        methods: {
            select(item){
                this.$emit('click',item)
            }
        },
    }
</script>

<style lang="scss" scoped>
    .shops-list {
        width: 100%;
    }
    .shop-block {
        display: flex;
        flex-wrap: nowrap;
        width: 702upx;
        margin: 0 auto 30upx;
        height: 180upx;
        border-radius: 10upx;
        box-shadow: 0 0 32upx rgba(0, 0, 0, .08);
        image {
            width: 110upx;
            height: 110upx;
            margin: auto 0 auto 20upx;
        }
        view {
            margin-left: 20upx;
        }
        .info {
            width: 362upx;
            height: 100%;
            view {
                font-size: 28upx;
                line-height: 28upx;
                height: 28upx;
                font-weight: 600;
                color: #757c89;
            }
            .title {
                color: #495576;
                margin: 60upx 0 0;
            }
            .date {
                margin: 16upx 0 0;
                font-weight: 400;
            }
        }
        .status {
            width: 111upx;
            height: 44upx;
            margin: auto 30upx auto 0;
            .tab {
                width: 100upx;
                height: 44upx;
                border-radius: 6upx;
                background: #bdf1cc;
                color: #16c557;
                font-size: 24upx;
                line-height: 44upx;
                text-align: center;
            }
            .busy {
                background: #bdf1cc;
                color: #16c557;
            }
            .close {
                background: #ffd9bc;
                color: #ff8022;
            }
            .exc {
                background: #c8ccd6;
                color: #495576;
            }
            .examing {
                background: #e1e1e1;
                color: #fff;
            }
            .disable {
                background: #e1e1e1;
                color: #fff;
            }
        }
        .icon {
            margin: auto 20upx auto 0;
            line-height: 50upx;
        }
    }
</style>