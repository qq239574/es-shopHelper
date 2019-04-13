<template>
    <view class='bill-block2 block'>
        <cellBlock>
            <view class="label bill__item" slot='pre'>下单时间：</view>
            <view class="body bill__item" slot='mid'>2018-12-11 18:12:11</view>
        </cellBlock>
        <cellBlock>
            <view class="label bill__item" slot='pre'>付款时间：</view>
            <view class="body bill__item" slot='mid'>2018-12-11 18:12:11</view>
        </cellBlock>
        <cellBlock>
            <view class="label bill__item" slot='pre'>收货时间：</view>
            <view class="body bill__item" slot='mid'>2018-12-11 18:12:11</view>
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

<style lang="scss" scoped>@import './block.scss'
    
</style>