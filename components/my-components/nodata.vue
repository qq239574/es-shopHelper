<template>
    <view class="noresult">
        <image lazy-load :src='image.img'></image>
        <view>{{tip||image.tip}}</view>
    </view>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: 'nodata', //'nodata,noresult,noweb,fail,nocommission,noshop
            },
            tip: {
                type: String,
                default: '',
            }
        },
        computed: {
            image() {
                let img = {
                    nodata: {
                        img: '/static/img/global/nodata.png',
                        tip: '暂无数据'
                    },
                    noresult: {
                        img: '/static/img/global/noresult.png',
                        tip: "暂无所搜结果"
                    },
                    noweb: {
                        img: '/static/img/global/noweb.png',
                        tip: "暂无网络"
                    },
                    fail: {
                        img: '/static/img/global/failload.png',
                        tip: "加载失败"
                    },
                    nocommission: {
                        img: '/static/img/global/isnot-commission.png',
                        tip: "该用户还不是分销商"
                    },
                    noshop: {
                        img: '/static/img/global/haveNoShops.png',
                        tip: "您暂未拥有任何店铺的管理资格"
                    }
                }
                return img[this.type]
            }
        },
    }
</script>

<style lang="scss" scoped>
    .noresult {
        width: 100%;
        min-height: 200upx;
        display: flex;
        flex-wrap: wrap;
        image {
            width: 150upx;
            height: 184upx;
            margin: 100upx auto 50upx;
        }
        view {
            text-align: center;
            width: 100%;
            font-size: 30upx;
            line-height: 60upx;
        }
    }
</style>