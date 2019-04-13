<template>
    <view class='my-long-button' :class='tappingClass' @click='clickBuntton' @touchstart='clickStart' @touchend='cancelTap' @touchcancel='cancelTap'>
                <slot></slot>
            </view>
</template>

<script>
    export default {
        props: {
            disable: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                tapping: false
            }
        },
        computed: {
            tappingClass() {
                return this.disable ? "disable" : (this.tapping ? 'tapping' : '')
            }
        },
        methods: {
            clickBuntton() {
                !this.disable&&this.$emit('click', this.content)
            },
            clickStart() {
                this.tapping = true;
            },
            cancelTap() {
                this.tapping = false;
            }
        },
    }
</script>

<style lang="scss" scoped>
    .my-long-button {
        width: 680upx;
        height: 90upx;
        background: linear-gradient(90deg, #ff8245, #fb6638);
        border-radius: 45upx;
        line-height: 90upx;
        text-align: center;
        font-size: 26upx;
        font-weight: 600;
        color: #fff;
        margin: auto;
        letter-spacing: 4upx;
        &.tapping {
            color: #eee;
            background: #ec673e;
        }
        &.disable{
            background: #ccc;
            color:#fff!important;
        }
    }
</style>
