<template>
    <view class='my-shops page'>
        <search placeholder='搜索店铺' :value='searchShop' :disabled='true' @click='toSearch'></search>
        <view class="h1">我管理的店铺({{shops.length}})</view>
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
    let userInfo = {}
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
                    left: '30天后到期',
                    status: 0,
                    img: '/static/img/global/yz_3.png'
                }]
            }
        },
        methods: {
            selectShop(item) {
                this.Cacher.setData('selectShop', item);
                this.toInex('from=selectShop&status=selectShop');
            },
            reLogin() {
                uni.reLaunch({
                    url: '../../pages/login/index?from=selectShop&&status=switchAccount'
                })
            },
            toInex(info) {
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
                let searchData = this.Cacher.getData('searchShop');
                if (searchData && searchData.from == 'searchShop') {
                    this.searchShop = searchData.value;
                }
            }
        },
        onShow() {
            this.initPage();
        },
        onLoad(option) {
            this.initPage();
            this.Request('shoplist')
            setTimeout(() => {
                userInfo = this.Cacher.getData('userInfo');
                console.log(userInfo);
                this.shops = [{
                    title: '花花的店铺1',
                    left: '30天后到期',
                    status: 0,
                    img: '/static/img/global/yz_3.png'
                }, {
                    title: '花花的店铺2',
                    left: '30天后到期',
                    status: 1,
                    img: '/static/img/global/yz_3.png'
                }, {
                    title: '花花的店铺3',
                    left: '30天后到期',
                    status: 2,
                    img: '/static/img/global/yz_3.png'
                }, {
                    title: '花花的店铺4',
                    left: '30天后到期',
                    status: 3,
                    img: '/static/img/global/yz_3.png'
                }, {
                    title: '花花的店铺5',
                    left: '30天后到期',
                    status: 4,
                    img: '/static/img/global/yz_3.png'
                }, ];
                let onlyOne = true;
                if (onlyOne && option.from != 'home' && option.status != 'switchShop') { //只有一个合格的店铺就直接跳转首页；如果是从首页跳转的就不必
                    // this.toInex('from=selectShop&status=onlyOne')
                } else {
                    this.checkUserInfo()
                }
            }, 1000)
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