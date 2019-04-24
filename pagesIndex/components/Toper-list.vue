<template>
    <view class='toper-list'>
        <view class='toper-header goods' v-if='pageid=="goods"'>
            <view class="th">商品</view>
            <view class="th">销售量(件)</view>
        </view>
        <view class='toper-header vip' v-else>
            <view class="th">会员</view>
            <view class="th">付款金额(元)</view>
        </view>
        <block v-for='(item,index) in list' :key='index'>
            <item :info='item' :index='index' :pageid='pageid'></item>
        </block>
    </view>
</template>

<script>
    import item from './Toper-Block'
    export default {
        components: {
            item
        },
        props: {
            pageid: {
                type: String,
                default: 'goods'
            },
            list:{
                type:Array,
                default:[{
                    img: '',
                    label: '',
                    value: 0,
                    index: 0
                }]
            }
        }, 
    }
</script>

<style lang="scss" scoped>
    .toper-list {
        width: 702upx;
        margin: 20upx auto;
        border-radius: 10upx;
        overflow: hidden;
        .toper-header {
            width: 100%;
            height: 68upx;
            display: flex;
            box-sizing: border-box;
            justify-content: space-between;
            background: #fff;
            .th {
                width: fit-content;
                height: 100%;
                overflow: hidden;
                line-height: 92upx;
                font-size: 26upx;
                color: #6f7685;
            }
            &.vip {
                padding: 0 30upx 0 80upx;
            }
            &.goods{
                 padding: 0 50upx 0 80upx;
            }
        }
    }
</style>