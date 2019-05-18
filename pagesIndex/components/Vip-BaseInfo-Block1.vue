<template>
    <view class='vip-bus-block'>
        <inputItem labelStyle='font-weight: 500;' label='注册时间' :disabled='true' :value='info.registerTime'></inputItem>
        <view class="image">
            <inputItem labelStyle='font-weight: 500;' label='来源' :disabled='true' value=' '></inputItem>
            <image :src='judgeOrigin(info.origin)'></image>
        </view>
        <inputItem labelStyle='font-weight: 500;' label='会员等级' :disabled='true' :value='info.vipClass'></inputItem>
        <inputItem labelStyle='font-weight: 500;' label='会员标签' :disabled='true' :value='info.vipTag'></inputItem>
    </view>
</template>

<script>
    import inputItem from '../../components/my-components/editBlock-InputItem.vue'
    import judgeOrigin from '../../components/my-components/dataOrigin.js'
    export default {
        props: {
            info: {
                type: Object,
                default: {
                    registerTime: '',
                    origin: '',
                    vipClass: '',
                    vipTag: ''
                }
            }
        },
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
        methods: {
            judgeOrigin(origin) {
                return judgeOrigin(origin)
            }
        },
    }
</script>

<style lang="scss" scoped>
    .vip-bus-block {
        background: #fff;
        margin-bottom: 20upx;
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