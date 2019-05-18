<template>
    <view class='bill-block1 block'>
        <cellBlock>
            <view class="label bill__item" slot='pre'>订单编号：</view>
            <view class="body bill__item copy-item" slot='mid'>{{info.billId}}
                <image lazy-load src='/static/img/global/copy.png' class='copy-icon' @click='copy(info.billId)'></image>
            </view>
        </cellBlock>
        <cellBlock>
            <view class="label bill__item" slot='pre'>订单状态：</view>
            <view class="body bill__item" slot='mid'>{{info.billStatusText}}</view>
        </cellBlock>
        <cellBlock>
            <view class="label bill__item" slot='pre'>订单类型：</view>
            <view class="body bill__item" slot='mid'>{{info.billTypeText}}</view>
        </cellBlock>
        <cellBlock>
            <!-- //订单来源 0: 公众号 1: 小程序 2: wap/h5 3: app 4 :pc -->
            <view class="label bill__item" slot='pre'>订单来源：</view>
            <view class="body bill__item origin" slot='mid'>
                <view class="content">{{info.billOriginText}}</view>
                <image class='paytype' :src='getBillOrigin(info&&info.billOrigin)'></image>
            </view>
        </cellBlock>
        <cellBlock v-if='info.payTypeText&&info.payTypeText!="-"'>
            <!-- //付款方式 0 未支付 1 后台确认2 余额支付 3 货到付款 10 微信支付 20 支付宝支付30 银联支付 -->
            <view class="label bill__item" slot='pre'>支付方式：</view>
            <view class="body bill__item origin" slot='mid'>
                <view class="content">{{info.payTypeText}}</view>
                <image class='paytype' :src='getPayType(info&&info.payType)'></image>
            </view>
        </cellBlock>
    </view>
</template>

<script>
    import cellBlock from './BillDetailCell'
    import judgeOrigin from '../../components/my-components/dataOrigin.js'
    import payType from '../../components/my-components/payType.js'
    export default {
        props: {
            info: {
                type: Object,
                default: {
                    billId: '', //订单编号
                    billStatusText: '', //订单状态
                    billStatus: '', //订单状态 -2退款完成。-1取消状态。 0普通状态。1为已付款。2为已发货。3为已完成。
                    billTypeText: '', //订单类型  1为实体 2为虚拟物品 3 卡密 4预约 5核销
                    billOriginText: '', //订单来源
                    billOrigin: '', //订单来源 0: 公众号 1: 小程序 2: wap/h5 3: app 4 :pc
                    payTypeText: '', //支付方式 0 未支付 1 后台确认2 余额支付 3 货到付款 10 微信支付 20 支付宝支付30 银联支付
                    payType: '', //支付方式
                }
            }
        },
        components: {
            cellBlock
        },
        methods: {
            getPayType(no) {
                return no && payType(no)
            },
            getBillOrigin(no) {
                return no && judgeOrigin(no)
            },
            copy(val) {
                let that = this;
                uni.setClipboardData({
                    data: val,
                    success: function() {
                        // that.Toast('复制成功')
                    }
                });
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import './block.scss';
    .grace-boxes-img {
        width: 24upx;
        height: 24upx;
        font-size: 24upx;
        line-height: 24upx;
        display: inline-block;
        margin-left: 5upx;
    }
    .bill__item {
		color: #33373a;
        height: 100%;
        line-height: 38upx;
        position: relative;
        .copy-icon {
            position: absolute;
            width: 24upx;
            height: 24upx;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
        }
        &.copy-item {
            padding-right: 40upx;
        }
    }
    .origin {
        display: flex;
        flex-wrap: nowrap;
        .content {
            color: #6e7685;
            font-size: 24upx;
            height: 34upx;
            line-height: 34upx;
        }
    }
    .paytype {
        width: 24upx;
        height: 24upx;
        margin: auto 0 auto 10upx;
    }
</style>