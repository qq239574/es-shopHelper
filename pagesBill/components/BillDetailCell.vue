<template>
    <view class='bill-cell'>
        <view class='pre'>
            <slot name='pre'></slot>
            <view class='mid'>
                <slot name='mid'></slot>
            </view>
        </view>
        <view class='aft'>
            <slot name='aft'></slot>
        </view>
    </view>
</template>

<script>
    export default {}
</script>

<style lang="scss" scoped>
    .bill-cell {
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        min-height: 55upx;
        height: fit-content;
        align-items: flex-start;
        justify-content: space-between;
        view {
            height: 100%;
            width: fit-content;
            white-space: pre-wrap;
            word-break: break-all;
            box-sizing: border-box;
            padding: 0 0 10upx 19upx;
        }
        .pre {
            display: flex;
            flex-wrap: nowrap;
            
            .mid{
                padding-top: 0 ;
                max-width: 530upx;
            }
        }
        .aft {
            padding: 0 20upx 0 0;
        }
    }
</style>