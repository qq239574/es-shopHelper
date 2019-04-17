<template>
    <view class='surplus page'>
        <surplusWin></surplusWin>
        <view class="curMoney">
            <view class="tit">当前余额</view>
            <view class="num"><text>￥</text><text class='no'>25000</text></view>
        </view>
        <view class="money">
            <view class="col col1">￥</view>
            <view class="col col2"><input type="text"></view>
        </view>
        <view class="textarea"><textarea name="" id="" cols="30" rows="10"></textarea></view>
        <view class="margin30"></view>
        <longButton>确认增加</longButton>
    </view>
</template>

<script>
    import surplusWin from '../components/Vip-Surplus-Window'
    import longButton from '../../components/my-components/LongButton.vue'
    export default {
        components: {
            surplusWin,
            longButton
        }
    }
</script>

<style lang="scss" scoped>
    .margin30 {
        height: 30upx;
        .curMoney {
            width: 100%;
            height: 220upx;
            background: #fff;
            .tit {
                width: 100%;
                font-size: 28upx;
                color: #8494af;
                line-height: 28upx;
                height: 28upx;
                margin: 40upx auto 32upx;
                text-align: center;
            }
            .num {
                width: fit-content;
                text-align: center;
                width:fit-content;
                margin: auto;
                text{
                      color:#213354;
                      font-size: 30upx;
                }
                .no {
                    font-size: 60upx;
                    line-height: 60upx;
                  
                }
            }
        }
    }
</style>