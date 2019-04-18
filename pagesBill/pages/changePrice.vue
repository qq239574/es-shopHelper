<template>
    <view class='change-price page'>
        <view class="goodblock block">
            <boodBlock :goodsList='goodsList'></boodBlock>
            <infoBlock></infoBlock>
            <blockInput></blockInput>
            <pageFoot></pageFoot>
            <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
        </view>
    </view>
</template>

<script>
    import boodBlock from '../components/PriceBlock--Good';
    import infoBlock from '../components/PriceBlock--Info.vue';
    import blockInput from '../components/PriceBlock--Input.vue';
    import pageFoot from '../components/priceBlock--Foot.vue'
    export default {
        components: {
            boodBlock,
            infoBlock,
            blockInput,
            pageFoot
        },
        data() {
            return {
                goodsList: [{
                    img: '/static/img/global/tmp.png',
                    goodName: '翻页蓝色的空间疯狂大富科技上来看饭店经理看时间对方离开时间slikfjsdfklklsjfdlkjslkdjfl',
                    color: '浅绿色',
                    size: 'S码',
                    num: 2,
                    price: '15455.2'
                }, {
                    img: '/static/img/global/tmp.png',
                    goodName: '翻页蓝色的空间疯狂大富科技上来看饭店经理看时间对方离开时间',
                    color: '浅绿色',
                    size: 'S码',
                    num: 2,
                    price: '152344.2'
                }, {
                    img: '/static/img/global/tmp.png',
                    goodName: '翻页蓝色的空间疯狂大富科技上来看饭店经理看时间对方离开时间',
                    color: '浅绿色',
                    size: 'S码',
                    num: 2,
                    price: '1533334'
                }]
            }
        },
    }
</script>

<style lang="scss" scoped>
.change-price{
      .block {
            width: 710upx;
            box-sizing: border-box;
            background: #fff;
            margin: auto;
            border-radius: 8upx;
            padding: 0 0;
            .bill__item {
                color: #000;
                font-weight: 600;
                line-height: 35upx;
            }
            .body,
            .foot {
                padding: 5upx 0;
                font-size: 20upx;
                font-weight: 500;
                color: #6e7685;
            }
        }
}
</style>