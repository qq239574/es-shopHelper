<template>
    <view class='bill-block1 block'>
        <cellBlock>
            <view class="label bill__item" slot='pre'>订单编号：</view>
            <view class="body bill__item" slot='mid'>{{info.id}}
                <view class='grace-boxes-img grace-iconfont icon-share' @click='copy(info.id)'></view>
            </view>
        </cellBlock>
        <cellBlock>
            <view class="label bill__item" slot='pre'>订单状态：</view>
            <view class="body bill__item" slot='mid'>{{info.status}}</view>
        </cellBlock>
        <cellBlock>
            <view class="label bill__item" slot='pre'>订单类型：</view>
            <view class="body bill__item" slot='mid'>{{info.billType}}</view>
        </cellBlock>
        <cellBlock>
            <view class="label bill__item" slot='pre'>订单来源：</view>
            <view class="body bill__item origin" slot='mid'>
                <view class="content">{{info.billOrigin}}</view>
                <image class='paytype' src='/static/img/global/wechat.svg'></image>
                <image class='paytype' src='/static/img/global/wechat.svg'></image>
                <image class='paytype' src='/static/img/global/wechat.svg'></image>
                <image class='paytype' src='/static/img/global/wechat.svg'></image>
            </view>
        </cellBlock>
        <cellBlock>
            <view class="label bill__item" slot='pre'>支付方式：</view>
            <view class="body bill__item origin" slot='mid'>
                <view class="content">{{info.payType}}</view>
                <image class='paytype' src='/static/img/global/wechat.svg'></image>
                <image class='paytype' src='/static/img/global/wechat.svg'></image>
                <image class='paytype' src='/static/img/global/wechat.svg'></image>
                <image class='paytype' src='/static/img/global/wechat.svg'></image>
            </view>
        </cellBlock>
    </view>
</template>

<script>
    import cellBlock from './BillDetailCell'
    export default {
        props: {
            info: {
                type: Object,
                default: {
                    id: 'ES20154635685565698454554554568',
                    status: '代付款',
                    billType: '普通订单',
                    billOrigin: '小程序',
                    payType: '微信支付'
                }
            }
        },
        components: {
            cellBlock
        },
        methods: {
            copy(val) {
                uni.setClipboardData({
                    data: val,
                    success: function() {
                        this.Toast('复制成功')
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
        height: 100%;
        line-height: 38upx;
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