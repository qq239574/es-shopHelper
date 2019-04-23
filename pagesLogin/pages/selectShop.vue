<template>
    <view class='my-shops page'>
        <search placeholder='搜索店铺' :value='searchShop' :disabled='true' @click='toSearch'></search>
        <view class="h1" v-if='shops.length'>我管理的店铺({{shops.length}})</view>
        <shopBlock :shops='shops' @click='selectShop'></shopBlock>
        <view class="foot">
            <longButton @click='reLogin'>切换登录账号</longButton>
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
    let userInfo = {};
    let DataFrom = {};
    export default {
        components: {
            search,
            shopBlock,
            longButton
        },
        data() {
            return {
                searchShop: '',
                shops: [{
                    title: '花花的店铺1',
                    left: '',
                    status: 0, //0营业中
                    img: '/static/img/global/yz_3.png'
                }]
            }
        },
        methods: {
            selectShop(item) {
                this.Cacher.setData('selectShop', item);
                this.pageLoading();

                this.Request('switchShop', {//切换店铺
                    id: item.shopInfo.id
                }).then(res => {
                    this.searchShop='';
                    this.toIndex('from=selectShop&status=selectShop');
                    this.closePageLoading();
                }).catch(res=>{
                    if(res){

                    }
                })
            },
            reLogin() {
                uni.reLaunch({
                    url: '../../pages/login/index?from=selectShop&&status=switchAccount'
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
                            console.log(loginRes.authResult);
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
                uni.navigateTo({
                    url: './searchShop'
                })
            },
            initPage() {
                this.pageLoading();
                let searchData = this.Cacher.getData('searchShop') || '';
                DataFrom = this.Cacher.getData('selectShop')
                this.searchShop = searchData.value || '';
                this.Request('shoplist', {
                    pagesize: 20,
                    page: 1,
                    keywords: this.searchShop
                }).then(res => {
                    this.shops = getShops(res.list);
                    if (this.shops.length == 1 && DataFrom.from != 'home' && DataFrom.status != 'switchShop') { //只有一个合格的店铺就直接跳转首页；如果是从首页跳转的就不必
                        let shop = this.shops[0]; 
                        this.Cacher.setData('selectShop', shop);
                        this.Request('switchShop', {
                            id: shop.shopInfo.id
                        }).then(res => {
                            this.toIndex('from=selectShop&status=onlyOne')
                        })
                    } else {
                        // this.checkUserInfo()
                    }
                    this.closePageLoading();
                })
            }
        },
        onShow() {
            this.initPage();
        },
        onLoad(option) {
            this.initPage();
            userInfo = this.Cacher.getData('userInfo');
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
    }
</style>