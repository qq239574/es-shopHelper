<template>
    <view class='editGood-block-selectItem '>
        <view class='grace-items'>
            <view class="grace-label">规格类型</view>
            <view @click.stop="selectCell" class="other">
                {{value}}
                <text class="grace-icons icon-arrow-right" style='color:#5E5E5E;'></text>
            </view>
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
            placeholder: {
                type: String,
                default: '请选择'
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
            .address {
                height: fit-content;
                width: 490upx;
                line-height: 38upx; // padding: 40upx 0 20upx;
            }
        }
    }
</style>