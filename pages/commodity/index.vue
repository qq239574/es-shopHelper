<template>
    <div class='pages-commodity-index page'>
        <view class="grace-fixed-top grace-gtbg-blue top1" style='background:rgba(0,0,0,0)'>
            <SearchInput @click='search' :value='searchValue' placeholder='请输入商品名称' :disabled='true'></SearchInput>
            <TabCard :categories='categories' @tabChange='tabChange'></TabCard>
        </view>
        <view class='margin180'></view>
        <Card :Jurisdiction='Jurisdiction' @click='clickGood' @shareGoodInfo='shareGoodInfo' :userChannels='userChannels' :goodsList='goodsList' :toggle='toggle' v-if='goodsList.length'>
            <!-- 生成二维码的方法再Card组件内部，因为canvas在组件内无效 -->
            <canvas style="width: 200px; height: 200px;background:#fff;" id='myQrcode' canvas-id="myQrcode"></canvas>
        </Card>
        <nodata type='noresult' :tip='searching?"正在搜索相关商品":"没有搜索到相关商品"' v-if='!goodsList.length'></nodata>
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
        <view class='addGoods higher' @click='addGoods'>
            <van-icon color='#fff' class='addIcon' name="plus" />
            <view class='addWord'>添加</view>
        </view>
        <MyTabbar :defaultIndex='1' :Jurisdiction='Jurisdiction'></MyTabbar>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
        <loadMore :loadingType="LoadingType" :loadingText="LoadingText" :show="ShowLoadMore"></loadMore>
    </div>
</template>

<script>
    import MyTabbar from '../../components/my-components/myTabbar1'
    import TabCard from '../../components/my-components/Tabs.vue';
    import SearchInput from '../../components/my-components/SearchInput.vue';
    import Card from './index/goodsList.vue';
    import categories from './index/categories.js'
    import getGoodsList from './index/getGoodsList.js'
    import nodata from '../../components/my-components/nodata.vue'
    let requestQueue = ''; //请求队列，标签操作过快会导致结果混乱
    let searching = false;
    let needShare = {}
    let DataFrom = {};
    let DataGo = {};
    let searchData = {};
    let curTab = {
        cateid: 0,
        index: 0,
        name: "出售中"
    }
    import {
        getJurisdiction
    } from '../../components/my-components/getJurisdiction.js'
    export default {
        components: {
            TabCard,
            SearchInput,
            Card,
            nodata,
            MyTabbar
        },
        data() {
            return {
                Jurisdiction: {}, //权限
                searchValue: '', //查询条件  
                categories, //标签项
                goodsList: [],//商品列表
                toggle: false, //只用于关闭各个模块的浮层效果
                searchTab: { //当前选项
                    cateid: 0,
                    index: 0,
                    name: "出售中",
                    searchId: 1
                },
                searching: true,
                current: 1,
                totalPage: 1,
                tabIndex: 0, //默认tabs的index
                userChannels: {}, //用户开通的渠道信息
            }
        },
        onLoad(option) {
            uni.hideTabBar({ //隐藏tabbar
                animation: false
            })
            DataFrom = this.Cacher.getData(option.from) || {};
            getJurisdiction.call(this).then(res => {
                this.Jurisdiction = res;
                if (!res.goods_view) { //无权限
                    uni.switchTab({
                        url: '/pages/index/index'
                    });
                }
            }).catch(res => {
                this.Toast(res.message)
            })
        },
        onShow() {
            this.initPage();
        },
        watch: {
            current() {
                this.initPage();
            },
        },
        methods: {
            addGoods() {
                DataGo = {
                    go: 'editGood'
                }
                this.Cacher.setData('good', {
                    from: 'addGoods',
                });
                uni.navigateTo({
                    url: '../../pagesCommodity/pages/index?from=good'
                })
            },
            shareGoodInfo(good) {
                needShare = good;
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
            initPage() {
                this.searching = true;
                this.toggle = !this.toggle;
                DataFrom = this.Cacher.getData(DataFrom.from) || {};
                DataGo = Object.assign(DataGo, this.Cacher.getData(DataGo.go)) || {
                    go: 'searchShop',
                    value: ''
                };
                if (DataGo.go == 'searchShop') {
                    this.searchValue = DataGo.value;
                    this.Cacher.clearData('searchShop');
                } else {
                    this.searchValue = '';
                }
                getGoodsList.call(this, { //总页数在里面
                    status: this.searchTab.searchId, //1出售周 3已售罄 -2仓库中 -1回收站
                    title: this.searchValue,
                    category_ids: '',
                    group_ids: '',
                    type: '', //1实体2虚拟3电子卡密
                    goods_sort: '',
                    goods_by: '',
                    pagesize: 20,
                    page: this.current,
                }).then(res => {
                    this.goodsList = res;
                    this.closePageLoading();
                    this.searching = false;
                    searching = false;
                    requestQueue && this.tabChange(requestQueue);
                    requestQueue = '';
                }).catch(res => {
                    searching = false;
                    requestQueue && this.tabChange(requestQueue);
                    requestQueue = '';
                })
                this.Request('getChannels', {}).then(res => { //获取用户开通渠道
                    if (!res.error) {
                        this.userChannels = {
                            h5: res.channel.wap.open_status, //// 业务端启用状态 0: 未启用 1: 已经启用
                            miniapp: res.channel.wxapp.open_status
                        }
                    }
                })
            },
            tabChange(tab) { //切换标签事件
                if (!searching) {
                    searching = true;
                    this.searchTab = tab;
                    this.toggle = !this.toggle;
                    this.goodsList = [];
                    this.current = 1;
                    this.totalPage = 1;
                    this.pageLoading();
                    this.initPage();
                } else {
                    requestQueue = tab; //函数节流
                }
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
                    placeholder: '请输入商品名称',
                    default: this.searchValue
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
                        DataGo = {
                            go: 'editGood'
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
                        let delApis = {
                            '出售中': 'tempDelGood',
                            '已售罄': 'tempDelGood',
                            '仓库中': 'tempDelGood',
                            '回收站': 'realDelGood'
                        }
                        this.Request(delApis[this.searchTab.name] || 'tempDelGood', {
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
                } else if (item.type == 'good') { //直接点击商品，同样进入编辑页面
                    DataGo = {
                        go: 'editGood'
                    }
                    this.Cacher.setData('good', {
                        from: 'good',
                        item: {
                            detail: item.detail.val
                        }
                    });
                    uni.navigateTo({
                        url: '../../pagesCommodity/pages/index?from=good'
                    })
                }
            }
        },
        onPullDownRefresh() {
            this.initPage();
        },
        onShareAppMessage(res) { //分享事件
            if (res.from === 'button') { // 来自页面内分享按钮  
                let encode = encodeURIComponent(needShare['shareByH5']);
                return {
                    title: needShare.detail.goodName,
                    path: '/pagesCommodity/pages/webViewPage?url=' + encode || '',
                    imageUrl: needShare.detail.img
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .margin180 {
        height: 176upx;
    }
    .addGoods {
        width: 94upx;
        height: 94upx;
        position: fixed;
        border-radius: 50%;
        bottom: 36upx;
        right: 24upx;
        background: #fd6b3e;
        box-shadow: 0 0 20upx 0 rgba(0, 0, 0, .35);
        color: #fff;
        .addWord,
        .addIcon {
            color: #fff;
            position: absolute;
            width: 100%;
            ;
            height: fit-content;
            left: 0;
            right: 0;
            margin: auto;
            font-size: 22upx;
            text-align: center;
        }
        .addWord {
            top: 45upx;
        }
        .addIcon {
            top: 5upx;
            font-size: 40upx;
        }
        &.higher {
            bottom: 136upx;
        }
    }
    .pager {
        width: 100%;
        height: 80upx;
        margin: 30upx auto 130upx;
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
            margin: 0;
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