<template>
    <view class='bill-block3 block'>
        <cellBlock>
            <view class="label bill__item" slot='pre' style='text-indent:2em;'>买家：</view>
            <view class="body bill__item" slot='mid'>张三</view>
        </cellBlock>
        <cellBlock>
            <view class="label bill__item" slot='pre'>买家备注：</view>
            <view class="body bill__item" slot='mid'>海尔双开门大冰箱  573升 以及</view>
        </cellBlock>
        <cellBlock>
            <view class="label bill__item" slot='pre'>配送方式：</view>
            <view class="body bill__item" slot='mid'>快递</view>
        </cellBlock>
        <cellBlock>
            <view class="label bill__item" style='text-indent:1em;' slot='pre'>收货人：</view>
            <view class="body bill__item" slot='mid'>张三</view>
        </cellBlock>
        <cellBlock>
            <view class="label bill__item" slot='pre'>收货地址：</view>
            <view class="body bill__item" slot='mid'>山东省 青岛市 市北区 龙城路 卓越世纪中心 4号楼 21楼易联互动</view>
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