<template>
    <view class='my-search-input' :style='bgStyle' @click='clickSearch'>
        <view class="grace-items" :style='inputStyle'>
            <view class="grace-boxes-img grace-iconfont icon-search" v-if='!noSearch'></view>
            <input type="text" class="input" :class='noSearch?"noSearch":""' name="name" :value='val' :disabled='disabled' :placeholder="placeholder" @input='getInput' @change='getInput' />
            <view class="grace-boxes-img grace-iconfont icon-close" style='margin:0;' @click='getInput("clear")' v-show='showClear&&!disabled'></view>
        </view>
    </view>
</template>

<script>
    export default {
        props: {
            placeholder: {
                type: String,
                default: '手机号/微信昵称/姓名'
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
            value: {
                type: String,
                default: ''
            },
            noSearch: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            value() {
                this.val = this.value;
            }
        },
        data() {
            return {
                val: ''
            }
        },
        mounted() {
            this.val = this.value;
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
                &.noSearch{
                    width:680upx;
                }
            }
        }
    }
</style>