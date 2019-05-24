<template>
    <view class='editGood-block-selectItem grace-form'>
        <radio-group class='group'>
            <view class='grace-items' v-for="(item, index) in items" :key="index" @click='clickItem(index)'>
                <view class="grace-label">{{item.label}}</view>
                <view class="other" :style="'color:#fb6638;opacity:'+(index === current?'1':'0;')+valueStyle">
                    <text class="subContent" :style="'color:#c2c6ce;'+fontStyle">{{item.subValue}}</text>{{item.value}}
                    <view style='display:inline;' v-if='item.value===""'>{{placeholder}}</view>
                </view><text class="grace-icons icon-arrow-right" style='color:#5E5E5E;' v-if='!hideRightArrow'></text>
                <view class='radio-box'>
                    <radio :value="item.value" :checked="index === current" color='#fb6638' />
                </view>
            </view>
        </radio-group>
    </view>
</template>

<script>
    export default {
        props: {
            defaultIndex: {
                type: Number,
                default: 0
            },
            hideRightArrow: {
                type: Boolean,
                default: false
            },
            valueStyle: {
                type: String,
                default: '',//www
            },
			fontStyle: {
			    type: String,
			    default: ''
			},
            placeholder: {
                type: String,
                default: '请选择'
            },
            items: {
                type: Array,
                default: [{
                    label: '',
                    value: '',
                    subValue: ''
                }]
            },
            other: {
                type: [Object, Number, String, Array, Boolean],
                default: ''
            }
        },
        watch: {
            defaultIndex() {
                this.current = this.defaultIndex;
            }
        },
        mounted() {
            this.current = this.defaultIndex;
        },
        data() {
            return {
                current: 0
            }
        },
        methods: {
            clickItem(index) {
                this.current = index;
                this.$emit('clickItem', this.items[index]);
            },
        },
    }
</script>

<style lang="scss" scoped>
    .editGood-block-selectItem {
        width: 100%;
        margin: 0 auto;
        background: #fff;
        display: flex;
        .grace-items {
            width: 710upx;
            margin: auto;
            padding: 2upx 0 0 20upx;
            box-sizing: border-box;
            height: 100upx;
            .address {
                height: fit-content;
                width: 490upx;
                line-height: 38upx; // padding: 40upx 0 20upx;
            }
        }
        .other {
            display: flex;
            justify-content: space-between;
        }
        .subContent {
            font-size: 24upx;
        }
        .radio-box { 
            radio {
                transform: scale(.7)
            }
        }
        .grace-label {
            font-weight: 600;
            width: fit-content;
            white-space: nowrap;
            overflow: hidden;
        }
    }
</style>