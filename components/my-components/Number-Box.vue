<template name="graceNumberBox">
    <view class="grace-number-box">
        <view class="doBtn" @tap="reduce">
            <image lazy-laod src='/static/img/global/minus.svg'></image>
        </view>
        <input class='number' type="number" style='background:#fff;' :value="inputNumber" :disabled="disabled" @blur="blur"></input>
        <view class="doBtn primary" @tap="add">
            <image lazy-laod src='/static/img/global/add.svg'></image>
        </view>
    </view>
</template>
<script>
    export default {
        name: "graceNumberBox",
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            value: {
                type: Number,
                default: 0
            },
            index: {
                type: Number,
                default: 0
            },
            maxNum: {
                type: Number,
                default: 20
            },
            minNum: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                inputNumber: this.value
            }
        },
        watch: {
            value(val) {
                this.inputNumber = val;
            },
            inputNumber(val) {
                if (val > this.maxNum) {
                    val = this.maxNum;
                    this.inputNumber = val;
                }
                if (val < this.minNum) {
                    val = this.minNum;
                    this.inputNumber = val;
                }
                this.$emit('change', [val, this.index]);
            }
        },
        methods: {
            add: function() {
                var newVal = this.inputNumber + 1;
                this.inputNumber = Number(newVal);
            },
            reduce: function() {
                var newVal = this.inputNumber - 1;
                this.inputNumber = newVal;
            },
            blur: function(e) {
                this.inputNumber = Number(e.detail.value);
            }
        }
    }
</script>
<style lang='scss'>
    .grace-number-box {
        width: 140upx;
        height: 65upx;
        display: flex!important;
        overflow: hidden;
        flex-wrap: nowrap;
        .number {
            height: 100%!important;
            padding: 0!important;
            width: 53upx!important;
        }
    }
    .grace-number-box .doBtn {
        width: 42upx;
        height: 42upx;
        border-radius: 50%;
        border: 1upx solid #9fa5b0;
        box-sizing: border-box;
        margin: auto;
        position: relative; 
        image {
            width: 30upx;
            height: 30upx;
            position: absolute;
            top:5upx;
            left:5upx; 
        }
        &.primary {
            background: #fb6638;
            border: 1upx solid #fb6638;
        }
    }
    .grace-number-box input {
        display: block;
        width: 90upx !important;
        height: 35upx !important;
        line-height: 35upx !important;
        color: #333;
        padding: 15upx 0 !important;
        background: #F3F4F5;
        text-align: center !important;
    }
</style>