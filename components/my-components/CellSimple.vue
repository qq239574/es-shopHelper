<template>
    <view class='my-cell-simple'>
        <view class='my-cell-simple__pre cell-font-gray'>
            <slot name="pre"></slot>
        </view>
        <view class="my-cell-simple__aft cell-font-black ">
            <slot name="aft"></slot>
        </view>
    </view>
</template>

<script>
    export default {}
</script>

<style lang="scss" scoped>
    .my-cell-simple {
        display: flex;
        background: #fff;
        width: 100%;
        position: relative;
        box-sizing: border-box;
        height: 100upx;
        &:after {
            content: '';
            position: absolute;
            width: 702upx;
            height: 0;
            bottom: 0;
            border-bottom: 2upx solid #eee;
            left: 24upx;
            margin: auto;
        }
        >.my-cell-simple__pre,
        >.my-cell-simple__aft {
            position: absolute;
            height: 100%;
            top: 0;
            height: 100%;
            line-height: 100upx;
        }
        >.my-cell-simple__pre {
            left: 47upx;
        }
        >.my-cell-simple__aft {
            right: 47upx;
        }
    }
</style>
