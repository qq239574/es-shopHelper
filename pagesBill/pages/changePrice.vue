<template>
    <view class='change-price page'>
        <view class="goodblock block">
            <block>
                <boodBlock :goodsList='goodsList'></boodBlock>
                <infoBlock :info='billInfo'></infoBlock>
                <blockInput :info='billInfo' @input="getInput"></blockInput>
            </block>
            <!-- 确认修改按钮 -->
            <pageFoot :price='totalPrice' @click='sure'></pageFoot>
            <!-- 交互组件 -->
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
                totalPrice: 0,
                billInfo: {
                    price: 12121,
                    num: 1455,
                    total: 11111
                },
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
        methods: {
            getInput(val) {
                this.totalPrice = val.value.price * 1 + val.value.pay * 1;
            },
            sure() {
                this.closePageLoading();
                this.Toast('改价成功');
                this.Cacher.setData('changePrice', {
                    from: 'changePrice'
                })
                setTimeout(() => {
                    uni.navigateBack();
                }, 2000)
            }
        },
        onLoad(option) {}
    }
</script>

<style lang="scss" scoped>
    .change-price {
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