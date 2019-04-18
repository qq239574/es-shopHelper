<template>
    <div class='my-picker grace-mask-layer' v-if="GuideShow" @click.stop='closeGuide' >
        <view class="picker" @click.stop='stop' >
            <view class="title">已选择优惠券</view>
            <view class="items">
                <slot></slot>
                
            </view>
        </view>
    </div>
</template>

<script>
    export default { 
        props:{
            toggle:{
                type:Boolean,
                default:true
            }
        },
        data() {
            return {
                GuideShow: false
            }
        },
        watch:{
            toggle(){
                this.GuideShow=!this.GuideShow;
            }
        },
        methods: {
            stop(){
                console.log(111)
            },
            showLoading: function() {
                this.graceFullLoading = true;
                setTimeout(function() {
                    _self.graceFullLoading = false;
                }, 2000);
            },
            // 打开引导
            showGuide: function() {
                this.GuideShow = true;
            },
            // 关闭引导
            closeGuide: function() {
                this.GuideShow = false;
            },
        }
    }
</script>

<style lang="scss" scoped>
    .grace-mask-layer {
        width: 100%;
        top:0;
        bottom: 100upx;
        left:0;
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        z-index: 99998;
        left: 0;
        top: 0;
        .picker {
            width: 100%;
            height: 50%;
            position: absolute;
            background: #fff;
            overflow: scroll;
            bottom: 0;
            left: 0;
            border-top-left-radius: 20upx;
            border-top-right-radius: 20upx;
            box-sizing: border-box;
            .title {
                height: 110upx;
                text-align: center;
                line-height: 110upx;
                font-size: 30upx;
                color: #333;
                font-weight: 600;
                width: 710upx;
                margin: auto;
                border-bottom: 1upx solid #eee;
            }
            .items {
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                padding: 110upx 20upx 0;
            }
        }
    }
</style>