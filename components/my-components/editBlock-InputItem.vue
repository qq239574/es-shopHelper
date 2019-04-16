<template>
    <view class='editGood-block-selectItem grace-form'>
        <view class='grace-items' @click='selectCell'>
            <view class="grace-label">{{label}}</view>
            <input :value='value' :type='type' :placeholder="placeholder" :disabled='disabled' class='input' @input='inputVal' />
        </view>
    </view>
</template>

<script>
    export default {
        props: {
            label: {
                type: String,
                default: '标签'
            },
            value: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: '请选择'
            },
            disabled: {
                type: Boolean,
                default: false
            },
            type:{
                type:String,
                default:'text'
            }
        },
        data() {
            return {
                dataName: 'lksdjfk'
            }
        },
        methods: {
            inputVal(val) { 
                this.$emit('input', {
                    label: this.label,
                    value: val.detail.value,
                    disabled: this.disabled
                })
            },
            selectCell() {
                this.$emit('click', {
                    label: this.label,
                    value: this.value,
                    disabled: this.disabled
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .editGood-block-selectItem {
        width: 100%;
        background: #fff;
        .grace-items {
            width: 94.67%;
            margin: auto;
            padding: 2upx auto;
            box-sizing: border-box;
            height:100upx;
        }
    }
</style>