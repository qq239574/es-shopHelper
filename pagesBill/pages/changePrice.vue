<template>
    <view class='change-price page'>
        <view class="goodblock block">
            <block v-for='(item,index) in list' :key='index'>
                <goodBlock :goodsList='item.goodsList'></goodBlock>
                <infoBlock :info='item.billInfo'></infoBlock>
                <blockInput :info='item.billInfo' @input="getInput"></blockInput>
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
    import goodBlock from '../components/PriceBlock--Good';
    import infoBlock from '../components/PriceBlock--Info.vue';
    import blockInput from '../components/PriceBlock--Input.vue';
    import pageFoot from '../components/priceBlock--Foot.vue';
    let DataFrom = {};
    let cacheList = []
    export default {
        components: {
            goodBlock,
            infoBlock,
            blockInput,
            pageFoot
        },
        data() {
            return {
                totalPrice: 0,
                list: [{
                    billInfo: {
                        price: 0,
                        num: 0,
                        total: 0
                    },
                    goodsList: [{
                        img: '/static/img/global/tmp.png',
                        goodName: '',
                        color: '',
                        size: '',
                        num: 0,
                        price: 0
                    }]
                }]
            }
        },
        methods: {
            getInput(val) {
                console.log(val)
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
        onLoad(option) {
            DataFrom = this.Cacher.getData(option.from);
            this.Request('billPrice', {
                id: DataFrom.bill.bill.id
            }).then(res => {
            })
            console.log(DataFrom)
            cacheList = DataFrom.bill.goodsList.map((item, index) => {
                return {
                    billInfo: {
                        price: item.price,
                        num: item.num,
                        total: item.price * item.num,
                        index
                    },
                    goodsList: [item]
                }
            });
            this.list = cacheList;
        }
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