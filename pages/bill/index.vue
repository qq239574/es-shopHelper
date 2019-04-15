<template>
    <view class='pages-bill-index page'>
        <SearchInput @input='search'></SearchInput>
        <TabCard @tabChange='tabChange'></TabCard>
        <Card v-for='(item,index) in billList' :key='index' :bill='item' @click='clickBill'></Card>
    </view>
</template>

<script>
    import TabCard from '../../components/my-components/Tabs';
    import Card from './index/Card';
    import SearchInput from '../../components/my-components/SearchInput.vue';
    import {
        mapMutations
    } from 'vuex'
    export default {
        components: {
            TabCard,
            Card,
            SearchInput
        },
        onShow() {
            console.log('biioiiii')
        },
        data() {
            return {
                billList: [{
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
                }],
                curTab: { //当前标签
                    cateid: 0,
                    index: 0,
                    name: "代付款"
                }, //{cateid: 0, index: 0, name: "代付款"}
            }
        },
        methods: {
            tabChange(tab) {
                console.log(tab);
                this.curTab = tab;
            },
            ...mapMutations({
                saveBill: 'setBillDetail'
            }),
            search(val) {
                console.log(val)
            },
            clickBill(val) {
                if (val.type != 'button') {
                    this.saveBill(val)
                    uni.navigateTo({ //去详情页
                        url: '../../pagesBill/pages/index'
                    })
                } else if (val.type == 'button') {
                    console.log(val.detail.val)
                    if (val.detail.val == '备注') {
                        uni.navigateTo({
                            url: '../../pagesBill/pages/billAddition'
                        })
                    } else if (val.detail.val == '改价') {
                        uni.navigateTo({
                            url: '../../pagesBill/pages/changePrice'
                        })
                    } else if (val.detail.val == '确认付款') {
                    } else if (val.detail.val == '维权备注') {
                        uni.navigateTo({
                            url: '../../pagesBill/pages/billAddition'
                        })
                    } else if (val.detail.val == '维权中') {} else if (val.detail.val == '确认发货') {
                        uni.navigateTo({
                            url: '../../pagesBill/pages/billProvide'
                        })
                    } else if (val.detail.val == '确认收货') {}
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>