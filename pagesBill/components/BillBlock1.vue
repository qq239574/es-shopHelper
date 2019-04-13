<template>
    <view class='bill-block1 block'>
        <cellBlock>
            <view class="label bill__item" slot='pre'>订单编号：</view>
            <view class="body bill__item" slot='mid'>ES201546356855656984545545545545545545668</view>
        </cellBlock>
        <cellBlock>
            <view class="label bill__item" slot='pre'>订单状态：</view>
            <view class="body bill__item" slot='mid'>代付款</view>
        </cellBlock>
        <cellBlock>
            <view class="label bill__item" slot='pre'>订单类型：</view>
            <view class="body bill__item" slot='mid'>普通订单</view>
        </cellBlock>
        <cellBlock>
            <view class="label bill__item" slot='pre'>订单来源：</view>
            <view class="body bill__item" slot='mid'>小程序</view>
        </cellBlock>
        <cellBlock>
            <view class="label bill__item" slot='pre'>支付方式：</view>
            <view class="body bill__item" slot='mid'>微信支付</view>
        </cellBlock>
    </view>
</template>

<script>
    import cellBlock from './BillDetailCell'
    export default {
        components: {
            cellBlock
        }
    }
</script>

<style lang="scss" scoped>
    @import './block.scss' ;
</style>