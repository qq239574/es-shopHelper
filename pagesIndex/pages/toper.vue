<template>
    <view class='toper page'>
        <selectItem label='筛选' :value='pageLabel' @click='filteDate'></selectItem>
        
        <items :list='list' :pageid='pageId'></items>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
    import selectItem from '../../components/my-components/editBlock-SelectItem'
    import items from '../components/Toper-list.vue'
    import {
        getDate
    } from '../../components/my-components/getDateSection.js'
    let searchSection = [];
    let DataFrom = {}; //上级页面的数据
    let DataGo = {}; //缓存下级页面的数据
    export default {
        components: {
            selectItem,
            items
        },
        data() {
            return {
                pageId: 'goods',
                pageLabel: '今天',
                list: [{
                    img: '/static/img/global/product_share_download.png',
                    label: '',
                    value: '',
                    index: ''
                }, ]
            }
        },
        onLoad(option) {
            DataFrom = this.Cacher.getData(option.from);
            this.initPage();
        },
        onShow() {
            this.initPage();
        },
        methods: {
            initPage() { //初始化页面 
                let api = '';
                this.pageId=DataFrom.show;
                DataGo = this.Cacher.getData(DataGo.go) || {
                    from: 'filterDate',
                    date: [getDate(-1), getDate(0), '今天']
                };
                if (DataFrom.show == 'vip') {
                    api = 'vipsTop10';
                } else {
                    api = 'goodsTop10';
                }
                this.pageLabel = DataGo.date[2];
                this.Request(api, {
                    type: 4, //	1:今天，2:昨天，3:7天，4:自定义
                    start: DataGo.date[0], //	自定义开始时间
                    end: DataGo.date[1] //	自定义结束时间
                }).then(res => {
                    let arr = [];
                    for (let k in res) {
                        if (k !== 'error') {
                            arr.push(res[k]);
                        }
                    }
                    if (DataFrom.show == 'vip') {
                        this.list = arr.map(item => ({
                            img: '/static/img/global/product_share_download.png',
                            label: item.nickname,
                            value: item.pay_price,
                            index: item.mobile
                        }))
                    } else {
                        this.list = arr.map(item => ({
                            img: '/static/img/global/product_share_download.png',
                            label: item.title,
                            value: item.pay_number_count,
                            index: item.goods_id
                        }))
                    }
                })
            },
            filteDate() {
                DataGo.go = 'filterDate';
                uni.navigateTo({
                    url: './filterDate?from=toper'
                })
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>