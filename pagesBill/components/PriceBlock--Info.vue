<template>
    <view class='bill-block2 block'>
        <view class="border"></view>
        <cellBlock>
            <view class="label bill__item" slot='pre'>单价：</view>
            <view class="body bill__item" slot='aft'>2018-12-11 18:12:11</view>
        </cellBlock>
        <cellBlock>
            <view class="label bill__item" slot='pre'>订单数量：</view>
            <view class="body bill__item" slot='aft'>2018-12-11 18:12:11</view>
        </cellBlock>
        <cellBlock>
            <view class="label bill__item" slot='pre'>小计：</view>
            <view class="body bill__item" slot='aft'>2018-12-11 18:12:11</view>
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
    @import './block.scss';
    .block {
        width: 100%;
        padding: 0 20upx 0;
        background: #fcfcfc;
        margin:0 auto 0;
        .border {
            height: 0;
            width: 670upx;
            margin: auto;
            border-top: 1upx solid #eee;
            margin-bottom: 20upx;
        }
        .label {
            font-size: 24upx;
            color: #6e7685;
            font-weight: 500;
        }
    }
</style>