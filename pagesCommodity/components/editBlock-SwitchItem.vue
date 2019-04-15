<template>
    <view class='editGood-block-selectItem '>
        <view class='grace-items'>
            <view class="grace-label">输入</view>
            <switch name="switch" class='switch' checked />
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
                default: '请选择'
            },
            checked: {
                type: Boolean,
                default: false
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
            .switch {
               margin:0;
               transform: scale(.7);
            }
        }
    }
</style>