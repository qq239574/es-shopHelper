<template>
    <view class='bill-block4 block'>
        <cellBlock>
            <view class="label bill__item" slot='pre' style='text-indent:1em;'>佣金状态：</view>
            <view class="body bill__item" slot='mid'>待入账</view>
        </cellBlock>
        <cellBlock>
            <view class="label bill__item" slot='pre'>一级分销商：</view>
            <view class="body bill__item" slot='mid'>张三 15288988888</view>
            <view class="foot  bill__item" slot='aft'>佣金：￥12.3</view>
        </cellBlock>
        <cellBlock>
            <view class="label bill__item" slot='pre'>二级分销商：</view>
            <view class="body bill__item" slot='mid'>张三 15288988888</view>
            <view class="foot  bill__item" slot='aft'>佣金：￥12.3</view>
        </cellBlock>
        <cellBlock>
            <view class="label bill__item" slot='pre'>三级分销商：</view>
            <view class="body bill__item" slot='mid'>张三 15288988888</view>
            <view class="foot  bill__item" slot='aft'>佣金：￥12.3</view>
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
    @import './block.scss'
</style>