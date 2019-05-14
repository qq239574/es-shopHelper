<template>
    <view class='vip-manage page'>
        <SearchInput @input='search' @clear='clearSearch' placeholder='搜索会员' inputStyle='background:#fff;margin:10px auto;' bgStyle='background:#f5f7fa;'></SearchInput>
        <Card :list='viplist' @click='clickGood'></Card>
        <nodata type='noresult' tip='没有搜索到相关会员' v-if='!searching&&!viplist.length'></nodata>
        <view class="pager" v-else>
            <i-page i-class='pager-button' :current="current" :total="totalPage" @change="handleChange">
                <view class='prev button' slot="prev">
                    <i-icon type="return"></i-icon>
                    上一步
                </view>
                <view class='next button' slot="next">
                    下一步
                    <i-icon type="enter"></i-icon>
                </view>
            </i-page>
        </view>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
    import TabCard from '../../components/my-components/Tabs.vue';
    import SearchInput from '../../components/my-components/SearchInput.vue';
    import nodata from '../../components/my-components/nodata.vue'
    import Card from '../components/VipList.vue';
    let bar = '';
    let cacheSearchKey = '';
    export default {
        components: {
            TabCard,
            SearchInput,
            Card,
            nodata
        },
        data() {
            return {
                searching: false,
                viplist: [{
                    img: '/static/img/global/home_order_tobepay.png',
                    title: '',
                    vipClass: '',
                    tel: '',
                    money: '',
                    score: ''
                }],
                current: 1,
                totalPage: 1,
                searching: true
            }
        },
        watch: {
            current() {
                this.initPage();
            }
        },
        methods: {
            clearSearch() {
                this.search({
                    value: ''
                })
            },
            handleChange(obj) {
                let {
                    detail: {
                        type
                    }
                } = obj;
                if (type == 'next') {
                    this.current = Math.min(this.current + 1, this.totalPage);
                } else {
                    this.current = Math.max(this.current - 1, 1);
                }
            },
            search(val) {
                clearTimeout(bar);
                bar = setTimeout(() => {
                    this.current = 1;
                    cacheSearchKey = val.value;
                    this.initPage();
                    this.pageLoading()
                }, 500)
            },
            clickGood(item) {
                if (item.type == 'menu-item') {
                    if (item.name == '编辑') {
                        this.setGood(item);
                        uni.navigateTo({
                            url: '../../pagesCommodity/pages/multiSpecifications'
                        })
                    } else if (item.name == '充值') {
                        this.Cacher.setData('vipManage', {
                            from: 'vipManage',
                            value: {
                                type: 'add',
                                label: '余额'
                            },
                            info: item.detail.info
                        })
                        uni.navigateTo({
                            url: './addSurplus?from=vipManage'
                        })
                    } else if (item.name == '订单') {
                        this.Cacher.setData('vipManage', {
                            from: 'vipManage',
                            info: item.detail.info
                        })
                        uni.navigateTo({
                            url: './vipBills?from=vipManage'
                        })
                    }
                }
            },
            initPage() {
                this.searching = true;
                this.pageLoading();
                this.Request('vipList', {
                    keywords: cacheSearchKey,
                    tag_id: '',
                    level_id: '',
                    create_times: [],
                    come_from: '',
                    sort: '',
                    buy: '',
                    page: this.current,
                    pagesize: 20,
                    create_time: '',
                }).then(res => {
                    this.closePageLoading();
                    this.totalPage = Math.max(Math.ceil(res.count / 20), 1);
                    this.viplist = res.list.map(item => {
                        return {
                            img: item.avatar || '/static/img/global/home_order_tobepay.png',
                            title: item.nickname,
                            vipClass: item.level_name,
                            tel: item.mobile,
                            money: item.balance,
                            score: item.credit,
                            info: item
                        }
                    })
                    this.searching = false;
                }).catch(res => {
                    this.searching = false;
                    this.Toast(res.message || '出错啦')
                })
            }
        },
        onPullDownRefresh() {
            this.current = 1;
            this.initPage();
        },
        onLoad() {
            this.viplist = [];
            cacheSearchKey='';
            this.initPage()
        }
    }
</script>

<style lang="scss" scoped>
    .pager {
        width: 100%;
        height: 80upx;
        margin: 0 auto 50upx;
        .button {
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-around;
            font-size: 30upx;
            color: 999;
            line-height: 70upx;
        }
        /deep/button {
            height: 70upx;
            font-size: 30upx;
            color: 999;
            line-height: 70upx;
            border-radius: 10upx;
        }
        .prev {
            padding: 0 10upx 0 5upx;
        }
        .next {
            padding: 0 5upx 0 10upx;
        }
        /deep/.pager-button {
            line-height: 70upx;
            height: 70upx;
        }
    }
</style>