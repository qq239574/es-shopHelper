<template>
    <div class='pagesBill-bill-index detail page'>
        <block0></block0>
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
            <block v-if='!bill.info.subStatus'> 
                <myButton :badge='badgeNum' @click='clickButton("维权备注")'>备注</myButton>
                <myButton @click='clickButton("改价")' v-if='bill.info.status=="0"'>改价</myButton>
                <myButton type='primary' @click='clickButton("确认付款")' v-if='bill.info.status=="0"'>确认付款</myButton>
                <myButton type='primary' @click='clickButton("确认发货")' v-if='bill.info.status=="1"'>确认发货</myButton>
                <myButton type='primary' @click='clickButton("确认收货")' v-if='bill.info.status=="2"||bill.info.status=="3"'>确认收货</myButton>
            </block>
            <block v-else>
                <myButton :badge='bill.rights.addition.length' @click='clickButton("维权备注")'>备注</myButton>
                <myButton type='primary' @click='clickButton("维权中")'>维权中</myButton>
            </block>
        </view>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </div>
</template>

<script>
    import block0 from '../components/BillBlock0.vue';
    import block1 from '../components/BillBlock1.vue';
    import block2 from '../components/BillBlock2.vue';
    import block3 from '../components/BillBlock3.vue';
    import block4 from '../components/BillBlock4.vue';
    import goodBlock from '../../pages/bill/index/Card--Good.vue';
    import expressBlock from '../components/BillExpressInfo.vue';
    import myButton from '../../components/my-components/RoundButton';
    import myRightsBlock from '../components/BillRightsBlock.vue';
    let DataFrom = {};
    export default {
        components: {
            block0,
            block1,
            block2,
            block3,
            block4,
            goodBlock,
            expressBlock,
            myButton,
            myRightsBlock
        },
        data() {
            return {
                badgeNum:0,
                bill: {
                    info: { //订单及用户信息
                        name: '', //客户姓名
                        provide: '', //配送方式
                        num: 0, //商品数量
                        pay: 0, //实付
                        addtion: [], //备注
                        payType: '', //支付方式
                        subStatus: 0, //订单状态，1：维权
                        status: 0, //0代付款,1代发货，2待收货，3已完成，4已关闭
                    },
                    bill: { //订单信息
                        billId: '', //订单号
                        billDate: '', //订单时间
                        billType: 0 //订单类型，0：分销订单，1：普通订单
                    },
                    goodsList: [{ //订单商品信息
                        img: '/static/img/global/tmp.png', //商品图片
                        goodName: '', //商品名
                        color: '', //颜色
                        size: '', //型号
                        num: 0, //数量
                        price: '0' //价格
                    }],
                    rights: { // 维权信息
                        status: '', //维权状态
                        addition: [{
                            content: ''
                        }], //维权备注
                    }
                }
            }
        },
        methods: {
            clickButton() {},
            initPage() {
                this.bill = DataFrom.bill || {
                    info: { //订单及用户信息
                        name: '', //客户姓名
                        provide: '', //配送方式
                        num: 0, //商品数量
                        pay: 0, //实付
                        addtion: [], //备注
                        payType: '', //支付方式
                        subStatus: 0, //订单状态，1：维权
                        status: 0, //0代付款,1代发货，2待收货，3已完成，4已关闭
                    },
                    bill: { //订单信息
                        billId: '', //订单号
                        billDate: '', //订单时间
                        billType: 0 //订单类型，0：分销订单，1：普通订单
                    },
                    goodsList: [{ //订单商品信息
                        img: '/static/img/global/tmp.png', //商品图片
                        goodName: '', //商品名
                        color: '', //颜色
                        size: '', //型号
                        num: 0, //数量
                        price: '0' //价格
                    }],
                    rights: { // 维权信息
                        status: '', //维权状态
                        addition: [{
                            content: ''
                        }], //维权备注
                    }
                };
                this.badgeNum=DataFrom.bill.info.addtion.length;
                 console.log('detail>>>>>>', DataFrom.bill.info.addtion)
            }
        },
        onShow() {
            this.initPage();
        },
        onLoad(option) {
            if (option.from) {
                DataFrom = this.Cacher.getData(option.from);
            }
            this.initPage();
           
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
        .goodInfo,
        .rightsInfo {
            width: 710upx;
            background: #fff;
            margin: auto;
            border-radius: 8upx;
        }
        .rightsInfo {
            margin: 20upx auto 0;
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