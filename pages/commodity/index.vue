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
    let DataFrom = {};
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
            }
        },
        onLoad(option) {
            if (option.from) {
                DataFrom = this.Cacher.getData(option.from)
            }
            this.initPage();
        },
        onShow() {
            this.initPage();
        },
        methods: {
            initPage() {
                this.toggle = !this.toggle;
                if (DataFrom.from) {
                    DataFrom = this.Cacher.getData(DataFrom.from)
                }
                this.goodsList = testdata(curTab['cateid']); //测试数据
            },
            tabChange(tab) {
                curTab = tab;
                this.toggle = !this.toggle;
                this.goodsList = testdata(curTab['cateid']); //测试数据
            },
            search(val) {
                this.toggle = !this.toggle;
                DataFrom = Object.assign(DataFrom, { //这里预先设置返回的页面，由于back()函数无法设置query
                    from: 'searchShop',
                    value: ''
                })
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
                    if (item.name == '编辑') {
                        this.Cacher.setData('good', {
                            from: 'good',
                            item
                        });
                        uni.navigateTo({
                            url: '../../pagesCommodity/pages/index?from=good'
                        })
                    } else if (item.name == '下架') {} else if (item.name == '删除') {} else if (item.name == '上架') {} else if (item.name == '恢复') {}
                    console.log('>>>>>>', item); //调用后刷新页面
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