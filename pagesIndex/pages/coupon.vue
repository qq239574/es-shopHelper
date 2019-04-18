<template>
    <view class='vip-coupon page'>
        <couponItem></couponItem>
        <longButton @click='addCoupon'>添加优惠券</longButton>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
    import couponItem from '../components/Coupon-Item'
    import longButton from '../../components/my-components/LongButton.vue'
    export default {
        components: {
            couponItem,
            longButton
        },
        methods: {
            addCoupon() {
                uni.navigateTo({
                    url: './selectCoupon'
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .vip-coupon {
        background: #fff;
        padding: 30upx 0 0;
    }
</style>