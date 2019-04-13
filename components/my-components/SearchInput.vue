<template>
    <view class='my-search-input'>
        <view class="grace-items">
            <view class="grace-boxes-img grace-iconfont icon-search"></view>
            <input type="text" class="input" name="name" :value='val' placeholder="手机号/微信昵称/姓名" @input='getInput' @change='getInput' />
            <view class="grace-boxes-img grace-iconfont icon-close" style='margin:0;' @click='getInput("clear")' v-show='showClear'></view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                val: ''
            }
        },
        computed:{
            showClear(){
                return this.val!=='';
            }
        },
        methods: {
            getInput(val) {
                if (val == 'clear') {
                    this.val = '';
                    this.$emit('clear')
                } else {
                    this.val = val.detail.value;
                    this.$emit(val.type, val.detail)
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .my-search-input {
        background: #fff;
        display: flex;
        justify-content: space-around;
        width: 100%;
        height: fit-content;
        .grace-items {
            display: flex;
            flex-wrap: nowrap;
            justify-content: start;
            background: #f5f7fa;
            width: 710upx;
            height: 68upx;
            border-radius: 34upx;
            .grace-boxes-img {
                width: 24upx;
                height: 100%;
                font-size: 24upx;
                color: #999;
                line-height: 72upx;
                margin: 0 0 0 47upx;
            }
            .icon-close {
                width: 50upx;
            }
            .input {
                width: 550upx;
                height: 100%;
                line-height: 66upx;
                padding: 0 10upx;
                color: #999;
                font-size: 24upx;
            }
        }
    }
</style>