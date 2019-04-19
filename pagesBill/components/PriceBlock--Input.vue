<template>
    <view class='price-input '>
        <view class="row row1">
            <view class="label">定价（元）</view>
            <input type="digit" placeholder='0' @input='inputPrice'>
        </view>
        <view class="row row2">
            <view class="label">运费（元）</view>
            <input type="digit" placeholder='0' @input='inputPay'>
        </view>
    </view>
</template>

<script>
    let cachePrice = '';
    let cachePay = '';
    export default {
        data() {
            return {}
        },
        props: {
            info: { //区分模块用的
                type: Object,
                default: {}
            }
        },
        methods: {
            inputPrice(val) {
                cachePrice = val.detail.value||0;
                this.$emit('input', {
                    value: {
                        price: cachePrice,
                        pay: cachePay
                    },
                    info: this.info
                })
            },
            inputPay(val) {
                cachePay = val.detail.value||0;
                this.$emit('input', {
                    value: {
                        price: cachePrice||0,
                        pay: cachePay
                    },
                    info: this.info
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .price-input {
        width: 670upx;
        margin: auto;
        .row {
            width: 100%;
            height: 96upx;
            line-height: 96upx;
            display: flex;
            justify-content: space-between;
            flex-wrap: nowrap;
            .label {
                font-size: 28upx;
                line-height: 96upx;
            }
            input {
                height: 70upx;
                width: 250upx;
                background: #fcfcfc;
                border: 1upx solid #eee;
                border-radius: 6upx;
                line-height: 70upx;
                font-size: 28upx;
                text-align: right;
                box-sizing: border-box;
                padding: 0 20upx;
                margin-top: 13upx;
                font-weight: 600;
            }
        }
        .row1 {
            border-bottom: 1upx solid #eee;
        }
    }
</style>