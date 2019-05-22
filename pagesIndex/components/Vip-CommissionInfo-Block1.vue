<template>
    <view class=' vip-com-block1'>
        <inputItem label='上级分销商' :disabled='true' :value='info.superDistributor.name'></inputItem>
        <inputItem label='成为分销商时间' :disabled='true' :value='info.beDistributorTime.value'></inputItem>
        <inputItem label='分销商等级' :disabled='true' :value='info.distributorClass.name'></inputItem>
        <inputItem label='累计佣金' :disabled='true' :value='formater(info.accumCommission.value)'></inputItem>
        <inputItem label='已提现佣金' :disabled='true' :value='formater(info.hadGet.value)'></inputItem>
        <inputItem label='待入账佣金' :disabled='true' :value='formater(info.waitMoney.value)'></inputItem>
        <inputItem label='分销订单' :disabled='true' :value='info.commBill.value+"个"'></inputItem>
    </view>
</template>

<script>
    import inputItem from '../../components/my-components/editBlock-InputItem.vue'
    import {
        number_format
    } from '../../components/my-components/formater.js'
    export default {
        components: {
            inputItem
        },
        props: {
            info: {
                type: Object,
                default: {}
            }
        },
        methods: {
            formater(val) {
                return number_format(val, 2, '.', ',') + '元'
            }
        },
    }
</script>

<style lang="scss" scoped>
    .vip-com-block1 {
        background: #fff;
        margin: 0 0 20upx;
    }
</style>