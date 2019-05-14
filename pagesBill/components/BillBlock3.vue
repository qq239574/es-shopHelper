<template>
    <view class='bill-block3 block'>
        <cellBlock>
            <view class="label bill__item" slot='pre' style='text-indent:2em;'>买家：</view>
            <view class="body bill__item" slot='mid'>{{info.buyer}}</view>
        </cellBlock>
        <cellBlock>
            <view class="label bill__item" slot='pre'>买家备注：</view>
            <view class="body bill__item" slot='mid'>{{info.addtion}}</view>
        </cellBlock>
        <cellBlock>
            <view class="label bill__item" slot='pre'>配送方式：</view>
            <view class="body bill__item" slot='mid'>{{info.provideType}}</view>
        </cellBlock>
        <cellBlock>
            <view class="label bill__item" style='text-indent:1em;' slot='pre'>收货人：</view>
            <view class="body bill__item" slot='mid'>{{info.receiver}}</view>
        </cellBlock>
        <cellBlock>
            <view class="label bill__item" slot='pre'>收货地址：</view>
            <view class="body bill__item" slot='mid'>{{info.address}}</view>
        </cellBlock>
         <cellBlock>
            <view class="label bill__item" slot='pre'>手机号码：</view>
            <view class="body bill__item" slot='mid'>{{info.tel}}</view>
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
                buyer: '', //买家
                addtion: '', //买家备注
                provideType: '', //配送方式
                receiver: '', //收货人
                address: '' //收货地址
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import './block.scss'
</style>