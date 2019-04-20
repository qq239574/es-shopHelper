<template>
    <view class='bill-card'>
        <cardTitle :bill='bill.bill' @click='clickBill'></cardTitle>
        <cardGood :goodsList='bill.goodsList' @click='clickBill'></cardGood>
        <cardInfo :info='bill.info' @click='clickBill'></cardInfo>
        <cardTemp :rights='bill.rights' @click='clickBill'></cardTemp>
    </view>
</template>

<script>
    import cardTitle from './Card--Title';
    import cardInfo from './Card--Info';
    import cardGood from './Card--Good';
    import cardTemp from './Card--Temp.vue'
    export default {
        components: {
            cardTitle,
            cardInfo,
            cardGood,
            cardTemp
        },
        props: {
            bill: {
                type: Object,
                default: () => ({
                    info: {
                        name: '',
                        provide: '到店自提',
                        num: 0,
                        pay: 0,
                        addtion: [{
                            content: '哈哈哈'
                        }],
                        payType: '',
                        subStatus: 0, //订单子状态，1：维权
                        status: 0, //0代付款,1代发货，2待收货，3已完成，4已关闭
                    },
                    bill: {
                        billId: '',
                        billDate: '',
                        billType: 0 //订单类型，0：分销订单，1：普通订单
                    },
                    goodsList: [{
                        img: '',
                        goodName: '',
                        color: '',
                        size: '',
                        num: 0,
                        price: '0',
                        specifications: 'single', //单规格，multi多规格
                    }],
                    rights: {
                        subStatus: 0, //订单子状态，1：维权
                        status: '退款退货',
                        addition: [], //{content:''}
                    }
                })
            }
        },
        methods: {
            clickBill(val) {
                this.$emit('click', Object.assign({}, val, {
                    bill: this.bill
                }))
            }
        },
    }
</script>

<style lang="scss" scoped>
    .bill-card {
        width: 710upx;
        height: fit-content;
        background: #fff;
        border-radius: 8upx;
        margin: 0 auto 20upx;
    }
</style>