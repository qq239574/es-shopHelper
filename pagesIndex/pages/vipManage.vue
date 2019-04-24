<template>
    <view class='vip-manage page'>
        <SearchInput @input='search' placeholder='搜索会员' inputStyle='background:#fff;margin:10px auto;' bgStyle='background:#f5f7fa;'></SearchInput>
        <Card :list='viplist' @click='clickGood'></Card>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
    import TabCard from '../../components/my-components/Tabs.vue';
    import SearchInput from '../../components/my-components/SearchInput.vue';
    import Card from '../components/VipList.vue';
    let bar = '';
    let cacheSearchKey = '';
    export default {
        components: {
            TabCard,
            SearchInput,
            Card
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
                }]
            }
        },
        methods: {
            search(val) {
                clearTimeout(bar);
                bar = setTimeout(() => {
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
                    }
                }
            },
            initPage() {
                this.pageLoading();
                this.Request('vipList', {
                    keywords: '',
                    tag_id: '',
                    level_id: '',
                    create_times: [],
                    come_from: '',
                    sort: '',
                    buy: '',
                    page: 1,
                    pagesize: 20,
                    create_time: '',
                }).then(res => {
                    this.closePageLoading();
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
                })
            }
        },
        onLoad() {
            this.initPage()
        }
    }
</script>

<style lang="scss" scoped>

</style>