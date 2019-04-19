<template>
    <view class='multi-block grace-form'>
        <view class="block">
            <inputItem :disable='true' label='规格' value='亮黑色'></inputItem>
            <inputItem :disable='true' label='价格' value='19.90'></inputItem>
            <inputItem :disable='true' label='库存' value='235'></inputItem> 
        </view>
    </view>
</template>

<script>
    import inputItem from '../../components/my-components/editBlock-InputItem.vue'
    export default {
        components: {
            inputItem,
        }
    }
</script>

<style lang="scss" scoped>
    .multi-block {
        width: 100%;
        height: fit-content;
        margin: 20upx auto 0;
        .block {
            width: 710upx;
            margin: auto;
            background: #fff;
        }
    }
</style>