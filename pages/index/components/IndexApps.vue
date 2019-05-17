<template>
    <view class='index-apps' v-if='showApps.length'>
        <view class="block">
            <view class="items" v-for='(item,index) in showApps' :key='index' @click='click(item)'>
                <image lazy-load mode='aspectFit' :src='item.img'></image>
                <view class="title">{{item.title}}</view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        props: {
            Jurisdiction: {
                type: Object,
                default: {},
                required: true
            },
            list: {
                type: Array,
                default: [{
                    img: '/static/img/global/vip-manage.png',
                    title: "会员管理",
                    url: ''
                }, {
                    img: '/static/img/global/self-paybuy.png',
                    title: "自提核销",
                    url: ''
                }, {
                    img: '/static/img/global/calcu-data.png',
                    title: "数据统计",
                    url: ''
                }]
            }
        },
        computed: {
            showApps() {
                return this.list.filter((item, index) => {
                    if (index == 2) {
                        return this.Jurisdiction['statistics_index_view']
                    } else if (index == 0) {
                        return this.Jurisdiction['member_list_view']
                    } else if (index == 1) {
                        return this.Jurisdiction['apps_index_manage-wxapp']
                    }
                    return true;
                })
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
        margin: 0 auto 30upx;
        .block {
            box-sizing: border-box;
            background: #fff;
            width: 704upx;
            margin: 0 auto  ;
            border-radius: 8upx;
            display: flex;
            flex-wrap: wrap;
            padding: 20upx 0;
            .items {
                width: 25%;
                height: 131upx;
                box-sizing: border-box;
                image {
                    width: 61upx; // height: 48upx;
                    max-height: 48upx;
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