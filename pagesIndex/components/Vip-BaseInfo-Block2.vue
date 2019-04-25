<template>
    <view class='vip-baseinfo-block2'>
        <selectItem label='余额' :value='info.money' @click='clickItem'></selectItem>
        <selectItem label='积分' :value='info.score' @click='clickItem'></selectItem>
        <selectItem label='优惠券' :value='info.coupon' @click='clickItem'></selectItem>
    </view>
</template>

<script>
    import selectItem from '../../components/my-components/editBlock-SelectItem.vue'
    export default {
        props: {
            info: {
                type: Object,
                default: {
                    score:0,
                    money:0,
                    coupon:0
                }
            }
        },
        components: {
            selectItem,
        },
        methods: {
            clickItem(val) {
                this.$emit('click', val)
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>