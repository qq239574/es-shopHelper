<template>
    <view class='surplus page'>
        <surplusWin></surplusWin>
        <view class="curMoney">
            <view class="tit">当前余额</view>
            <view class="num"><text>￥</text><text class='no'>25000</text></view>
        </view>
        <view class="money">
            <view class="col col1">￥</view>
            <view class="col col2"><input type="digit" placeholder='输入增加金额数' placeholder-style="color:#d2d5db;font-weight:500;"></view>
        </view>
        <view class="textarea">
            <textarea class='textarea' :value='val' placeholder-style="color:#d2d5db" :maxlength='40' placeholder="输入备注" @input='getAddition' />
            <view class='counter'>{{textLength}}/40</view>
        </view>
        <view class="margin30"></view>
        <longButton :disable='disabled' @click='sure'>确认增加</longButton>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
    import surplusWin from '../components/Vip-Surplus-Window'
    import longButton from '../../components/my-components/LongButton.vue'
    export default {
        components: {
            surplusWin,
            longButton
        },
        data() {
            return {
                textLength: 0,
                disabled: true
            }
        },
        methods: {
            getAddition(val) {
                this.textLength = val.detail.value.length;
            },
            sure() {
                uni.navigateBack();
            },
        }
    }
</script>

<style lang="scss" scoped>
    .margin30 {
        height: 30upx;
    }
    .curMoney {
        width: 100%;
        height: 220upx;
        background: #fff;
        overflow: hidden;
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
            width: fit-content;
            margin: auto;
            text {
                color: #213354;
                font-size: 30upx;
            }
            .no {
                font-size: 60upx;
                line-height: 60upx;
                font-weight: 600;
            }
        }
    }
    .money {
        background: #fff;
        height: 120upx;
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        &:after {}
        view,
        input {
            height: 100%;
            line-height: 120upx;
            font-size: 28upx;
            color: #213354;
            font-weight: 600;
            padding: 0 5upx;
            box-sizing: border-box;
        }
        .col1 {
            width: 50upx;
            margin-left: 20upx;
            border-top: 1upx solid #eee;
            border-bottom: 1upx solid #eee;
            text-align: center;
        }
        .col2 {
            border-top: 1upx solid #eee;
            border-bottom: 1upx solid #eee;
            width: 650upx;
        }
    }
    .textarea {
        width: 100%;
        height: 170upx;
        position: relative;
        background: #fff;
        textarea {
            width: 100%;
            height: 100%;
            padding: 30upx 70upx;
            box-sizing: border-box;
        }
        .counter {
            width: fit-content;
            height: 24upx;
            line-height: 24upx;
            color: #9da3ae;
            font-size: 24upx;
            position: absolute;
            bottom: 22upx;
            right: 40upx;
        }
    }
</style>