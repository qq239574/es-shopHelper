<template>
    <view class='bill-provide page'>
        <ProvideGoods :goodsList='goodsList' @click='selectedList'></ProvideGoods>
        <ProvideBlock @click='clickCell'></ProvideBlock>
        <longButton @click='sure'>确认发货</longButton>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
    import ProvideGoods from '../components/ProvideGoods'
    import ProvideBlock from '../components/ProvideBlock'
    import longButton from '../../components/my-components/LongButton.vue'
    let cacheSelected = []
    export default {
        components: {
            ProvideGoods,
            ProvideBlock,
            longButton
        },
        data() {
            return {
                goodsList: [{
                    img: '/static/img/global/tmp.png',
                    goodName: '翻页蓝色的空间疯狂大富科技上来看饭店经理看时间对方离开时间slikfjsdfklklsjfdlkjslkdjfl',
                    color: '浅绿色',
                    size: 'S码',
                    num: 2,
                    price: '15455.2',
                    status: 0, //0未发货
                }, {
                    img: '/static/img/global/tmp.png',
                    goodName: '翻页蓝色的空间疯狂大富科技上来看饭店经理看时间对方离开时间',
                    color: '浅绿色',
                    size: 'S码',
                    num: 2,
                    price: '152344.2',
                    status: 0, //已发货
                }, {
                    img: '/static/img/global/tmp.png',
                    goodName: '翻页蓝色的空间疯狂大富科技上来看饭店经理看时间对方离开时间',
                    color: '浅绿色',
                    size: 'S码',
                    num: 2,
                    price: '152344.2',
                    status: 1, //已发货
                }]
            }
        },
        methods: {
            clickCell(val) {
                console.log(val);
                if (val.name == '备注') {
                    uni.navigateTo({
                        url: './billAddition'
                    })
                } else if (val.name == '物流单号') {
                    uni.navigateTo({
                        url: './billId'
                    })
                } else if (val.name == '物流公司') {
                    uni.navigateTo({
                        url: './componyList'
                    })
                }
            },
            selectedList(list) {
                cacheSelected = list;
            },
            sure() {
                this.pageLoading();
                setTimeout(()=>{
                    this.closePageLoading();
                    uni.navigateBack();
                },2000)
            }
        },
        onLoad(option) {}
    }
</script>

<style lang="scss" scoped>
    .bill-provide {
        padding-bottom: 50upx;
    }
</style>