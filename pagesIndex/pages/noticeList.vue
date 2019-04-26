<template>
    <div class='notice page'>
        <block v-for='(item,index) in list' :key='index'>
            <item :info='item' @click='clickItem'></item>
        </block>
        <loadMore :loadingType="LoadingType" :loadingText="LoadingText" :show="ShowLoadMore"></loadMore>
        <view class='load-more' v-if='noticeNum&&ShowLoadMore'>
            <van-loading size='18px' v-if='!LoadingType' />
            <view class='nomore' v-else-if='totalNum>-1&&!requesting'>-没有更多了-</view>
            <view class='nomore' v-else>正在搜索</view>
        </view>
         <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </div>
</template>

<script>
    import item from '../components/Notice-Block'
    let requesting = false;
    let ajaxIndex = 1;
    export default {
        components: {
            item
        },
        data() {
            return {
                noticeNum: 0, //公告条数
                totalNum: -1, //公告总条数
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
                if (!requesting) {
                    requesting = true;
                    this.pageLoading();
                    this.Request('noticeList', {
                        page: ajaxIndex,
                        pageSize: 10
                    }).then(res => {
                        if (res.error == 0) {
                            requesting = false;
                            ajaxIndex++;
                            this.noticeNum=res.count;
                            this.list = this.list.concat(res.list.map(item => {
                                return {
                                    title: item.title,
                                    brief: item.content_text,
                                    date: item.create_time,
                                    img: item.thumb,
                                    content: item.content,
                                }
                            }));
                        } else {
                            this.Toast(res.message)
                        }
                        this.closePageLoading();
                    }).catch(res => {
                        this.Toast(res.message)
                    })
                } else {}
            }
        },
        onPullDownRefresh() {
            requesting = false;
            this.requesting = requesting;
            ajaxIndex = 1; //请求页码初始化
            this.list = [];
            this.LoadingType = 0; //加载更多提示，0加载更多 1已经全部
            this.initPage();
        },
        onReachBottom() {
            if (this.list.length < this.noticeNum) {
                this.initPage();
                this.LoadingType = 0;
            } else {
                this.LoadingType = 1;
            }
        },
        onLoad() {
            this.list = [];
            this.initPage();
        }
    }
</script>

<style lang="scss" scoped>
    .notice {}
</style>