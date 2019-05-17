<template>
    <view class='card--temp' v-if='rights.subStatus==1' @click='clickBill'>
        <view class="button-group">
            <myButton :badge='rights.addition' @click='clickButton("维权备注")' v-if='Jurisdiction.order_manage'>备注</myButton>
            <myButton type='primary' @click='clickButton("确认付款")' v-if='rights.status=="0"&&Jurisdiction.order_manage'>确认付款</myButton>
            <myButton :type='canSendGood' @click='clickButton("确认发货")' v-if='rights.status=="1"&&Jurisdiction.order_send'>确认发货</myButton>
            <myButton type='primary' @click='clickButton("确认收货")' v-if='rights.status=="2"&&Jurisdiction.order_manage'>确认收货</myButton>
            <myButton type='primary' @click='clickButton("维权中")' v-if='rights.subStatus==1'>维权中</myButton>
        </view>
    </view>
</template>

<script>
    import myButton from '../../../components/my-components/RoundButton';
    export default {
        props: {
            Jurisdiction:{
                type:Object,
                default:{},
                required:true
            },
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
        computed: {
            canSendGood() { //判断可否发货
                if (this.rights.groups_success == 1 || this.rights.groups_success === undefined) {
                    return !!this.rights.send_able ? "primary" : "disable"
                } else {
                    return "disable";
                }
            },
        },
        methods: {
            clickBill() {
                this.$emit('click', {
                    type: 'rights',
                    detail: {
                        val: this.rights
                    }
                })
            },
            clickButton(val) {
                this.$emit('click', {
                    type: 'button',
                    detail: {
                        val,
                        righting: false
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
                margin: 15upx 0 0 20upx;
            }
        }
    }
</style>