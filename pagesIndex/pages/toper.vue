<template>
    <view class='toper page'>
        <selectItem label='筛选' :value='pageLabel' @click='filteDate'></selectItem>
        <items :pageid='pageId'></items>
    </view>
</template>

<script>
    import selectItem from '../../components/my-components/editBlock-SelectItem'
    import items from '../components/Toper-list.vue'
    import {
        getData
    } from '../../store/cache.js'
    let searchSection = [];
    export default {
        components: {
            selectItem,
            items
        },
        data() {
            return {
                pageId: 'goods',
                pageLabel: '今天'
            }
        },
        onLoad(option) {
            this.pageId = option.show;
            this.initPage();
        },
        onShow() {
            this.initPage();
        },
        methods: {
            initPage() { //初始化页面
                searchSection = getData('filte-date-toper-'+this.pageId) || [getDate(0), getDate(-1), '今天']; //默认今天
                this.pageLabel = searchSection[2];
            },
            filteDate() {
                uni.navigateTo({
                    url: './filterDate?from=toper-' + this.pageId
                })
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>