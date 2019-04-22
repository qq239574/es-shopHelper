<template>
    <view class=''>
        <inputItem label='分销下级' :value='info.subDistributor.num'></inputItem>
        <inputItem label='一级' :value='info.firstSub.num+"人(分销商："+info.firstSub.distributor+"人)"'></inputItem>
        <inputItem label='二级' :value='info.secondSub.num+"人(分销商："+info.secondSub.distributor+"人)"'></inputItem>
        <inputItem label='三级' :value='info.thirdSub.num+"人(分销商："+info.thirdSub.distributor+"人)"'></inputItem>
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
                default: {}
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>