<template>
    <view class='addition-list page'>
        <view class="number">共<text>{{list.length}}</text>条</view>
        <block v-for='(item,index) in list' :key='index'>
            <additionBlock :info='item'></additionBlock>
        </block>
        <view class="foot">
            <longButton @click='clickButton'>
                <view class="icon">
                    <image class='add-addition' lazy-load src='/static/img/global/addition.svg'></image>
                </view>
                添加备注</longButton>
        </view>
    </view>
</template>

<script>
    import additionBlock from '../components/Addition-Block'
    import longButton from '../../components/my-components/LongButton.vue'
    let DataFrom = {}
    export default {
        components: {
            additionBlock,
            longButton
        },
        data() {
            return {
                list: [{
                    name: '',
                    date: '',
                    content: ''
                }]
            }
        },
        methods: {
            clickButton() {
                this.Cacher.setData('additionList', Object.assign({
                    from: 'additionList' 
                },DataFrom))
                uni.navigateTo({
                    url: './billAddition?from=additionList'
                })
            },
            iniPage() {
                this.Request('billAddition', {
                    id: DataFrom.bill.bill.id
                }).then(res => {
                    this.list = res.list.map(item => ({
                        name: item.name,
                        date: item.create_time,
                        content: item.remark,
                        id: item.id
                    }))
                })
            }
        },
        onLoad(option) {
            DataFrom = this.Cacher.getData(option.from);
            this.iniPage()
        },
        onShow() {
            this.iniPage()
        }
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

        .icon{
            width:26upx;
            height:26upx;
            margin-right:10upx;
            display: inline-block; 
            line-height: 30upx;
            box-sizing: border-box;
            position: relative;
            .add-addition{
                position: absolute;
                left:0;
                top:4upx;
                width:26upx;
                height:26upx; 
            }
        }
    }
</style>