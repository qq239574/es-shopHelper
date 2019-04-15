<template>
    <view class="grace-items swiper-imgs">
        <view class="grace-label" style='text-indent:1em;'>轮播图</view>
        <view class="imgbox">
            <chooseImg @getImages='getImages' :maxNum='10'></chooseImg>
            <view class='tips'>建议大小：750*750，长按图片可拖拽调整顺序</view>
        </view>
    </view>
</template>

<script>
    import chooseImg from './editGood-ChooseImg'
    export default {
        components: {
            chooseImg
        },
        props: {
            label: {
                type: String,
                default: '标签'
            },
            value: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: '请选择'
            },
            disabled: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                dataName: 'lksdjfk'
            }
        },
        methods: {
            selectCell() {
                this.$emit('click', {
                    label: this.label,
                    value: this.value
                })
            },
            getImages(){}
        },
    }
</script>

<style lang="scss" scoped>
    .editGood-block-selectItem {
        width: 100%;
        .grace-items {
            width: 710upx;
            margin: auto;
            padding: 2upx auto;
            width: 710upx;
            margin: auto;
            padding: 2upx auto;
            .address {
                height: fit-content;
                width: 490upx;
                line-height: 38upx; // padding: 40upx 0 20upx;
            }
            .imgbox {
                width: 490upx;
                padding-bottom: 10upx;
                .tips {
                    width: 100%;
                    font-size: 20upx;
                    text-align: left;
                    color: #9ea3ae;
                    line-height: 60upx;
                }
            }
            &.swiper-imgs {
                min-height: 200upx;
                padding: 0 0 10upx;
            }
        }
    }
</style>