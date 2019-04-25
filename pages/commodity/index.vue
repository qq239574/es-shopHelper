<template>
    <div class='pages-commodity-index page'>
        <view class="grace-fixed-top grace-gtbg-blue top1" style='background:rgba(0,0,0,0)'>
            <SearchInput @click='search' :value='searchValue' placeholder='请输入商品名称' :disabled='true'></SearchInput>
            <TabCard :categories='categories' @tabChange='tabChange'></TabCard>
        </view>
        <view class='margin180'></view>
        <Card @click='clickGood' :goodsList='goodsList' :toggle='toggle'></Card>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
        <loadMore :loadingType="LoadingType" :loadingText="LoadingText" :show="ShowLoadMore"></loadMore>
    </div>
</template>

<script>
    import TabCard from '../../components/my-components/Tabs.vue';
    import SearchInput from '../../components/my-components/SearchInput.vue';
    import Card from './index/goodsList.vue';
    import testdata from './index/testData.js'; //测试数据
    import categories from './index/categories.js'
    import getGoodsList from './index/getGoodsList.js'
    let DataFrom = {};
    let DataGo = {};
    let searchData = {};
    let curTab = {
        cateid: 0,
        index: 0,
        name: "出售中"
    }
    export default {
        components: {
            TabCard,
            SearchInput,
            Card
        },
        data() {
            return {
                searchValue: '', //查询条件  
                categories, //标签项
                goodsList: [{ //商品列表
                    img: '/static/img/global/tmp.png',
                    goodName: '',
                    color: '',
                    size: '',
                    num: 0, //库存
                    price: '0', //价格
                    saled: 0, //销量
                    status: 0, //0出售中,1已售罄,2仓库中,3回收站
                }],
                toggle: false, //只用于关闭各个模块的浮层效果
                searchTab: { //当前选项
                    cateid: 0,
                    index: 0,
                    name: "出售中",
                    searchId: 1
                }
            }
        },
        onLoad(option) {
            DataFrom = this.Cacher.getData(option.from) || {};
        },
        onShow() {
            this.initPage();
        },
        methods: {
            initPage() {
                this.toggle = !this.toggle;
                DataFrom = this.Cacher.getData(DataFrom.from) || {};
                DataGo = Object.assign(DataGo, this.Cacher.getData(DataGo.go)) || {
                    go: 'searchShop',
                    value: ''
                };
                if (DataGo.go == 'searchShop') {
                    this.searchValue = DataGo.value;
                } else {
                    this.searchValue = '';
                }
                getGoodsList.call(this, {
                    status: this.searchTab.searchId, //1出售周 3已售罄 -2仓库中 -1回收站
                    title: this.searchValue,
                    category_ids: '',
                    group_ids: '',
                    type: '', //1实体2虚拟3电子卡密
                    goods_sort: '',
                    goods_by: '',
                    pagesize: 20,
                    page: 1
                }).then(res => {
                    this.goodsList = res;
                    this.closePageLoading();
                })
            },
            tabChange(tab) { //切换标签事件
                this.searchTab = tab;
                this.toggle = !this.toggle;
                this.goodsList = [];
                this.pageLoading();
                this.initPage();
            },
            search(val) { //跳转搜索页面
                this.toggle = !this.toggle;
                DataGo = { //这里预先设置返回的页面，由于back()函数无法设置query
                    go: 'searchShop',
                    value: ''
                }
                this.Cacher.setData('good', {
                    from: 'good',
                    title: '搜索商品',
                    placeholder: '请输入商品名称'
                })
                uni.navigateTo({
                    url: '../../pagesLogin/pages/searchShop?from=good'
                })
            },
            clickGood(item) { //商品模块的点击事件
                this.toggle = !this.toggle;
                if (item.type == 'menu-item') { //点击的是商品的浮层菜单
                    this.pageLoading();
                    if (item.name == '编辑') {
                        DataGo={
                            go:'editGood'
                        }
                        this.Cacher.setData('good', {
                            from: 'good',
                            item
                        });
                        uni.navigateTo({
                            url: '../../pagesCommodity/pages/index?from=good'
                        })
                    } else if (item.name == '下架') {
                        this.Request('onOrOffGoods', {
                            goods_ids: item.detail.goodId,
                            status: 0, //1上架0下架
                        }).then(res => {
                            this.closePageLoading();
                            this.Toast('商品成功下架');
                            this.initPage();
                        })
                    } else if (item.name == '删除') {
                        this.Request('tempDelGood', {
                            goods_ids: item.detail.goodId,
                        }).then(res => {
                            this.closePageLoading();
                            this.Toast('成功删除商品');
                            this.initPage();
                        })
                    } else if (item.name == '上架') {
                        this.Request('onOrOffGoods', {
                            goods_ids: item.detail.goodId,
                            status: 1, //1上架0下架
                        }).then(res => {
                            this.closePageLoading();
                            this.Toast('商品成功上架');
                            this.initPage();
                        })
                    } else if (item.name == '恢复') {
                        this.Request('recycleDelGood', {
                            goods_ids: item.detail.goodId
                        }).then(res => {
                            this.closePageLoading();
                            this.Toast('成功恢复商品');
                            this.initPage();
                        })
                    }
                }
            }
        },
        onPullDownRefresh() {
            this.initPage();
        },
        onShareAppMessage(res) { //分享事件
            if (res.from === 'button') { // 来自页面内分享按钮
                console.log(res.target)
            }
            return {
                title: '自定义分享标题',
                path: '/pages/index/index',
                imageUrl: '/static/img/global/logo.jpg'
            }
        }
    }
</script>

<style lang="scss" scoped>
    .margin180 {
        height: 176upx;
    }
</style>