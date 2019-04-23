<template>
    <view class='card--title' @click='clickBill'>
        <view class="data card--title-item">
            <view class="billId">{{bill.billId}}</view>
            <view class="billDate">{{bill.billDate}}</view>
        </view>
        <view class="tab card--title-item">
            <view class="billType commision" v-if='bill.billType!=="普通订单"'>{{bill.billType}}</view>
            <view class="billType common" v-else>普通订单</view>
        </view>
    </view>
</template>

<script>
    export default {
        props: {
            bill: {
                type: Object,
                default: {
                    billId: '',
                    billDate: '',
                    billType: '' ,//订单类型，分销订单，普通订单
                    billPrice: 0
                }
            }
        },
        methods: {
            clickBill(){
               this.$emit('click',{
                   type:'title',
                   detail:{
                       val:this.bill
                   }
               })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .card--title {
        width: 670upx;
        margin: auto;
        height: 100upx;
        border-bottom: 1upx solid #eee;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        .card--title-item {
            height: 100%;
        }
        .billId,
        .billDate {
            font-size: 24upx;
            font-weight: 400;
            line-height: 24upx;
        }
        .billId {
            color: #333;
            margin-top: 20upx;
        }
        .billDate {
            color: #9da3ae;
            margin-top: 14upx;
        }
        .billType {
            width: 94upx;
            height: 31upx;
            border-radius: 4upx;
            background: #5288f3;
            line-height: 31upx;
            text-align: center;
            color: #fff;
            margin: 34upx 0 0;
            font-size: 20upx;
            &.common {
                background: #9da3ae;
            }
        }
    }
</style>