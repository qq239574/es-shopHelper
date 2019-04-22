<template>
    <view class='vip-coupon page'>
        <couponItem @click='select' :list='list'></couponItem>
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
        data() {
            return {
                list: [{
                    name: '女神节专享通用优惠券',
                    price: 20,
                    info: '部分商品满100减20',
                    num: 0
                }]
            }
        },
        methods: {
            addCoupon() {
                uni.navigateTo({
                    url: './selectCoupon'
                })
            },
            select(val) {
                console.log(val)
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