<template>
    <div class='pagesBill-bill-index detail page'>
        <block1></block1>
        <block2></block2>
        <block3></block3>
        <block4></block4>
        <view class="goodInfo">
            <goodBlock :goodsList='bill.goodsList'></goodBlock>
            <expressBlock :rights='bill.rights'></expressBlock>
        </view>
        <view class="rightsInfo">
            <myRightsBlock></myRightsBlock>
        </view>
        <view class="button-group">
            <myButton :badge='bill.rights.addition.length' @click='clickButton("维权备注")'>备注</myButton>
            <myButton type='primary' @click='clickButton("维权中")'>维权中</myButton>
        </view>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex'
    import block1 from '../components/BillBlock1.vue';
    import block2 from '../components/BillBlock2.vue';
    import block3 from '../components/BillBlock3.vue';
    import block4 from '../components/BillBlock4.vue';
    import goodBlock from '../../pages/bill/index/Card--Good.vue';
    import expressBlock from '../components/BillExpressInfo.vue';
    import myButton from '../../components/my-components/RoundButton';
    import myRightsBlock from '../components/BillRightsBlock.vue'
    export default {
        components: {
            block1,
            block2,
            block3,
            block4,
            goodBlock,
            expressBlock,
            myButton,
            myRightsBlock
        },
        computed: {
            ...mapState({
                billInfo: 'billDetail'
            })
        },
        data() {
            return {
                bill: {
                    info: { //订单及用户信息
                        name: '张三', //客户姓名
                        provide: '到店自提', //配送方式
                        num: 4, //商品数量
                        pay: 2165653.453, //实付
                        addtion: [], //备注
                        payType: 'wx', //支付方式
                        subStatus: 0, //订单状态，1：维权
                        status: 0, //0代付款,1代发货，2待收货，3已完成，4已关闭
                    },
                    bill: { //订单信息
                        billId: 'ES204565656526265656565', //订单号
                        billDate: '2018-05-12 15:23:12', //订单时间
                        billType: 0 //订单类型，0：分销订单，1：普通订单
                    },
                    goodsList: [{ //订单商品信息
                        img: '/static/img/global/tmp.png', //商品图片
                        goodName: '翻页蓝色的空间疯狂大富科技上来看饭店经理看时间对方离开时间slikfjsdfklklsjfdlkjslkdjfl', //商品名
                        color: '浅绿色', //颜色
                        size: 'S码', //型号
                        num: 2, //数量
                        price: '15455.2' //价格
                    }, {
                        img: '/static/img/global/tmp.png',
                        goodName: '翻页蓝色的空间疯狂大富科技上来看饭店经理看时间对方离开时间',
                        color: '浅绿色',
                        size: 'S码',
                        num: 2,
                        price: '152344.2'
                    }],
                    rights: { // 维权信息
                        status: '退款退货', //维权状态
                        addition: [{
                            content: '摔坏了'
                        }], //维权备注
                    }
                }
            }
        },
        methods: {
            clickButton() {
            }
        },
        beforeMount() {
            console.log('hello', this.billInfo)
        },
    }
</script>

<style lang="scss" scoped>
    .pagesBill-bill-index {
        padding-bottom: 120upx;
        .block {
            width: 710upx;
            box-sizing: border-box;
            background: #fff;
            margin: auto;
            border-radius: 8upx;
            padding: 21upx 0;
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
        .goodInfo ,.rightsInfo{
            width: 710upx;
            background: #fff;
            margin: auto;
            border-radius: 8upx;
        }
        .rightsInfo{
            margin:20upx auto 0;
        }
        .button-group {
            display: flex;
            flex-wrap: nowrap;
            justify-content: flex-end;
            height: 100upx;
            width: 100%;
            background: #fff;
            position: fixed;
            bottom: 0;
            left: 0;
            border-top: 1upx solid #eee;
            my-button {
                margin: 20upx 20upx 0 0;
            }
        }
    }
</style>