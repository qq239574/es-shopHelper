<template>
    <view class='multi-specification page'>
        <multiBlock></multiBlock>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
import multiBlock from '../components/editGood-BlockMult'
    export default {
        components:{
            multiBlock
        }
    }
</script>

<style lang="scss" scoped>
    .multi-specification {
         
        
    }
</style>