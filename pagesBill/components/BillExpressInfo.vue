<template>
    <view class='card--temp' @click='clickBill'>
        <block v-if='rights.sendTime'>
            <view class='card--info__row'>
                <view class='card--info__row__tile'>发货时间</view>
                <view class='card--info__row__status'>{{rights.sendTime}}</view>
            </view>
            <view class='card--info__row'>
                <view class='card--info__row__tile'>物流公司</view>
                <view class='card--info__row__status'>{{rights.sendComp}}</view>
            </view>
            <view class='card--info__row'>
                <view class='card--info__row__tile'>快递单号</view>
                <view class='card--info__row__status'>{{rights.sendId}} <view class='grace-boxes-img grace-iconfont icon-share' @click='copy(rights.sendId)'></view></view>
            </view>
        </block>
        <view class='card--info__row' v-else>
            <view class='card--info__row__tile'>发货信息</view>
            <view class='card--info__row__status primary'>{{rights.sendStatus}}</view>
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
                    sendTime: '', //发货时间
                    sendComp: '', //物流公司
                    sendId: '', //快递单号
                    sendStatus: '' //发货信息
                })
            }
        },
        components: {
            myButton
        },
        methods: {
             copy(val) {
                uni.setClipboardData({
                    data: val,
                    success: function() {
                        this.Toast('复制成功')
                    }
                });
            },
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
            margin: 10upx auto 0;
            view {
                font-size: 24upx;
                color: #33373a;
                width: fit-content;
            }
            .card--info__row__tile {
                color: #6e7685;
            }
            .card--info__row__status {
                color: #6e7685;
                display: flex;
                flex-wrap: nowrap;
                .icon-share{
                    display: inline-block; 
                    margin:0 10upx;
                }
            }
            .primary {
                background: #fd6b3e;
                color: #fff;
                line-height: 34upx;
                padding: 0 8upx;
                margin: auto 0;
                height: 34upx;
                font-size: 20upx;
                text-align: center;
                border-radius: 6upx;
            }
        }
    }
</style>