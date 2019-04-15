<template>
    <view class='bill-addition page'>
        <textarea class='textarea' :value='val' placeholder-style="color:#d2d5db" :maxlength='50' placeholder="请填写备注" @input='getAddition' />
        <view class='counter'>{{length}}/50</view>
        <longButton :disable='disable' @click='sure'>确定</longButton>
    </view>
</template>

<script>
    import longButton from '../../components/my-components/LongButton.vue'
    export default {
        components: {
            longButton
        },
        data() {
            return {
                val: '',
                length: 0,
                disable: true
            }
        },
        methods: {
            sure() {
                uni.navigateBack();
            },
            getAddition(val) {
                this.length = val.detail.value.length;
                this.disable = !val.detail.value.length;
            }
        },
    }
</script>

<style lang="scss" scoped>
    .bill-addition {
        position: relative;
        .counter {
            width: fit-content;
            height: 24upx;
            line-height: 24upx;
            color: #9da3ae;
            font-size: 24upx;
            position: absolute;
            top: 158upx;
            right: 40upx;
        }
        .textarea {
            width: 710upx;
            background: #fff;
            height: 180upx;
            margin: 20upx auto 30upx;
            border-radius: 6upx;
            box-sizing: border-box;
            padding: 20upx;
            font-size: 26upx;
            line-height: 36upx;
        }
    }
</style>