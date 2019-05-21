<template>
    <view class='bill-block4 block' v-if='info.moneyState!=-1'>
        <cellBlock>
            <view class="label bill__item" slot='pre' style='text-indent:1em;'>佣金状态：</view>
            <view class="body bill__item" slot='mid'>{{info.moneyState}}</view>
        </cellBlock>
        <cellBlock >
            <view class="label bill__item" slot='pre'>一级分销商：</view>
            <view class="body bill__item" slot='mid'>{{info.firstOne.name}} {{info.firstOne.tel}}</view>
            <view class="foot  bill__item" slot='aft'>佣金：￥{{info.firstOne.money}}</view>
        </cellBlock>
        <cellBlock >
            <view class="label bill__item" slot='pre'>二级分销商：</view>
            <view class="body bill__item" slot='mid'>{{info.secondOne.name}} {{info.secondOne.tel}}</view>
            <view class="foot  bill__item" slot='aft'>佣金：￥{{info.secondOne.money}}</view>
        </cellBlock>
        <cellBlock >
            <view class="label bill__item" slot='pre'>三级分销商：</view>
            <view class="body bill__item" slot='mid'>{{info.thirdOne.name}} {{info.thirdOne.tel}}</view>
            <view class="foot  bill__item" slot='aft'>佣金：￥{{info.thirdOne.money}}</view>
        </cellBlock>
    </view>
</template>

<script>
    import cellBlock from './BillDetailCell'
    export default {
        components: {
            cellBlock
        },
        props: {
            info: {
                moneyState: '', //佣金状态
                firstOne: {
                    name: '',
                    tel: '',
                    money: ''
                }, //一级分销商
                secondOne: {
                    name: '',
                    tel: '',
                    money: ''
                }, //二级分销商
                thirdOne: {
                    name: '',
                    tel: '',
                    money: ''
                } //三级分销商
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import './block.scss'
</style>