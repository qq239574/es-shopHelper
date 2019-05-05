<template>
    <view class='shops-list'>
        <view class='shop-block' @click='select(shop)' v-for='(shop,index) in shops' :key='index' :class="states[shop.statusText]||'disable'">
            <image :src='shop.img' lazy-load style='border-radius:50%;'></image>
            <view class="info">
                <view class="title">{{shop.title}}</view>
                <view class="date">{{shop.left}}</view>
            </view>
            <view class="status">
                <view class="tab"  :class="states[shop.statusText]||'disable'">
                    {{shop.statusText}}
                </view>
            </view>
            <view class="icon grace-icons icon-arrow-right" style='color:#5E5E5E;'></view>
        </view>
        <view class="img" v-if='!shops.length'>
            <image lazy-load src='/static/img/global/haveNoShops.png'></image>
            <view class="h1">
                {{total?'没有搜索到任何店铺':'您暂未拥有任何店铺的管理资格'}}
            </view>
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
                    is_checked: 0,
                    statusText: "",
                    img: '',
                    shopInfo: {}
                }]
            },
            total: {
                type: Number,
                default: 0
            }
        }, 
        data() {
            return {
                states: {
                    '营业中': 'busy',
                    "已打烊": "close",
                    "已过期": "exc",
                    "已禁用": "disable"
                }
            }
        },
        methods: {
            
            bgGray(shop) {
                return (this.shop.id == 'disable' || this.shop.id == 'examing') ? 'background:"#f4f4f4"' : '';
            },
            select(item) {
                if (item.statusText == '营业中' || item.statusText == '已打烊' || item.statusText == '已过期') { //营业中、已打烊、已过期的店铺，点击进入小程序
                    this.$emit('click', item)
                } else {
                    this.Dialog.alert({
                        title: '请登录PC端后台管理此店铺',
                        message: '小程序仅支持管理“营业中”、“已打烊”和“已过期”状态的店铺'
                    }).then(() => {
                        // on close
                    });
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .shops-list {
        width: 100%;
        .img {
            display: flex;
            flex-wrap: wrap;
            margin: 100upx;
            image {
                width: 150upx;
                height: 184upx;
                margin: 50upx auto;
            }
        }
        .h1 {
            text-align: center;
            width: 100%;
            color: #666;
        }
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
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
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
        &.disable,
        &.examing {
            background: #f4f4f4;
            .info {
                .title,
                .date {
                    color: #9fa2aa;
                }
            }
        }
    }
</style>