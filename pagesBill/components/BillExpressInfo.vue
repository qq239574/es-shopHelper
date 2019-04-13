<template>
    <view class='card--temp' v-if='rights.status' @click='clickBill'>
        <view class='card--info__row'>
            <view class='card--info__row__tile'>发货时间</view>
            <view class='card--info__row__status'>{{rights.status}}</view>
        </view>
        <view class='card--info__row'>
            <view class='card--info__row__tile'>物流公司</view>
            <view class='card--info__row__status'>{{rights.status}}</view>
        </view>
        <view class='card--info__row'>
            <view class='card--info__row__tile'>快递单号</view>
            <view class='card--info__row__status'>{{rights.status}}</view>
        </view>
        <view class='card--info__row'>
            <view class='card--info__row__tile'>发货信息</view>
            <view class='card--info__row__status'>{{rights.status}}</view>
        </view>
    </view>
</template>

<script>
    import myButton from '../../components/my-components/RoundButton';
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
        components: {
            myButton
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
                font-size: 24upx;
                color: #33373a;
                width: fit-content;
            }
            .card--info__row__tile {
                color: #6e7685;
            }
            .card--info__row__status {
                color: #fd6b3e;
            }
        }
    }
</style>