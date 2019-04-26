<template>
    <div class='notice page'>
        <block v-for='(item,index) in list' :key='index'>
            <item :info='item' @click='clickItem'></item>
        </block>
        <loadMore :loadingType="LoadingType" :loadingText="LoadingText" :show="ShowLoadMore"></loadMore>
        <view class='load-more' v-if='shopNum&&ShowLoadMore'>
            <van-loading size='18px' v-if='!LoadingType' />
            <view class='nomore' v-else-if='totalShop>-1&&!requesting'>-没有更多了-</view>
            <view class='nomore' v-else>正在搜索</view>
        </view>
    </div>
</template>

<script>
    import item from '../components/Notice-Block'
    export default {
        components: {
            item
        },
        data() {
            return {
                shopNum: 0,
                requesting: false, //是否正在请求
                list: [{
                    title: '标题',
                    brief: '简介',
                    date: '',
                    img: ''
                }]
            }
        },
        methods: {
            clickItem(val) {
                this.Cacher.setData('noticeList', {
                    from: 'noticeList',
                    ...val
                });
                uni.navigateTo({
                    url: './noticeDetail?from=noticeList'
                })
            },
            initPage() {
                this.pageLoading();
                this.Request('noticeList').then(res => {
                    this.list = res.list.map(item => {
                        return {
                            title: item.title,
                            brief: item.content_text,
                            date: item.create_time,
                            img: item.thumb,
                            content: item.content,
                        }
                    });
                    this.closePageLoading();
                })
            }
        },
        onPullDownRefresh() {
            this.initPage();
        },
        onLoad() {
            this.initPage();
        }
    }
</script>

<style lang="scss" scoped>
    .notice {}
</style>