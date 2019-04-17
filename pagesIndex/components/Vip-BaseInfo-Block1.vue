<template>
    <view class='vip-bus-block'>
        <inputItem label='注册时间' :disabled='true' value='2015-01-12 14:12:12'></inputItem>
        <view class="image">
            <inputItem label='来源' :disabled='true' value=' '></inputItem>
            <image src='/static/img/global/wechat.png'></image>
        </view>
        <inputItem label='会员等级' :disabled='true' value='默认会员'></inputItem>
        <inputItem label='会员标签' :disabled='true' value='夜猫子 白领'></inputItem>
    </view>
</template>

<script>
    import inputItem from '../../components/my-components/editBlock-InputItem.vue'
    export default {
        components: {
            inputItem
        },
        data() {
            return {
                itemList: [{
                    label: '',
                    value: '230.25元'
                }]
            }
        },
    }
</script>

<style lang="scss" scoped>
    .vip-bus-block {
        background: #fff;
        margin-bottom:20upx;
        .image {
            position: relative;
            image {
                position: absolute;
                top: 28upx;
                right: 30upx;
                width: 45upx;
                height: 45upx;
            }
        }
    }
</style>