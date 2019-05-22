<template>
    <view class='poster-share' @click.stop='stop' @touchmove.stop='stop'>
        <view class="grace-shade grace-shade-black" v-if="show2">
            <view class="box">
                <view class="close-btn grace-icons icon-close3" @tap.stop="closeShade2"></view>
                <view style='width:200px;height:200px;' class='img-code'>
                    <slot></slot>
                </view>
            </view>
            <view class='button'>
                <view  class="img" v-if='info.type=="mini"'>
                    <button open-type='share'  @click.stop='share("share")' ></button>
                    <image src='/static/img/global/product_share_wechat.svg'></image>
                    <view>分享好友</view>
                </view>
                <view open-type='share' class="img" @click.stop='share("share")' v-else>
                    <image src='/static/img/global/product_share_wechat.svg'></image>
                    <view>分享好友</view>
                </view>
                <view class="img" @click.stop='share("save")'>
                    <image src='/static/img/global/product_share_download.png'></image>
                    <view>保存到相册</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                show2: false
            }
        },
        props: {
            toggle: {
                type: Boolean,
                default: false
            },
            info: {
                type: Object,
                default: {
                    img: '/static/img/temp/poster.jpg',
                    type: 'mini', //mini:小程序，h5: H5
                }
            }
        },
        watch: {
            toggle() {
                this.show2 = !this.show2;
            }
        },
        methods: {
            stop() {},
            closeShade2: function() {
                this.show2 = false;
            },
            share(val) {
                this.$emit('click', {
                    type: val,
                    info: this.info
                })
                this.closeShade2();
            }
        }
    }
</script>

<style lang="scss" scoped>
    // @import "../../../graceUI/animate.css";
    .poster-share {
        box-sizing: border-box;
        .button {
            position: absolute;
            width: 524upx;
            height: 150upx;
            bottom: 120upx;
            left: 0;
            right: 0;
            margin: auto;
            display: flex;
            .img {
                display: block;
                width: 50%;
                height: 150upx;
                position: relative;
                display: flex;
                margin: 0;
                flex-wrap: wrap;
                background: rgba(0, 0, 0, 0);
                justify-content: space-around;
                button{
                    position: absolute;
                    width:100%;
                    height:100%;
                    top:0;
                    left:0;
                    opacity: 0;
                }
                image {
                    width: 100upx;
                    height: 100upx;
                    border-radius: 50%;
                }
                view {
                    width: 100%;
                    text-align: center;
                    color: #fff;
                    font-size: 26upx;
                }
            }
        }
        .close-btn {
            position: absolute;
            background: rgba(0, 0, 0, .5);
            width: 140upx;
            height: 140upx;
            top: -70upx;
            right: -70upx;
            border-radius: 50%;
            color: #fff;
            box-sizing: border-box;
            padding: 71upx 50upx 0 28upx;
        }
        .box {
            overflow: hidden;
            width: 524upx;
            height: 524upx;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            background: #fff;
            .img-code {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                background: #fff;
            }
        }
        .poster {
            width: 524upx;
            height: 838upx;
        }
    }
</style>