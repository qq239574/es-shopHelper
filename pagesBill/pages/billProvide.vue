<template>
    <view class='bill-provide page'>
        <ProvideGoods></ProvideGoods>
        <ProvideBlock @click='clickCell'></ProvideBlock>
        <longButton>确认发货</longButton>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
    import ProvideGoods from '../components/ProvideBoods'
    import ProvideBlock from '../components/ProvideBlock'
    import longButton from '../../components/my-components/LongButton.vue'
    export default {
        components: {
            ProvideGoods,
            ProvideBlock,
            longButton
        },
        methods: {
            clickCell(val) {
                console.log(val);
                if (val.name == '备注') {
                    uni.navigateTo({
                        url: './billAddition'
                    })
                } else if (val.name == '物流单号') {
                    uni.navigateTo({
                        url: './billId'
                    })
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .bill-provide {}
</style>