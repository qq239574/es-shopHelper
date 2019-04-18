<template>
    <view class='vip-baseinfo-block2'>
        <selectItem label='余额' value='2564452' @click='clickItem'></selectItem>
        <selectItem label='积分' value='2564452'  @click='clickItem'></selectItem>
        <selectItem label='优惠券' value='2564452' @click='clickItem'></selectItem>
    </view>
</template>

<script>
    import selectItem from '../../components/my-components/editBlock-SelectItem.vue'
    export default {
        components: {
            selectItem,
        },
        methods: {
            clickItem(val) {
               this.$emit('click',val)
            }, 
        },
    }
</script>

<style lang="scss" scoped>

</style>