<template>
    <view class='card--temp' v-if='rights.subStatus' @click='clickBill'>
        <view class='card--info__row'>
            <view class='card--info__row__tile'>维权状态</view>
            <view class='card--info__row__status'>{{rights.status}}</view>
        </view>
        <view class="button-group">
            <myButton :badge='rights.addition' @click='clickButton("维权备注")'>备注</myButton>
            <myButton type='primary' @click='clickButton("维权中")'>维权中</myButton>
        </view>
    </view>
</template>

<script>
    import myButton from '../../../components/my-components/RoundButton';
    export default {
        props: {
            rights: {
                type: Object,
                default: () => ({
                    status: '退款退货',
                    addtion: [],
                    subStatus: 0 //订单子状态，1：维权
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
        .button-group {
            display: flex;
            flex-wrap: nowrap;
            justify-content: flex-end;
            height: 91upx;
            width: 100%;
            my-button {
                margin: 0 0 0 20upx;
            }
        }
    }
</style>