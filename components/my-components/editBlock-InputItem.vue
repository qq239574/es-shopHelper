<template>
    <view class='editGood-block-selectItem grace-form'>
        <view class='grace-items' @click='selectCell' :style='contentStyle'>
            <view class="grace-label" :style='labelStyle'>
                <slot name='icon'></slot>{{label}}</view>
            <input :value='value' :type='type' :placeholder="placeholder" :style='valueStyle' :disabled='disabled' class='input  van-ellipsis' :class='disabled?"disable":""' @input='inputVal' />
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
            type: {
                type: String,
                default: 'text'
            },
            contentStyle: {
                type: String,
                default: ''
            },
            labelStyle: {
                type: String,
                default: ''
            },
            valueStyle: {
                type: String,
                default: ''
            },
            other: {
                type: [Object, Number, String, Array, Boolean],
                default: ''
            }
        },
        methods: {
            inputVal(val) {
                this.$emit('input', {
                    label: this.label,
                    value: val.detail.value,
                    disabled: this.disabled,
                    other:this.other
                })
            },
            selectCell() {
                this.$emit('click', {
                    label: this.label,
                    value: this.value,
                    disabled: this.disabled,
                    other:this.other
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
            height: 100upx;
            .grace-label {
                width: fit-content;
                white-space: nowrap;
                font-weight: 600;
            }
            .disable {
                color: #9ea3ae;
            }
        }
    }
</style>