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
            other: {
                type: [Object, Number, String, Array, Boolean],
                default: ''
            }
        },
        methods: {
            selectCell() {
                this.$emit('click', {
                    label: this.label,
                    value: this.value,
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
            padding: 0 auto;
            box-sizing: border-box; 
            display: flex;
            justify-content: space-between;
            flex-wrap: nowrap;
            position: relative;
            .address {
				height: 100%;
				width: fit-content;
				line-height: 38upx; // padding: 40upx 0 20upx; 
                margin:auto 40upx auto 60upx;
			}
            .grace-label{
                font-weight:600;
            }
            .grace-icons{
                position: absolute;
                right:0;
                margin:auto;
            }
        }
    }
</style>