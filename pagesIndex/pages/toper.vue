<template>
    <view class='toper page'>
        <selectItem label='筛选日期' :value='pageLabel' @click='filteDate'></selectItem>
        <items :list='list' :pageid='pageId' @click='clickItem'></items>
        <nodata type='noresult' :tip='searching?"正在搜索相关数据":nodataContent' v-if='!list.length'></nodata>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
    import selectItem from '../../components/my-components/editBlock-SelectItem.vue'
    import nodata from '../../components/my-components/nodata.vue'
    import items from '../components/Toper-list.vue'
    import {
        getDate
    } from '../../components/my-components/getDateSection.js'
    import {
        number_format
    } from '../../components/my-components/formater.js'
    let searchSection = [];
    let DataFrom = {}; //上级页面的数据
    let DataGo = {}; //缓存下级页面的数据
    let domain = '';
    export default {
        components: {
            selectItem,
            items,
            nodata
        },
        data() {
            return {
                pageId: 'goods',
                pageLabel: '今日',
                list: [],
                searching: true,
                nodataContent: "当前日期无商品销售"
            }
        },
        onLoad(option) {
            DataFrom = this.Cacher.getData(option.from);
            this.nodataContent=DataFrom.show == 'vip' ?"当前日期无付款会员":"当前日期无商品销售"
            uni.setNavigationBarTitle({
                title: DataFrom.show == 'vip' ? "TOP会员" : "TOP商品"
            });
        },
        onShow() {
            domain = this.Cacher.getData('static_resources_domain')
            this.initPage();
        },
        onPullDownRefresh() {
            this.initPage();
        },
        methods: {
            clickItem(info) {
                if (DataFrom.show == 'vip') {
                    this.Cacher.setData('toper', {
                        from: 'toper',
                        detail: {
                            info: {
                                id: info.id
                            }
                        }
                    });
                    uni.navigateTo({
                        url: '../../pagesIndex/pages/vipDetail?from=toper'
                    })
                } else {
                    this.Cacher.setData('toper', {
                        from: 'toper',
                        item: {
                            detail: {
                                goodId: info.goods_id
                            }
                        }
                    });
                    uni.navigateTo({
                        url: '../../pagesCommodity/pages/index?from=toper'
                    })
                }
            },
            initPage() { //初始化页面 
                let api = ''; 
                this.pageId = DataFrom.show;
                DataGo = this.Cacher.getData(DataGo.go);
                DataGo = DataGo.date ? DataGo : {
                    from: 'filterDate',
                    date: [getDate(0), getDate(0), '今日']
                };
                if (DataFrom.show == 'vip') {
                    api = 'vipsTop10';
                } else {
                    api = 'goodsTop10';
                }
                this.pageLabel = DataGo.date[2];
                this.pageLoading();
                this.searching=true;
                this.Request(api, {
                    type: 4, //	1:今天，2:昨天，3:7天，4:自定义
                    start: DataGo.date[0], //	自定义开始时间
                    end: DataGo.date[1] //	自定义结束时间
                }).then(res => {
                    this.searching=false;
                    this.closePageLoading();
                    let arr = [];
                    for (let k in res) {
                        if (k !== 'error') {
                            arr.push(res[k]);
                        }
                    }
                    if (DataFrom.show == 'vip') {
                        this.list = arr.map(item => ({
                            img: item.avatar || 'https://ceshiuser.100cms.com/static/dist/shop/image/noface.png',
                            label: item.nickname,
                            value: item.pay_price,
                            index: item.mobile,
                            id: item.id,
                            tiFixed: 2 //有效数字
                        }))
                    } else {
                        this.list = arr.map(item => ({
                            img: domain + item.thumb,
                            label: item.title,
                            value: item.pay_number_count,
                            index: item.goods_id,
                            goods_id: item.goods_id,
                            tiFixed: 0 //有效数字
                        }))
                    }
                }).catch(res => {
                    this.closePageLoading();
                    this.Toast(res.message)
                })
            },
            filteDate() {
                DataGo.go = 'filterDate';
                this.Cacher.setData('toper', {
                    from: 'toper'
                })
                uni.navigateTo({
                    url: './filterDate?from=toper'
                })
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>