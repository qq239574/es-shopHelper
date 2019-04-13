<template>
    <!--pages/demo/maskview.wxml-->
    <view class='my-popup'>
        <graceMaskView :show="show2" bgcolor="none" v-on:close="closeBanner2">
            <scroll-view class="grace-scroll-y " :class='show2?"show":""' scroll-y>
               <slot></slot>
            </scroll-view>
        </graceMaskView>
    </view>
</template>
<script>
    import graceMaskView from "./MyGraceMaskView";
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                show2: false
            }
        },
        watch:{
            show(){
                this.show2=this.show;
            }
        },
        methods: {
            // 第1个演示 开启与关闭
            showBanner: function() {
                this.show = true;
            },
            closeBanner: function() {
                this.show = false;
            },
            // 第2个演示 开启与关闭
            showBanner2: function() {
                this.show2 = true;
            },
            closeBanner2: function() {
                this.show2 = false;
                this.$emit('close');
            }
        },
        components: {
            graceMaskView
        }
    }
</script>
<style lang='scss'>
    .my-popup {
        .grace-scroll-y {
            width: 750upx;
            height: 100%;
            transition: all 1.5s;
        }
       
        .grace-items {
            height: 96upx;
            width:704upx;
            margin:auto;
            line-height: 96upx;
            border-bottom:1upx solid #eee;
            padding: 0 15upx;
        }
    }
</style>