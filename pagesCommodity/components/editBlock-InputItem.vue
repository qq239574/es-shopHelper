<template>
    <view class='editGood-block-selectItem '>
        <view class='grace-items'>
            <view class="grace-label">输入</view>
            <input :value='value' :placeholder="placeholder" :disabled='disabled' class='input'/> 
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
            disabled:{
                type:Boolean,
                default:true
            }
        },
        data() {
            return {
                dataName: 'lksdjfk'
            }
        },
        methods: {
            selectCell() {
                this.$emit('click', {
                    label: this.label,
                    value: this.value
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
            .input{

            }
        }
    }
</style>