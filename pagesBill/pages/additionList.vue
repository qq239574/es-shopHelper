<template>
    <view class='addition-list page'>
        <view class="number">共<text>{{list.length}}</text>条</view>
        <block v-for='(item,index) in list' :key='index'>
            <additionBlock :info='item'></additionBlock>
        </block>
        <view class="foot">
            <longButton @click='clickButton'>
                <van-icon name="edit" color='#fff' />添加备注</longButton>
        </view>
    </view>
</template>

<script>
    import additionBlock from '../components/Addition-Block'
    import longButton from '../../components/my-components/LongButton.vue'
    export default {
        components: {
            additionBlock,
            longButton
        },
        data() {
            return {
                list: [{
                    name: '老板',
                    date: '2019-10-12 12:11:11',
                    content: '几点几分了卡机的看法看手机付款了时间对方离开就是路口附近两款手机分类看时间费了快速减肥流口水几点看法就回家谁看见电话费会计师合肥看介绍付款交水电费会计师的合肥看介绍付款就是付款接收到放空间还是打开肌肤还是的空间发挥收款机返回。'
                }, {
                    name: '老板',
                    date: '2019-10-12 12:11:11',
                    content: '几点几分了卡机的看法看手机付款了时间对方离开就是路口附近两款手机分类看时间费了快速减肥流口水几点看法就回家谁看见电话费会计师合肥看介绍付款交水电费会计师的合肥看介绍付款就是付款接收到放空间还是打开肌肤还是的空间发挥收款机返回。'
                }, ]
            }
        },
        methods: {
            clickButton() {
                uni.navigateTo({
                    url: './billAddition?from=additionList'
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .number {
        width: 100%;
        line-height: 66upx;
        box-sizing: border-box;
        padding: 0 40upx;
        font-size: 26upx;
        color: #9da3ae;
        text {
            color: #fa8a6f;
        }
    }
    .foot {
        position: fixed;
        width: 100%;
        height: 125upx;
        bottom: 0;
        left: 0;
        background: #fff;
        display: flex;
        justify-content: space-around;
        border-top: 1upx solid #eee;
        padding: 16upx 0;
        box-sizing: border-box;
    }
</style>