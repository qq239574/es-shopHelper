<template>
    <view class='my-tabs'>
        <scroll-view class="grace-tab-title grace-center" scroll-x="true" id="grace-tab-title">
            <view class='grace-tab-title__item' v-for="(cate, index) in categories" :key="index" :data-cateid="cate.cateid" :data-index="index" :class="[cateCurrentIndex == index ? 'grace-tab-current' : '']" @tap="tabChange">{{cate.name}}</view>
        </scroll-view>
    </view>
</template>
<script>
    export default {
        props: {
            categories: {
                type: Array,
                default: [{
                        cateid: 0,
                        name: "全部"
                    },
                    {
                        cateid: 1,
                        name: "风景"
                    },
                    {
                        cateid: 2,
                        name: "游记"
                    },
                    {
                        cateid: 3,
                        name: "世界"
                    }
                ],
            }
        },
        data() {
            return {
                // 当前选择的分类
                cateCurrentIndex: 0,
                // 内容实例，内容区域您根据项目情况设计即可，覆盖模式
                content: "全部"
            };
        },
        methods: {
            gotodemo: function() {
                uni.navigateTo({
                    url: '../segmented-control-demo/segmented-control-demo'
                })
            },
            tabChange: function(e) {
                // 选中的索引
                var index = e.currentTarget.dataset.index;
                // 具体的分类id
                var cateid = e.currentTarget.dataset.cateid;
                this.cateCurrentIndex = index;
                // 动态替换内容
                this.$emit('tabChange', {
                    cateid,
                    index
                })
            }
        }
    }
</script>
<style lang='scss'>
    .my-tabs {
        width: 100%;
        margin:0 0 20upx;
        .grace-tab-title {
            width: 100%;
            border: 1upx solid #eee;
        }
        .grace-tab-title__item {
            color: #ccc;
            border: none;
            font-size: 24upx;
        }
    }
    .grace-tab-current {
        color: #000!important;
        border: none!important;
        font-size: 30upx!important;
        font-weight: 600;
        position: relative;
        &:after {
            position: absolute;
            bottom: -1upx;
            content: '';
            background: #fb6638;
            height: 4upx;
            width: 42upx;
            left: 0;
            right: 0;
            margin: auto;
            border-radius: 2upx;
        }
    }
</style>