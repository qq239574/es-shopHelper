<template>
    <view class='toper-block' @click='clickItem'>
        <view class="icon">
            <image class='img' lazy-load :src='"/static/img/global/top"+(index+1)+".png"' v-if='index<3'></image>
            <view class="no img" v-else>{{index+1}}</view>
        </view>
        <view class="image">
            <image lazy-load :src='info.img'></image>
        </view>
        <view class="title">
            <view class="label van-multi-ellipsis--l2" v-if='pageid=="goods"'>
                {{info.label}}
            </view>
            <view class="label van-multi-ellipsis--l1" v-else>
                {{info.label}}
            </view>
        </view>
        <view class="num">
            {{formater(info.value,info.tiFixed)}}
        </view>
    </view>
</template>

<script>
import {number_format} from '../../components/my-components/formater.js'
    export default {
        props: {
            info: {
                type: Object,
                default: {
                    img: '',
                    label: '',
                    value: 0,
                    index: 0
                }
            },
            index: {
                type: Number,
                default: 0
            },
            pageid: {
                type: String,
                default: 'goods'
            }
        },
        methods: {
            formater(val,num){
                return number_format(val,num,'.',',')
            },
            clickItem(){
                this.$emit('click',this.info)
            }
        },
    }
</script>

<style lang="scss" scoped>
    .toper-block {
        width: 702upx;
        height: 126upx;
        background: #fff;
        margin: auto;
        display: flex;
        flex-wrap: nowrap;
        box-sizing: border-box;
        view {
            height: 100%;
            display: flex;
            box-sizing: border-box;
            overflow: hidden;
        }
        .icon {
            width: 83upx;
            .img {
                width: 32upx;
                height: 43upx;
                font-size: 20upx;
                line-height: 31upx;
                font-weight: 700;
                padding: auto 10upx;
                color: #333;
                margin: auto;
                justify-content: space-around;
            }
        }
        .image {
            width: 80upx;
            image {
                width: 100%;
                height: 80upx;
                border-radius: 10upx;
                margin: auto;
            }
            border-bottom: 1upx solid #eee;
        }
        .title {
            width: 335upx;
            .label {
                width: 100%;
                line-height: 36upx;
                font-size: 24upx;
                color: #333;
                padding: 0 10upx 0 20upx;
                margin: auto;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
            }
            .van-multi-ellipsis--l2 {
                -webkit-line-clamp: 2;
                line-clamp: 2;
                max-height: 72upx;
            }
            .van-multi-ellipsis--l1 {
                -webkit-line-clamp: 1;
                line-clamp: 1;
                max-height: 36upx;
            }
            border-bottom: 1upx solid #eee;
        }
        .num {
            width: 204upx;
            line-height: 126upx;
            font-size: 26upx;
            color: #fb6638;
            text-align: center;
            font-weight: 700;
            justify-content: space-around;
            border-bottom: 1upx solid #eee;
        }
    }
</style>