<template>
    <view class="editgood-chooseimg grace-form">
        <movable-area class='move-area' style='width:100%;height:100%;' ref='ref'>
            <view class="imglist">
                <view class="items item" :style="endIndex==index?'border:1px dashed #ccc;':''" v-for="(item, index) in imgLists" :key="index" :id="item.index" :data-index='index' @longpress='_longtap' @touchstart='touchstart' @touchend='touchend' @touchmove='touchmove'>
                    <image mode='aspectFill' class='items--img' :src="item" :data-imgurl="item" @tap="showImgs"></image>
                    <view class="grace-boxes-img grace-iconfont icon-close" @click='removeImg(index)'></view>
                    <view class="imgTitle" v-if='imgTitle'>{{imgTitle}}</view>
                </view>
                <view class="add-btn" @tap="addImg" v-if="canAdd">
                    <view class='button-content'>添加</view>
                    <view class='button-content'>{{button}}</view>
                    <view class='button-content'>({{imgLists.length+'/'+maxNum}})</view>
                </view>
            </view>
            <movable-view :x="x" :y="y" direction="all" :damping="5000" :friction="1" :disabled="disabled">
                <view class='item-move' v-if='!hidden&&sortable'>
                </view>
            </movable-view>
        </movable-area>
    </view>
</template>
<script>
    let startX = 0,
        startY = 0,
        startPX = 0,
        startPY = 0;
    export default {
        data() {
            return {
                beginIndex: -1,
                endIndex: -1,
                imgLists: [],
                canAdd: true,
                hidden: true,
                flag: false,
                x: 0,
                y: 10,
                disabled: true,
                elements: [],
                maxRowNum: 0,
                maxColNum: 0,
            }
        },
        props: {
            sortable: {
                type: Boolean,
                default: true
            },
            imgTitle: {
                type: String,
                default: ''
            },
            maxNum: {
                type: Number,
                default: 1
            },
            button: {
                type: String,
                default: '照片'
            }
        },
        methods: {
            //长按
            _longtap(e) {
                this.hidden = false;
                this.flag = true;
                this.maxRowNum = Math.ceil(this.imgLists.length / 3);
                this.maxColNum = Math.min(this.imgLists.length, 3);
                this.$emit('startmove', true)
            },
            //触摸开始
            touchstart(e) {
                this.beginIndex = e.currentTarget.dataset.index;
                this.endIndex = this.beginIndex;
                startX = this.beginIndex % 3 * 81;
                startY = Math.floor(this.beginIndex / 3) * 81 + 10;
                this.x = startX;
                this.y = startY;
                startPX = e.changedTouches[0].pageX;
                startPY = e.changedTouches[0].pageY;
            },
            //触摸结束
            touchend(e) {
                this.$emit('startmove', false);
                if (!this.flag) {
                    return;
                }
                if (this.sortable && this.endIndex != this.beginIndex && this.endIndex >= 0 && this.beginIndex >= 0) {
                    let data = this.imgLists;
                    const endIndex = this.endIndex;
                    const beginIndex = this.beginIndex;
                    let tmp = data[beginIndex];
                    data[beginIndex] = data[endIndex];
                    data[endIndex] = tmp;
                    this.imgLists = data;
                    this.$emit('getImages', this.imgLists)
                }
                this.endIndex = -1;
                this.hidden = true;
                this.flag = false;
            },
            //滑动
            touchmove(e) {
                if (this.flag) {
                    const x = e.touches[0].pageX;
                    const y = e.touches[0].pageY;
                    const absX = x - startPX;
                    const absY = y - startPY;
                    this.x = startX + absX;
                    this.y = startY + absY;
                    let rowno = Math.min(Math.floor((this.y + 40) / 80), this.maxRowNum - 1);
                    let colno = Math.min(Math.floor((this.x + 40) / 80), this.maxColNum - 1);
                    this.endIndex = rowno * 3 + colno;
                }
            },
            addImg() {
                var num = this.maxNum - this.imgLists.length;
                let that = this;
                if (num < 1) {
                    return false;
                }
                uni.showLoading({
                    title: ""
                });
                uni.chooseImage({
                    count: num,
                    sizeType: ['compressed'],
                    success: function(res) {
                        that.imgLists = that.imgLists.concat(res.tempFilePaths);
                        if (that.imgLists.length >= that.maxNum) {
                            that.canAdd = false;
                        }
                        uni.hideLoading();
                        that.$emit('getImages', that.imgLists)
                    },
                    fail: function() {
                        uni.hideLoading();
                    }
                });
            },
            removeImg: function(index) {
                this.imgLists.splice(index, 1);
                this.imgLists = this.imgLists;
                if (this.imgLists.length < this.maxNum) {
                    this.canAdd = true;
                }
                this.$emit('getImages', this.imgLists)
            },
            showImgs: function(e) {
                var currentImg = e.currentTarget.dataset.imgurl;
                let that = this;
                uni.previewImage({
                    urls: that.imgLists,
                    current: currentImg
                })
            }
        }
    }
</script>
<style lang='scss'>
    .editgood-chooseimg {
        width: 100%;
        background: #fff;
        .imglist {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            .items {
                box-sizing: border-box;
                margin: 20upx 20upx 0 0;
                width: 143upx;
                height: 143upx;
                position: relative;
                .items--img {
                    width: 100%;
                    height: 100%;
                }
                .icon-close {
                    font-size: 36upx;
                    width: 36upx;
                    height: 36upx;
                    position: absolute;
                    top: -18upx;
                    right: -18upx;
                    opacity: .5;
                    line-height: 36upx;
                }
                .imgTitle {
                    height: 50upx;
                    width: 100%;
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, .5);
                    color: #fff;
                    text-align: center;
                    line-height: 50upx;
                    font-size: 21upx;
                }
            }
            .items {
                background: rgba(0, 0, 0, .3);
            }
        }
        .add-btn {
            margin: 20upx 20upx 0 0;
            background: #fff;
            border: 1upx dashed #9ea3ae;
            width: 143upx;
            height: 143upx;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            .button-content {
                white-space: pre-wrap;
                text-align: center;
                font-size: 22upx!important;
                color: #9ea3ae;
                margin: 0 auto;
                line-height: 28upx;
                height: 28upx;
                width: 100%;
                &:first-child {
                    margin-top: 20upx;
                }
            }
        }
        .curItems {
            border: 2upx dashed #ccc;
        }
        .item-move {
            display: inline-block;
            width: 143rpx;
            height: 143rpx;
            border: 2px dashed #fb6638;
        }
    }
</style>