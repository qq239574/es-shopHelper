<template>
    <view class='my-search-input' @click='clickSearch'>
        <view class="grace-items">
            <view class="grace-boxes-img grace-iconfont icon-search"></view>
            <input type="text" class="input" name="name" :value='val' :disabled='disabled' :placeholder="placeholder" @input='getInput' @change='getInput' />
            <view class="grace-boxes-img grace-iconfont icon-close" style='margin:0;' @click='getInput("clear")' v-show='showClear'></view>
        </view>
        <view class="button" @click='click'>搜索</view>
    </view>
</template>

<script>
    export default {
        props: {
            placeholder: {
                type: String,
                default: '搜索店铺'
            },
            bgStyle: {
                type: String,
                default: ''
            },
            inputStyle: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            value:{
                type:String,
                default:''
            }
        },
        watch:{
            value(){
                this.val=this.value;
            }
        },
        mounted(){
             this.val=this.value;
        },
        data() {
            return {
                val: ''
            }
        },
        computed: {
            showClear() {
                return this.val !== '';
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
            },
            clickSearch() {
                this.$emit('click', this.val)
            },
            click() {
                this.$emit('search', this.val)
            }
        },
    }
</script>

<style lang="scss" scoped>
    .my-search-input {
        display: flex;
        flex-wrap: nowrap;
        width: 100%;
        height: fit-content;
        .button {
            height: 100%;
            line-height: 68upx;
            font-size: 26upx;
            color: #6e7685;
        }
        .grace-items {
            display: flex;
            flex-wrap: nowrap;
            justify-content: start;
            background: #f5f7fa;
            width: 600upx;
            height: 68upx;
            border-radius: 34upx;
            margin: 0 20upx;
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
                width: 440upx;
                height: 100%;
                line-height: 66upx;
                padding: 0 10upx;
                color: #999;
                font-size: 24upx;
            }
        }
    }
</style>