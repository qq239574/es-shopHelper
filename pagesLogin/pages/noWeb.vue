<template>
    <view class='noweb page'>
        <view class="margin"></view>
        <nodata type='noweb' tip='请检查网络连接'></nodata>
    </view>
</template>

<script>
    import nodata from '../../components/my-components/nodata.vue'
    export default {
        components: {
            nodata
        }
    }
</script>

<style lang="scss" scoped>
    .noweb {
        background: #fff;
        .margin{
            height:200upx;
        }
    }
</style>