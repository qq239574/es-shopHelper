<template>
    <view class='vip-distributor-isnot'>
        <image lazy-laod src='/static/img/global/isnot-commission.png'></image>
        <view class='title'>该会员不是分销商</view>
        <roundButton type='primary' @click='click'> 设置分销商 </roundButton>
    </view>
</template>

<script>
    import roundButton from '../../components/my-components/RoundButton'
    export default {
        components: {
            roundButton
        },
        methods:{
            click(){
                this.$emit('click',{
                    type:'setDistributor'
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .vip-distributor-isnot {
        background: #fff;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;  
        position: relative;
        &:after{
            position: absolute;
            width:100%;
            height:600upx;
            background: #fff;
            left:0;
            bottom:-600upx;
            content:'';
        }
        image {
            width: 158upx;
            height: 202upx;
            margin: 140upx auto 20upx;

        }
        .title {
            font-size: 26upx;
            width: 100%;
            height: 26upx;
            line-height: 26upx;
            text-align: center;
            margin:0 auto 40upx;
        }
    }
</style>