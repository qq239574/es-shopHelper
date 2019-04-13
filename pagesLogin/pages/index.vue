<template>
    <view class='pagesLogin-pages-index reGetPW page'>
        <view class="title cell-font-gray">请选择找回密码的方式</view>
        <view class="reGetPW__rows">
            <view class="reGetPW__items grace-center" @click='toUrl("tel")'>
                <view class="img">
                    <image src='/static/img/global/yz_1.png' lazy-load></image>
                </view>
                <view class='cell-font-black'>手机号验证</view>
            </view>
            <view class="reGetPW__items grace-center" @click='toUrl("email")'>
                <view class="img">
                    <image src='/static/img/global/yz_2.png' lazy-load></image>
                </view>
                <view class='cell-font-black'>邮箱验证</view>
            </view>
            <view class="reGetPW__items  grace-center" @click='toUrl("question")'>
                <view class="img">
                    <image src='/static/img/global/yz_3.png' lazy-load></image>
                </view>
                <view class='cell-font-black'>用户名安全问题</view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        methods: {
            toUrl(val) {
                if (val == 'tel') {
                    uni.navigateTo({
                        url: './telOrEmail'
                    })
                } else if (val == 'email') {} else if (val == 'question') {}
            }
        },
    }
</script>

<style lang="scss" scoped>
    .reGetPW {
        background: #fff;
        >.title {
            width: fit-content;
            margin: 150upx auto 66upx;
            white-space: nowrap;
        }
        >.reGetPW__rows {
            width: 100%;
            display: flex;
            flex-wrap: nowrap;
            >.reGetPW__items {
                width: 34%;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                >.img {
                    width: 120upx;
                    height: 120upx;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #ff884f, #fb6839);
                    margin: 0 auto 18upx;
                    >image {
                        width: 100%;
                        height: 100%;
                    }
                }
                >view {
                    width: 100%;
                }
            }
        }
    }
</style>