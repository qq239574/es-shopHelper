<template>
    <view class="editgood-chooseimg">
        <view class="imglist">
            <view class="items" v-for="(item, index) in imgLists" :key="index">
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
    </view>
</template>
<script>
    export default {
        data() {
            return {
                imgLists: [],
                canAdd: true
            }
        },
        props: {
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
                        this.$emit('getImages', this.imgLists)
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
    }
</style>