<template>
    <view class='vip-coupon page'>
        <couponItem @click='select' :list='list'></couponItem>
        <view class="addCoupon">
            <longButton @click='addCoupon'>添加优惠券</longButton>
        </view>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
    import couponItem from '../components/Coupon-Item'
    import longButton from '../../components/my-components/LongButton.vue'
    let DataFrom = {};
    export default {
        components: {
            couponItem,
            longButton
        },
        data() {
            return {
                list: [{
                    name: '',
                    price: 0,
                    info: '',
                    num: 0
                }]
            }
        },
        methods: {
            initPage() { 
                this.Request('getVipCoupons', {
                    member_id: DataFrom.info.id,
                    status: 0 //	0: 全部 1: 未使用 2: 已使用 3: 已失效
                }).then(res => {
                    this.list = res.list.map(item => {
                        return {
                            name: item.title,
                            price: item.amount || 0,
                            info: '满' + item.enough + '可用',
                            num: 0,
                        }
                    })
                });
            },
            addCoupon() {
                this.Cacher.setData('coupon', {
                    from: 'coupon',
                    info: DataFrom.info,
                })
                uni.navigateTo({
                    url: './selectCoupon?from=coupon'
                })
            },
            select(val) {}
        },
        onLoad(option) {
            DataFrom = this.Cacher.getData(option.from);
        },
        onShow() {
            this.initPage();
        }
    }
</script>

<style lang="scss" scoped>
    .vip-coupon {
        background: #fff;
        padding: 30upx 0 150upx;
        .addCoupon {
            position: fixed;
            width: 100%;
            height: 120upx;
            padding: auto;
            display: flex;
            bottom: 0;
            left: 0;
            border-top: 1upx solid #eee;
            background: #fff;
            z-index: 10000;
            long-button {
                margin: auto;
            }
        }
    }
</style>