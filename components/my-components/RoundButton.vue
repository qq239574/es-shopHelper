<template>
    <view class='my-round-button cell-font-gray' :class='tappingClass' @click.stop='clickBuntton' @touchstart='clickStart' @touchend='cancelTap' @touchcancel='cancelTap'>
        <slot></slot><text class="grace-badge" v-if='badge!==0'>{{badge}}</text>
    </view>
</template>

<script>
    export default {
        props: {
            badge: {
                type: Number,
                default: 0
            },
            type: {
                type: String,
                default: 'common'
            }
        },
        data() {
            return {
                tapping: false
            }
        },
        computed: {
            tappingClass() {
                return (this.tapping ? 'tapping ' : '') + this.type
            }
        },
        methods: {
            clickBuntton() {
                this.$emit('click',{
                    type:this.type,
                    badge:this.badge
                })
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
    .my-round-button {
        width: fit-content;
        min-width: 165upx;
        box-sizing: border-box;
        height: 60upx;
        border-radius: 30upx;
        line-height: 60upx;
        text-align: center;
        font-size: 26upx;
        font-weight: 500;
        letter-spacing: 4upx;
        border: 1upx solid #aaafb5;
        padding: 0 20upx;
        position: relative;
        &.common {
            background: #fff;
        }
        &.common.tapping {
            background: #eee;
        }
        &.primary {
            color: #fff;
            border: none;
            background: #fb6638;
        }
        &.primary.tapping {
            border: none;
            color: #fdfdfd;
            background: #ec673e;
        }
        &.disable{
            background: #9da3ae;
            color:#fff;
            border: none;
        }
        .grace-badge {
            position: absolute;
            background: #fb6638;
            font-size: 20upx;
            text-align: center;
            line-height: 32upx;
            min-width: 32upx;
            height: 32upx;
            right: -16upx;
            top: -16upx;
            padding: 0 0 0 3upx;
            color: #fff;
        }
    }
</style>
