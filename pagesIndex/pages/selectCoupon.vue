<template>
    <view class='select-coupon page'>
        <search placeholder='搜索优惠券'></search>
        <view class="margin30"></view>
        <couponItem></couponItem>
        <blockFoot></blockFoot>
        <!-- 浮层 -->
        <floatLayer :toggle='toggle'>
            <block>
                <pickerItem @change='change'></pickerItem>
            </block>
        </floatLayer>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
    import search from '../../components/my-components/SearchInput'
    import couponItem from '../components/Coupon-Item2.vue'
    import blockFoot from '../components/selectCoupon--Foot.vue'
    import floatLayer from '../components/SelectCoupon-Picker.vue'
    import pickerItem from '../components/SelectCoupon-PickerItem.vue'
    export default {
        components: {
            search,
            couponItem,
            blockFoot,
            floatLayer,
            pickerItem
        },
        data() {
            return {
                toggle: true
            }
        },
        methods: {
            change(val) {
                console.log(val)
            }
        },
    }
</script>

<style lang="scss" scoped>
    .select-coupon {
        background: #fff;
        .margin30 {
            height: 30upx;
        }
    }
</style>