<template>
    <view class='settotle-freight page'>
        <view class="input">
            <view class="label">金额(元)</view>
            <input type="digit" value="" @input='getVal'>
        </view>
        <longButton @click='sure'>确定</longButton>
    </view>
</template>

<script>
    import longButton from '../../components/my-components/LongButton'
    let cacheVal = '';
    let DataFrom = {}; 
    export default {
        components: {
            longButton
        },
        methods: {
            getVal(val) {
                cacheVal = val.detail.value; 
            },
            sure() {
                DataFrom.needChange.value = cacheVal;
                DataFrom = this.Cacher.setData('setTotalFreight', DataFrom);
                uni.navigateBack();
            }
        },
        onLoad(option) {
            DataFrom = this.Cacher.getData(option.from)||{}; 
            console.log('heheh',DataFrom)
        }
    }
</script>

<style lang="scss" scoped>
    .settotle-freight {
        .input {
            height: 100upx;
            margin: 20upx auto 100upx;
            background: #fff;
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-between;
        }
        .label {
            width: fit-content;
            line-height: 100upx;
            white-space: nowrap;
            color: #9da3ae;
            font-size: 26upx;
            padding: 0 20upx;
        }
        input {
            height: 100%;
            width: 100%;
            text-align: right;
            padding: 0 20upx;
        }
    }
</style>