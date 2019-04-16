<template>
    <view class='my-shops page'>
        <search></search>
        <view class="h1">我管理的店铺({{shops.length}})</view>
        <shopBlock :shops='shops' @click='selectShop'></shopBlock>
    </view>
</template>

<script>
    import search from '../../components/my-components/SearchInput'
    import shopBlock from './SelectShop--Item.vue'
    export default {
        components: {
            search,
            shopBlock
        },
        data() {
            return {
                shops: [{
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
                }, ]
            }
        },
        methods: {
            selectShop(item) {
                console.log(item)
            }
        },
    }
</script>

<style lang="scss" scoped>
    .my-shops {
        background: #fff;
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