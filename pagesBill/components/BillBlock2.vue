<template>
    <view class='bill-block2 block'>
        <cellBlock>
            <view class="label bill__item" slot='pre'>下单时间：</view>
            <view class="body bill__item" slot='mid'>{{info.billTime}}</view>
        </cellBlock>
        <cellBlock v-if='info&&info.billStatus!=0'>
            <view class="label bill__item" slot='pre'>付款时间：</view>
            <view class="body bill__item" slot='mid'>{{info.payTime}}</view>
        </cellBlock>
        <!-- //订单状态 -2退款完成。-1取消状态。 0普通状态。1为已付款。2为已发货。3为已完成。 -->
        <cellBlock v-if='info&&info.billStatus!=0&&info.billStatus!=1'>
            <view class="label bill__item" slot='pre'>收货时间：</view>
            <view class="body bill__item" slot='mid'>{{info.receiveTime}}</view>
        </cellBlock>
    </view>
</template>

<script>
    import cellBlock from './BillDetailCell'
    export default {
        components: {
            cellBlock
        },
        watch:{
            info(){
                console.log(this.info)
            }
        },
        props: {
            info: {
                billTime: '', //下单时间
                payTime: '', //付款时间
                receiveTime: '', //收货时间
                payType: '', //付款方式
                billStatus: 0
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import './block.scss'
</style>