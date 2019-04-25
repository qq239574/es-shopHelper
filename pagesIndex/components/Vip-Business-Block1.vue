<template>
    <view class='vip-busi-block1'>
        <inputItem :disabled='true' label='累计消费' :value='info.pay'></inputItem>
        <inputItem :disabled='true' label='累计订单' :value='info.bill'></inputItem>
        <inputItem :disabled='true' label='累计维权' :value='info.rights'></inputItem>
        <inputItem :disabled='true' label='累计退款' :value='info.refund'></inputItem>
    </view>
</template>

<script>
    import selectItem from '../../components/my-components/editBlock-SelectItem.vue'
    import inputItem from '../../components/my-components/editBlock-InputItem.vue'
    export default {
        props: {
            info: {
                type: Object,
                default: {
                    pay: 0,
                    bill: 0,
                    rights: 0,
                    refund: 0
                }
            }
        },
        components: {
            selectItem,
            inputItem
        }
    }
</script>

<style lang="scss" scoped>
    .vip-busi-block1 {
        background: #fff;
        margin: 0 auto 20upx;
    }
</style>