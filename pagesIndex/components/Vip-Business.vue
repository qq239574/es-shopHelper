<template>
    <view class='vip-busi-block'>
        <Block1 :info='info.info1'></Block1>
        <Block2 :info='info.info2'> </Block2>
        <view class='margin50'></view>
        <longButton @click='checkBill' v-if='Jurisdiction.member_list_manage'>查看订单</longButton>
    </view>
</template>

<script>
    import Block1 from './Vip-Business-Block1.vue'
    import Block2 from './Vip-Business-Block2.vue'
    import longButton from '../../components/my-components/LongButton.vue'
    export default {
        components: {
            Block1,
            Block2,
            longButton
        },
        props: {
            Jurisdiction: {
                type: Object,
                default: {},
                required: true
            },
            info: {
                type: Object,
                default: {
                    info1: {
                        pay: 0,
                        bill: 0,
                        rights: 0,
                        refund: 0
                    },
                    info2: {
                        newBillTime: '',
                        newBrowserTime: ''
                    }
                }
            }
        },
        methods: {
            checkBill() {
                this.$emit('click', {
                    type: 'checkBill'
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .margin50 {
        height: 50upx;
    }
</style>