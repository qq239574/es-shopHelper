<template>
    <view class='vip-busi-block2'>
        <inputItem :disabled='true' label='最近下单时间' :value='info.newBillTime'></inputItem>
        <inputItem :disabled='true' label='最近浏览时间' :value='info.newBrowserTime'></inputItem>
    </view>
</template>

<script>
    import inputItem from '../../components/my-components/editBlock-InputItem.vue'
    export default {
        components: {
            inputItem
        },
        props: {
            info: {
                type: Object,
                default: {
                   newBillTime:'',
                   newBrowserTime:''
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .vip-busi-block2 {
        background: #fff;
    }
</style>