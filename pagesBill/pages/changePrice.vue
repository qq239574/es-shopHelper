<template>
    <view class='change-price page'>
        <view class="goodblock block">
            <block v-for='(item,index) in list' :key='index'>
                <goodBlock :goodsList='item.goodsList'></goodBlock>
                <infoBlock :info='item.billInfo'></infoBlock>
                <blockInput :info='item.billInfo' @input="getInput"></blockInput>
            </block>
        </view>
        <view class="row row2">
            <view class="label">统一运费（元）</view>
            <input type="digit" placeholder='0' @input='inputPay'>
        </view>
        <!-- 确认修改按钮 -->
        <pageFoot :price='totalPrice' @click='sure'></pageFoot>
        <!-- 交互组件 -->
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
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
            inputPay(val) {
                console.log('total pay', val)
            },
            getInput(val) {
                console.log('item>>', val)
                this.totalPrice = val.value.price * 1 + val.value.pay * 1;
            },
            sure() {
                this.pageLoading();
                let data = {
                    id: '', //订单id
                    dispatch_price: '', //运费
                    total_price: '', //订单总价
                    change_items: [{
                        "id": "", //订单商品id
                        "price_change": "0" //改价变动金额
                    }]
                }
                this.Request('changeBillPrice', data).then(res => {
                    this.Cacher.setData('changePrice', {
                        from: 'changePrice'
                    })
                    if (res.error == 0) {
                        this.closePageLoading();
                        uni.navigateBack();
                        this.Toast('改价成功');
                    } else {
                        this.Toast(res.message);
                    }
                }).catch(res => {
                    this.Toast(res.message);
                })
            }
        },
        onLoad(option) {
            DataFrom = this.Cacher.getData(option.from);
            this.Request('billPrice', {
                id: DataFrom.bill.bill.id
            }).then(res => {})
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
        .row {
            width: 710upx;
            height: 96upx;
            line-height: 96upx;
            display: flex;
            justify-content: space-between;
            flex-wrap: nowrap;
            box-sizing: border-box;
            padding: 0 20upx;
            margin: 20upx auto;
            background: #fff;
            border-radius: 8upx;
            .label {
                font-size: 28upx;
                line-height: 96upx;
                font-weight: 700;
            }
            input {
                height: 70upx;
                width: 250upx;
                background: #fcfcfc;
                border: 1upx solid #eee;
                border-radius: 6upx;
                line-height: 70upx;
                font-size: 28upx;
                text-align: right;
                box-sizing: border-box;
                padding: 0 20upx;
                margin-top: 13upx;
                font-weight: 600;
            }
        }
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