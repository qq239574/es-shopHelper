<template>
    <div class='notice page'>
        <block v-for='(item,index) in list' :key='index'>
            <item :info='item' @click='clickItem'></item>
        </block>
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
                }, {
                    title: '标题多浪费空间啊对了疯狂就流口水地方了看见上来看附件是了看见对方离开家',
                    brief: '简介蓝色的看风景绿色空间分类看时间付款了时间分类看时间分类看几点了看法就是离开房间数量看积分了快速减肥流口水发来看看手机了看法就算了可分解落实地方',
                    date: '2019-01-01 12:12:12',
                    img: '/static/img/global/logo.jpg'
                }, {
                    title: '标题多浪费空间啊对了疯狂就流口水地方了看见上来看附件是了看见对方离开家',
                    brief: '简介蓝色的看风景绿色空间分类看时间付款了时间分类看时间分类看几点了看法就是离开房间数量看积分了快速减肥流口水发来看看手机了看法就算了可分解落实地方',
                    date: '2019-01-01 12:12:12',
                    img: ''
                }, ]
            }
        },
        methods: {
            clickItem(val) {
                this.Cacher.setData('noticeList',{from:'noticeList',...val});
                uni.navigateTo({
                    url:'./noticeDetail?from=noticeList'
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .notice {}
</style>