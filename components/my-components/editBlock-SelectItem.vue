<template>
    <view class='editGood-block-selectItem grace-form' @click="selectCell">
        <view class='grace-items' :style='contentStyle'>
            <view class="grace-label van-ellipsis ">
                <slot name='icon'></slot>{{label}}
            </view>
            <view class="other " :style='"display:inline;"+valueStyle'>
                {{value}}
                <view style='display:inline;' v-if='value===""'>{{placeholder}}</view>
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
                default: ''
            },
            placeholder: {
                type: String,
                default: '请选择'
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
        background: #fff;
        display: flex;
        .grace-items {
            width: 710upx;
            margin: auto;
            padding: 2upx auto;
            box-sizing: border-box;
            height: 100upx;
            display: flex;
            flex-wrap: nowrap;
            overflow: hidden;
            .address {
                height: fit-content;
                width: 490upx;
                line-height: 38upx; // padding: 40upx 0 20upx;
            }
            .grace-label {
                white-space: nowrap;
                overflow: hidden;
                width: fit-content;
                max-width: 500upx;
            }
            .other {
                white-space: nowrap;
                overflow: hidden;
                width: fit-content;
            }
        }
    }
</style>