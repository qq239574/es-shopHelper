<template>
    <view class='vip-was-distributor'>
        <inputItem label='上级分销商' :disabled='true' value='230.50元'></inputItem>
        <inputItem label='申请时间' :disabled='true' value='230.50元'></inputItem>
        <view class="button">
            <roundButton  > 审核拒绝 </roundButton>
            <roundButton type='primary'> 审核通过 </roundButton>
        </view>
    </view>
</template>

<script>
    import roundButton from '../../components/my-components/RoundButton'
    import inputItem from '../../components/my-components/editBlock-InputItem.vue'
    export default {
        components: {
            inputItem,
            roundButton
        }
    }
</script>

<style lang="scss" scoped>
    .vip-was-distributor {
        .button{
            width:467upx;
            margin:60upx auto;
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-around;
        }
    }
</style>