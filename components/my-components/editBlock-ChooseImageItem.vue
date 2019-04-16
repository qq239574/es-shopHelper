<template>
    <view class='selectItem '>
        <view class="grace-items swiper-imgs">
            <view class="grace-label" style='text-indent:1em;'>{{label}}</view>
            <view class="imgbox">
                <chooseImg @getImages='getImages' @startmove='startmove' :maxNum='maxNum' :button='button'></chooseImg>
                <view class='tips' v-if='tips'>{{tips}}</view>
            </view>
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
            tips: {
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
            getImages(list) {
                this.$emit('getImages', {
                    images:list,
                    label:this.label,
                    maxNum:this.maxNum,
                    button:this.button,
                    tips:this.tips
                })
            },
            startmove(bool){
                 this.$emit('startmove',bool)
            }
           
        },
    }
</script>

<style lang="scss" scoped>
    .selectItem {
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