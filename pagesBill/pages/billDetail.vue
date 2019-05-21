<template>
    <div class='pagesBill-bill-index detail page'>
        <block0 :info='billDetail.billInfo1'></block0>
        <block1 :info='billDetail.billInfo2'></block1>
        <block2 :info='billDetail.billInfo3'></block2>
        <block3 :info='billDetail.billInfo4'></block3>
        <block4 :info='billDetail.billInfo5'></block4>
        <view class="goodInfo" v-for='(item,index) in billDetail.billInfo6' :key='index'>
            <goodBlock :goodsList='item.goodsInfo'></goodBlock>
            <expressBlock :rights='item.billInfo'></expressBlock>
        </view>
        <view class="rightsInfo">
            <myRightsBlock :rights='billDetail.billInfo7'></myRightsBlock>
        </view>
        <view class="button-group">
            <myButton :badge='badgeNum' @click='clickButton("维权备注")' v-if='Jurisdiction.order_manage'>备注</myButton>
            <myButton @click='clickButton("改价")' v-if='bill.info.status=="0"&&Jurisdiction["order_change-price"]'>改价</myButton>
            <myButton type='primary' @click='clickButton("确认付款")' v-if='bill.info.status=="0"&&Jurisdiction.order_manage'>确认付款</myButton>
            <myButton :type='canSendGood' @click='clickButton("确认发货")' v-if='bill.info.status=="1"&&Jurisdiction.order_send'>确认发货</myButton>
            <myButton type='primary' @click='clickButton(bill.info.payType==3?"确认收款":"确认收货")' v-if='bill.info.status=="2"&&Jurisdiction.order_manage'>{{bill.info.payType==3?"确认收款":"确认收货"}}</myButton>
            <myButton type='primary' @click='clickButton("维权中")' v-if='bill.info.subStatus'>维权中</myButton>
        </view>
        <!-- 确认付款与收货的弹窗 -->
        <i-modal :visible="showModel" :show-ok='!surePaying' :show-cancel='!surePaying' @ok='sure' @cancel='cancel'>
            <view class="model__title">{{modelTheme.title}}</view>
            <view class="model__content">{{modelTheme.detail}}</view>
            <view class="model__error" :style='error?"color:red;":"color:#fff;"'>*密码输入错误</view>
            <input class='model__input' type="text" :value='surePassword' @input='getSurePassword' placeholder='请输入系统登录密码' v-if='!surePaying'>
            <view class="model__img" v-else>
                <image src='/static/img/global/loading.jpg'></image>
            </view>
        </i-modal>
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
    import createBillDetail from '../components/createBillDetail.js';
    import {
        getJurisdiction
    } from '../../components/my-components/getJurisdiction.js'
    let cacheBill = {}; //缓存将要操作的订单 
    let DataFrom = {};
    let surePassword = ''; //手动确认付款密码 
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
                Jurisdiction: {},
                surePassword: '',
                error: false,
                surePaying: false, //正在确认付款？
                showModel: false,
                modelTheme: {
                    title: '手动确认付款',
                    detail: '确保买家已经付款，并且与买家协商完毕确认付款',
                    state: 'pay'
                },
                badgeNum: 0, //备注数
                rightBadgeNum: 0, //维权备注数
                bill: { //
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
                        billType: 0, //订单类型，0：分销订单，1：普通订单
                        billPrice: 0
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
                        addition: 0
                    }
                },
                billDetail: {}
            }
        },
        computed: {
            canSendGood() { //判断可否发货
                if (this.bill.info.groups_success == 1 || this.bill.info.groups_success === undefined) {
                    return !!this.bill.info.send_able ? "primary" : "disable"
                } else {
                    return "disable";
                }
            },
        },
        methods: {
            sure() {
                this.surePaying = true;
                let apiNames = ['payBill', 'receiveBill'];
                let apiname = '';
                if (this.modelTheme.state == 'pay') { //确认付款
                    apiname = apiNames[0];
                } else if (this.modelTheme.state == 'receive') { //确认收货
                    apiname = apiNames[1];
                }
                this.Request(apiname, {
                    id: cacheBill.bill.bill.id, //订单id
                    password: surePassword
                }).then(res => {
                    this.Toast(this.modelTheme.success);
                    this.initPage();
                    this.showModel = false;
                }).catch(res => {
                    this.error = true;
                }).finally(res => {
                    this.surePaying = false;
                    this.closePageLoading();
                })
            },
            cancel() {
                this.showModel = false;
            },
            getSurePassword(val) {
                surePassword = val.detail.value;
                this.surePassword = surePassword;
                this.error = false;
            },
            clickButton(state) {
                this.Cacher.setData('billDetail', {
                    from: 'billDetail',
                    billDetail: this.billDetail,
                    bill: this.bill
                })
                if (state == '维权中') {
                    this.Dialog.alert({
                        title: '',
                        message: '维权订单处理，请登录PC端后台进行操作',
                        confirmButtonText: '知道了'
                    }).then(() => {
                        // on close
                    });
                }
                if (state == '备注') {
                    DataFrom = Object.assign(DataFrom, {
                        from: 'additionList'
                    })
                    uni.navigateTo({
                        url: '../../pagesBill/pages/additionList?from=billDetail'
                    })
                } else if (state == '改价') {
                    DataFrom = Object.assign(DataFrom, {
                        from: 'changePrice'
                    })
                    uni.navigateTo({
                        url: '../../pagesBill/pages/changePrice?from=billDetail'
                    })
                } else if (state == '确认付款') {
                    this.showModel = true;
                    this.modelTheme = {
                        title: '手动确认付款',
                        detail: '确保买家已经付款，并且与买家协商完毕确认付款',
                        state: 'pay',
                        success: '确认付款成功'
                    }
                } else if (state == '维权备注') {
                    DataFrom = Object.assign(DataFrom, {
                        from: 'additionList'
                    })
                    uni.navigateTo({
                        url: '../../pagesBill/pages/additionList?from=billDetail'
                    })
                } else if (state == '维权中') {
                    this.Dialog.alert({
                        title: '',
                        message: '维权订单处理，请登录PC端后台进行操作',
                        confirmButtonText: '知道了'
                    }).then(() => {
                        // on close
                    });
                } else if (state == '确认发货') {
                    DataFrom = Object.assign(DataFrom, {
                        from: 'billProvide'
                    })
                    uni.navigateTo({
                        url: '../../pagesBill/pages/billProvide?from=billDetail'
                    })
                } else if (state == '确认收款' || state == '确认收货') {
                    this.showModel = true;
                    this.modelTheme = {
                        title: '手动' + state,
                        detail: '确保买家已经收到您的商品，并且与买家协商完毕提前' + state,
                        state: 'receive',
                        success: state + '成功'
                    }
                }
            },
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
                        billType: 0, //订单类型，0：分销订单，1：普通订单
                        billPrice: 0
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
                let mapStatus = {
                    '-2': 4, //-2退款完成
                    '-1': 4, //-1取消状态
                    0: 0, //0普通状态
                    1: 1, //1为已付款
                    2: 2, //2为已发货
                    3: 3 //3为已完成。
                }
                this.Request('billDetail', {
                    id: DataFrom.bill.bill.id
                }).then(res => {
                    this.billDetail = createBillDetail(res); //订单详情生成
                    this.bill.info.status = mapStatus[res.order.status]; //0代付款,1代发货，2待收货，3已完成，4已关闭
                    this.bill.info.send_able = res.order.send_able;
                })
                this.Request('billAddition', {
                    id: DataFrom.bill.bill.id
                }).then(res => {
                    this.badgeNum = res.list.length
                })
            }
        },
        onShow() {
            this.initPage();
        },
        onLoad(option) {
            if (option.from) {
                DataFrom = this.Cacher.getData(option.from);
            }
            cacheBill = DataFrom;
            getJurisdiction.call(this).then(res => {
                this.Jurisdiction = res;
            }).catch(res => {
                this.Toast(res.message)
            })
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
        .model__title {
            font-weight: 700;
            font-size: 30upx;
            line-height: 30upx;
            height: 30upx;
            box-sizing: border-box;
            overflow: hidden;
            width: 100%;
            margin: 0 auto 15upx;
        }
        .model__content {
            line-height: 36upx;
            font-size: 26upx;
            color: #9ca1ab;
            width: 80%;
            margin: 0 auto 0;
            text-align: left;
            box-sizing: border-box;
            overflow: hidden;
        }
        .model__input {
            height: 46upx;
            width: 70%;
            margin: auto;
            border: 1upx solid #eee;
            border-radius: 10upx;
            line-height: 46upx;
            text-align: left;
            padding: 0 20upx;
            font-size: 24upx;
        }
        .model__img {
            width: 100upx;
            height: 100upx;
            margin: -20upx auto 0;
            image {
                width: 100%;
                height: 100%;
            }
        }
        .model__error {
            color: red;
            width: 80%;
            margin: auto;
            font-size: 20upx;
            line-height: 26upx;
            height: 28upx;
            box-sizing: border-box;
            text-align: left;
        }
    }
</style>