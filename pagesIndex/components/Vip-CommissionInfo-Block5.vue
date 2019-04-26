<template>
    <view class='vip-was-distributor'>
        <inputItem label='上级分销商' :disabled='true' value='230.50元'></inputItem>
        <inputItem label='申请时间' :disabled='true' value='230.50元'></inputItem>
        <view class="hadRefused" >已拒绝该用户的分销商申请</view>
        <view class="button"> 
            <roundButton @click='allow' type='primary'> 设置为分销商 </roundButton>
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
        },
        data() {
            return {
                hadRefused: true
            }
        },
        methods: { 
            allow(){
                 this.$emit('click',{
                    type:'set'
                })
            }
        },
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
        .hadRefused{
            width:100%;
            text-align: center;
            color:#acb1ba;
            line-height: 100upx;
        }
    }
</style>