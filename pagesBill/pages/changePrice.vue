<template>
    <view class='change-price page'>
        <view class="goodblock block">
            <view class='child-block' v-for='(item,index) in list' :key='index'>
                <goodBlock :info='item.good'></goodBlock>
                <infoBlock :info='item.goodInfo'></infoBlock>
                <blockInput :info='item.goodInfo' @input="getInput"></blockInput>
            </view>
        </view>
        <view class="row row2">
            <view class="label">统一运费（元）</view>
            <input type="digit" placeholder='0' :value='totalFreight' @input='inputPay'>
        </view>
        <!-- 确认修改按钮 -->
        <pageFoot :price='totalPrice' @click='sure'></pageFoot>
        <!-- 交互组件 -->
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
    import goodBlock from '../components/PriceBlock--Good.vue';
    import infoBlock from '../components/PriceBlock--Info.vue';
    import blockInput from '../components/PriceBlock--Input.vue';
    import pageFoot from '../components/priceBlock--Foot.vue';
    import {
        flatten
    } from '../../components/my-components/ajaxDataFormater.js'
    let DataFrom = {};
    let cacheList = [];
    let cacheOldPrice = []; //保存改价前的状态
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
                totalFreight: 0, //统一运费
                list: [{
                    goodInfo: {
                        price: '',
                        num: '',
                        total: '',
                        index: 0,
                        unit: '',
                        id: ''
                    },
                    good: {
                        img: '',
                        goodName: '',
                        color: '',
                        size: '',
                        num: 0,
                    }
                }]
            }
        },
        methods: {
            getTotalPrice() {
                let tmp = 0;
                cacheList.forEach(item => {
                    tmp += item.goodInfo.total * 1
                })
                this.totalPrice = this.totalFreight * 1 + tmp;
            },
            inputPay(val) {
                this.totalFreight = val.detail.value;
                this.getTotalPrice()
            },
            getInput(val) {
                let index = val.info.index; //商品的index
                cacheList[index].goodInfo.total = val.value.price;
                this.getTotalPrice();
            },
            sure() {
                this.pageLoading();
                let goods = cacheList.map((item, index) => {
                    let result = {
                        "id": item.goodInfo.id, //订单商品id
                        "price_change": Math.round((item.goodInfo.total - cacheOldPrice[index].goodInfo.total) * 100) / 100 //改价变动金额
                    }
                    return result;
                })
                let data = {
                    id: DataFrom.bill.bill.id, //订单id
                    dispatch_price: this.totalFreight, //运费
                    total_price: this.totalPrice, //订单总价 
                }
                goods.forEach((item, index) => {
                    data['change_items[' + index + ']'] = item
                })
                this.Request('changeBillPrice', flatten(data)).then(res => {
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
            let goodlist = DataFrom.bill.goodsList;
            this.Request('billPrice', {
                id: DataFrom.bill.bill.id
            }).then(res => {
                this.totalFreight = res.order.dispatch_price;
                cacheList = res.order_goods.map((item, index) => {
                    cacheOldPrice[index] = {
                        goodInfo: {
                            total: item.price,
                            index,
                            id: item.id
                        },
                    }
                    let result = {
                        goodInfo: {
                            price: item.price_unit,
                            num: item.total,
                            total: item.price,
                            index,
                            unit: item.unit,
                            id: item.id
                        },
                        good: {
                            img: '',
                            goodName: item.title,
                            color: item.option_title,
                            size: '',
                            num: item.total,
                        }
                    }
                    if (goodlist[index].id == item.id) {
                        result.good.img = goodlist[index].img;
                    } else {
                        let len = goodlist.length;
                        for (let i = 0; i < len; i++) {
                            if (goodlist[i].id == item.id) {
                                result.good.img = goodlist[i].img;
                                break;
                            }
                        }
                    }
                    return result;
                });
                this.list = cacheList;
                this.getTotalPrice();
            })
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
            margin: 20upx auto 200upx;
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
        .child-block {
            margin-top: 20upx;
            background: #fff;
        }
        .block {
            width: 710upx;
            box-sizing: border-box;
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