<template>
    <view class='bill-block2 block'>
        <cellBlock>
            <view class="label bill__item" slot='pre'>下单时间：</view>
            <view class="body bill__item" slot='mid'>{{info.billTime}}</view>
        </cellBlock>
        <cellBlock>
            <view class="label bill__item" slot='pre'>付款时间：</view>
            <view class="body bill__item" slot='mid'>{{info.payTime}}</view>
        </cellBlock>
        <cellBlock>
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
        props: {
            info: {
                billTime: '', //下单时间
                payTime: '', //付款时间
                receiveTime: '', //收货时间
                payType: '' //付款方式
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import './block.scss'
</style>