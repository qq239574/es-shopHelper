<template>
    <view class='card--temp' v-if='rights.status' @click='clickBill'>
        <view class='card--info__row'>
            <view class='card--info__row__tile'>商品总计</view>
            <view class='card--info__row__status'>{{rights.status}}</view>
        </view>
        <view class='card--info__row'>
            <view class='card--info__row__tile'>会员折扣</view>
            <view class='card--info__row__status'>{{rights.status}}</view>
        </view>
        <view class='card--info__row'>
            <view class='card--info__row__tile'>运费</view>
            <view class='card--info__row__status'>{{rights.status}}</view>
        </view>
        <view class='card--info__row'>
            <view class='card--info__row__tile' style='color:#fd6b3e;'>合计</view>
            <view class='card--info__row__status total'>{{rights.status}}</view>
        </view>
        <view class='card--info__row foot'>
            <view class='card--info__row__tile'>维权信息</view>
            <view class='card--info__row__status' style='color:#fd6b3e;'>{{rights.status}}</view>
        </view>
    </view>
</template>

<script>
    export default {
        props: {
            rights: {
                type: Object,
                default: () => ({
                    status: '退款退货',
                    addtion: []
                })
            }
        },
        methods: { 
            clickBill(){
                this.$emit('click',{
                    type:'rights',
                    detail:{
                        val:this.rights
                    }
                })
            },
            clickButton(val) {
                this.$emit('click',{
                    type:'button',
                    detail:{
                        val
                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .card--temp {
        width: 670upx;
        margin: auto;
        border-top: 1upx solid #eee;
        padding-bottom: 10upx;
        .card--info__row {
            width: 100%;
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-between;
            margin: 30upx auto 24upx;
            view {
                font-size: 26upx;
                color: #33373a;
                width: fit-content;
            }
            .card--info__row__tile {
                color: #333;
                font-weight: 700;
            }
            .card--info__row__status {
                color: #333;font-weight: 700;
                &.total{
                    font-size: 30upx;
                }
            }
        }
        .foot{
            width:670upx;
            margin:auto;
            border-top:1upx solid #eee;
            line-height: 85upx;
        }
    }
</style>