<template>
    <view class='my-shops page'>
        <search placeholder='搜索店铺' :value='searchShop' :disabled='true' @click='toSearch'></search>
        <view class="h1" v-if='shops.length'>我管理的店铺({{shopNum}})</view>
        <shopBlock :shops='shops' :total='totalShop' @click='selectShop'></shopBlock>
        <view class="foot">
            <longButton @click='reLogin'>切换登录账号</longButton>
        </view>
        <view class='load-more' v-if='shopNum&&ShowLoadMore'>
            <van-loading size='18px' v-if='!LoadingType' />
            <view class='nomore' v-else-if='totalShop>-1&&!requesting'>-没有更多了-</view>
            <view class='nomore' v-else>正在搜索</view>
        </view>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
    import search from '../../components/my-components/SearchInput'
    import shopBlock from '../components/SelectShop--Item.vue'
    import longButton from '../../components/my-components/LongButton.vue'
    import getShops from '../components/getShopList.js'
    import {
        getJurisdiction
    } from '../../components/my-components/getJurisdiction.js'
    let DataFrom = {};
    let DataGo = {};
    let pageId = 'selectShop';
    let ajaxIndex = 1; //当前是第几次请求 
    let requesting = false;
    let enteringShop = false;
    export default {
        components: {
            search,
            shopBlock,
            longButton
        },
        data() {
            return {
                searchShop: '',
                shops: [],
                shopNum: 0,
                totalShop: -1,
                requesting: false //是否正在请求
            }
        },
        methods: {
            selectShop(item) {
                if (!enteringShop) {
                    enteringShop = true;
                    let that = this;
                    item.totalShops = this.totalShop;
                    this.Cacher.setData(pageId, item);
                    this.pageLoading();
                    this.Request('switchShop', { //切换店铺
                        id: item.shopInfo.id
                    }).then(res => {
                        if (res.error == 0) {
                            getJurisdiction.call(that, true).then(res => { //检查该店铺的权限,true是防止死循环在该页，会自动返回该页
                                enteringShop = false;
                                this.closePageLoading();
                                if (res['apps_index_view']) {
                                    this.searchShop = '';
                                    this.toIndex('from=selectShop&status=selectShop');
                                } else {
                                    that.Toast('暂无该店铺权限');
                                }
                            }).catch(res => {
                                enteringShop = false;
                                this.closePageLoading();
                                that.Toast('暂无该店铺权限');
                            })
                        } else {
                            this.closePageLoading();
                            that.Toast('请求失败，请重试')
                        }
                    }).catch(res => {
                        this.closePageLoading();
                        enteringShop = false;
                        that.Toast('暂无该店铺权限')
                    })
                } else {
                    setTimeout(() => {
                        this.closePageLoading();
                        enteringShop = false;
                    }, 3000)
                }
            },
            reLogin() { //切换登录账号
                this.Cacher.setData(pageId, {
                    from: pageId
                });
                uni.reLaunch({
                    url: '../../pages/login/index?from=selectShop'
                })
            },
            toIndex(info) {
                uni.reLaunch({
                    url: '../../pages/index/index?' + info
                })
            },
            checkUserInfo() {
                this.Dialog.confirm({
                    title: '绑定微信',
                    message: '绑定后，可使用微信快捷登录您的管理员账号',
                    confirmButtonText: '立即绑定'
                }).then(() => {
                    uni.login({
                        provider: 'weixin',
                        success: function(loginRes) {
                            // 获取用户信息
                            uni.getUserInfo({
                                provider: 'weixin',
                                success: function(infoRes) {
                                    console.log('用户昵称为：' + infoRes.userInfo.nickName);
                                }
                            });
                        }
                    });
                }).catch(() => {});
            },
            toSearch() {
                DataGo = {
                    go: 'searchShop'
                }
                uni.navigateTo({
                    url: './searchShop'
                })
            },
            initPage() {
                if (DataGo.go) {
                    DataGo = this.Cacher.getData(DataGo.go);
                    this.shops = []; //清空列表
                    ajaxIndex = 1; //请求页码初始化
                    this.LoadingType = 0; //加载更多提示，0加载更多 1已经全部
                    if (DataGo.from == 'searchShop') { //搜索店铺页传参
                        this.searchShop = DataGo.value;
                    } else {
                        this.searchShop = '';
                    }
                }
                if (!requesting) {
                    requesting = true; //函数节流
                    this.requesting = requesting;
                    this.pageLoading();
                    DataFrom = this.Cacher.getData(pageId);
                    this.Request('shoplist', {
                        pageSize: 20,
                        page: ajaxIndex,
                        keywords: this.searchShop
                    }).then(res => {
                        requesting = false;
                        this.requesting = requesting;
                        if (res.error == 0) {
                            ajaxIndex++;
                            this.shops = this.shops.concat(getShops(res.list));
                            this.shopNum = res.count;
                            this.totalShop = res.total;
                            if (res.total === 0) { //没有任何店铺
                                this.LoadingType = 1; //
                            }
                            if (this.shops.length == 1 && DataFrom.from != 'home') { //只有一个合格的店铺就直接跳转首页；如果是从首页跳转的就不必
                                let shop = this.shops[0];
                                this.Cacher.setData(pageId, {
                                    from: pageId,
                                    shopInfo: shop.shopInfo,
                                    totalShops: res.total
                                });
                                this.selectShop(shop);
                            } else {
                                // this.checkUserInfo()
                            }
                        } else {
                            this.Toast(res.message)
                        }
                        this.closePageLoading();
                    }).catch(res => {
                        this.closePageLoading();
                        requesting = false;
                        this.requesting = requesting;
                        this.Toast(res.message);
                    })
                }
            }
        },
        onPullDownRefresh() {
            requesting = false;
            this.requesting = requesting;
            this.shops = []; //清空列表
            ajaxIndex = 1; //请求页码初始化
            this.LoadingType = 0; //加载更多提示，0加载更多 1已经全部
            this.initPage();
        },
        onReachBottom() {
            if (this.shops.length < this.shopNum) {
                this.initPage();
                this.LoadingType = 0;
            } else {
                this.LoadingType = 1;
            }
        },
        onShow() {
            this.initPage();
        },
        onUnload() {
            requesting = false;
            this.requesting = requesting;
            this.shops = []; //清空列表
            ajaxIndex = 1; //请求页码初始化
            this.LoadingType = 0; //加载更多提示，0加载更多 1已经全部 
        },
        onLoad(option) {
            DataFrom = this.Cacher.getData(option.from); //
            DataGo = {
                go: ''
            };
        }
    }
</script>

<style lang="scss" scoped>
    .my-shops {
        background: #fff;
        padding-bottom: 200upx;
        .foot {
            position: fixed;
            height: 125upx;
            width: 100%;
            background: #fff;
            border-top: 1upx solid #eee;
            bottom: 0;
            left: 0;
            padding: 15upx 0 0;
        }
        .h1 {
            height: 116upx;
            width: 702upx;
            margin: 0 auto;
            line-height: 110upx;
            font-size: 28upx;
            color: #495576;
        }
        .load-more {
            display: flex;
            justify-content: space-around;
            font-size: 22upx;
            flex-wrap: wrap;
        }
        .nomore {
            font-size: 22upx;
            color: #aaa;
            width: 100%;
            text-align: center;
        }
    }
</style>