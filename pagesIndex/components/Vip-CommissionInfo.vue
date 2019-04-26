<template>
    <view class='vip-commission-block'>
        <!-- 分销商 -->
        <block v-if='info.isCommission==1'>
            <Block1 :info='info'></Block1>
            <Block2 :info='info'></Block2>
            <view class="button" @click='removeDist'>取消分销商</view>
        </block>
        <!-- 没申请过 -->
        <Block3 :info='info' @click='setDistributor' v-else-if='info.isCommission==-2'></Block3>
        <!-- 待审核 -->
        <Block4 :info='info' @click='exame' v-else-if="info.isCommission==0"></Block4>
        <!-- 拒绝过 -->
        <Block5 @click='setDistributor' v-else></Block5>
    </view>
</template>

<script>
    import Block1 from './Vip-CommissionInfo-Block1.vue'
    import Block2 from './Vip-CommissionInfo-Block2.vue'
    import Block3 from './Vip-CommissionInfo-Block3.vue'
    import Block4 from './Vip-CommissionInfo-Block4.vue'
    import Block5 from './Vip-CommissionInfo-Block5.vue'
    export default {
        props: {
            info: {
                type: Object,
                default: {
                    isCommission: 0, //是否分销商，0不是，1曾是，2是
                    registerTime: '', //注册时间
                    superDistributor: { //上级分销商
                        name: ''
                    },
                    beDistributorTime: { //成为分销商时间
                        value: ''
                    },
                    distributorClass: { //分销商等级
                        name: ''
                    },
                    accumCommission: { //累计佣金
                        value: 0
                    },
                    hadGet: { //已提现佣金
                        value: 0
                    },
                    waitMoney: { //待入账佣金
                        value: 0
                    },
                    commBill: { //分销订单
                        value: 0
                    },
                    subDistributor: { //分销下级
                        num: 0
                    },
                    firstSub: { //一级
                        num: 0,
                        distributor: 0
                    },
                    secondSub: { //二级
                        num: 0,
                        distributor: 0
                    },
                    thirdSub: { //三级
                        num: 0,
                        distributor: 0
                    }
                }
            }
        },
        components: {
            Block1,
            Block2,
            Block3,
            Block4,
            Block5
        },
        methods: {
            removeDist() {
                this.Dialog.confirm({
                    title: '',
                    message: '您确认要取消ta的分销商资格吗？'
                }).then(() => {
                    // on confirm
                    this.$emit('click', {
                        type: 'remove',
                    })
                }).catch(() => {
                    // on cancel
                });
            },
            setDistributor() {
                this.Dialog.confirm({
                    title: '',
                    message: '您确认要将ta设为分销商吗？'
                }).then(() => {
                    // on confirm
                    this.$emit('click', {
                        type: 'set',
                    })
                }).catch(() => {
                    // on cancel
                });
            },
            exame(val) {
                if (val.type == 'refuse') {
                    this.Dialog.confirm({
                        title: '',
                        message: '您确认拒绝ta的分销商申请吗？'
                    }).then(() => {
                        // on confirm
                        this.$emit('click', {
                            type: 'refuse',
                        })
                    }).catch(() => {
                        // on cancel
                    });
                } else {
                    this.Dialog.confirm({
                        title: '',
                        message: '您确认同意ta的分销商申请吗？'
                    }).then(() => {
                        // on confirm
                        this.$emit('click', {
                            type: 'allow',
                        })
                    }).catch(() => {
                        // on cancel
                    });
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .vip-commission-block {
        .button {
            height: 60upx;
            width: 240upx;
            box-sizing: border-box;
            line-height: 58upx;
            border: 1upx solid #fd6b3e;
            color: #fd6b3e;
            text-align: center;
            font-size: 27upx;
            margin: 40upx auto;
            border-radius: 30upx;
        }
    }
</style>