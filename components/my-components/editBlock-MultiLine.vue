<template>
    <view class='editGood-block-selectItem grace-form' >
        <view class="grace-items" @click='selectCell'>
            <view class="grace-label">{{label}}</view>
            <view class='address'>{{value}}</view>
            <text class="grace-icons icon-arrow-right" style='color:#5E5E5E;'></text>
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
            box-sizing: border-box; 
            .address {
				height: fit-content;
				width: 490upx;
				line-height: 38upx; // padding: 40upx 0 20upx;
                margin-left:60upx;
			}
        }
    }
</style>