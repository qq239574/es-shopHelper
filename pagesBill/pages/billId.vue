<template>
    <view class='bill-id page'>
        <input class='textarea' :value='val' placeholder-style="color:#d2d5db" :maxlength='-1' placeholder="请填写物流单号" @input='getId' />
        <longButton :disable='disable' @click='sure'>确定</longButton>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
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
            getId(val) { 
                this.disable = !val.detail.value.length;
            }
        },
    }
</script>

<style lang="scss" scoped>
    .bill-id {
        position: relative;
        .textarea {
            width: 710upx;
            background: #fff;
            height: 80upx;
            margin: 20upx auto 30upx;
            border-radius: 6upx;
            box-sizing: border-box;
            padding:0 20upx;
            font-size: 26upx;
            line-height: 80upx;
        }
    }
</style>