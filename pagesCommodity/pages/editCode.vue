<template>
    <view class='bill-subtitle page'>
        <textarea class='textarea' :value='val' placeholder-style="color:#d2d5db" :maxlength='40' placeholder="请填写商品编码" @input='getAddition' />
        <view class='counter'>{{length}}/40</view>
        <longButton :disable='disable' @click='sure'>确定</longButton>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
    import longButton from '../../components/my-components/LongButton.vue'
    let DataFrom = {};
    let cacheVal = '';
    let cacheFrom = '';
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
                DataFrom.needChange.value = cacheVal;
                this.Cacher.setData('editCode', DataFrom)
                uni.navigateBack();
            },
            getAddition(val) {
                this.length = val.detail.value.length;
                this.disable = !val.detail.value.length;
                cacheVal = val.detail.value;
            }
        },
        onLoad(option) {
            DataFrom = this.Cacher.getData(option.from);
            cacheVal = DataFrom.needChange.value;
            this.val = cacheVal;
            this.disable = !this.val;
            this.Cacher.setData('editCode', DataFrom);
            this.length=cacheVal.length;
        }
    }
</script>

<style lang="scss" scoped>
    .bill-subtitle {
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