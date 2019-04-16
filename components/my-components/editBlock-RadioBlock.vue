<template>
    <view class='editGood-block-selectItem grace-form'>
        <radio-group @change="radioChange" class='group'>
            <view class='grace-items' v-for="(item, index) in items" :key="item.value" @click='clickItem(index)'>
                <view class='radio-box'>
                    <radio :value="item.value" :checked="index === current" color='#fb6638' />
                </view>
                <view class="grace-label">{{item.label}}</view>
                <view class="other" :style="'color:#fb6638;opacity:'+(index === current?'1':'0')">
                    {{item.value}}
                    <view style='display:inline;' v-if='item.value===""'>{{placeholder}}</view>
                    <text class="grace-icons icon-arrow-right" style='color:#5E5E5E;'></text>
                </view>
            </view>
        </radio-group>
    </view>
</template>

<script>
    export default {
        props: {
            placeholder: {
                type: String,
                default: '请选择'
            },
            items: {
                type: Array,
                default: [{
                    label: 'label1',
                    value: ''
                }, {
                    label: 'label2',
                    value: ''
                }, {
                    label: 'label3',
                    value: ''
                }, ]
            }
        },
        data() {
            return {
                current: 0
            }
        },
        methods: {
            clickItem(index) {
                this.current = index;
                this.$emit('change', this.items[index])
            },
            radioChange: function(evt) {
                for (let i = 0; i < this.items.length; i++) {
                    if (this.items[i].value === evt.target.value) {
                        this.current = i;
                        break;
                    }
                }
                this.$emit('change', this.items[this.current]);
            }
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
            padding: 2upx auto;
            box-sizing: border-box;
            height: 100upx;
            .address {
                height: fit-content;
                width: 490upx;
                line-height: 38upx; // padding: 40upx 0 20upx;
            }
        }
        .radio-box {
            margin-right: 20upx;
            radio {
                transform: scale(.7)
            }
        }
    }
</style>