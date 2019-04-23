<template>
    <div class='notice page'>
        <block v-for='(item,index) in list' :key='index'>
            <item :info='item' @click='clickItem'></item>
        </block>
        <loadMore :loadingType="LoadingType" :loadingText="LoadingText" :show="ShowLoadMore"></loadMore>
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
                list: [{
                    title: '标题',
                    brief: '简介',
                    date: '2019-01-01 12:12:12',
                    img: '/static/img/global/logo.jpg'
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
            }
        },
        onPullDownRefresh() {
        },
        onLoad() {
            this.Request('noticeList').then(res => {
                this.list = res.list.map(item => {
                    return {
                        title: item.title,
                        brief: item.content_text,
                        date: item.create_time,
                        img: item.thumb,
                        content: item.content,
                        
                    }
                })
            })
        }
    }
</script>

<style lang="scss" scoped>
    .notice {}
</style>