<template>
    <view class='editGood-block-selectItem grace-form'>
        <view class='grace-items'>
            <view class="grace-label">{{label}}</view>
            <switch name="switch" class='switch' :checked='checked' @change='change'/>
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
            checked: {
                type: Boolean,
                default: false
            },
            other: {
                type: [Object, Number, String, Array, Boolean],
                default: ''
            }
        }, 
        methods: {
            change(val) {
                this.$emit('change', {
                    label: this.label,
                    checked: val.detail.value,
                    value:this.value,
                    other:this.other
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .editGood-block-selectItem {
        width: 100%;
        .grace-items {
            width: 710upx;
            margin: auto;
            padding: 2upx auto;
            box-sizing: border-box;
            height:100upx;
            .switch {
               margin:0;
               transform: scale(.7);
            }
             .grace-label{
                font-weight:600;
                width:fit-content;
            }
        }
    }
</style>