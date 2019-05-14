<template>
    <view class='surplus page'>
        <surplusWin :info='info'></surplusWin>
        <view class="curMoney">
            <view class="tit">当前{{label}}</view>
            <view class="num"><text v-if='label=="余额"'>￥</text><text class='no'>{{curnum}}</text></view>
        </view>
        <view class="money">
            <view class="col col1" :style='label=="余额"?"":"opacity:0"'>￥</view>
            <view class="col col2"><input type="digit" :placeholder='placeholder' placeholder-style="color:#d2d5db;font-weight:500;" @input='inputMoney'></view>
        </view>
        <view class="textarea">
            <textarea class='textarea' :value='val' placeholder-style="color:#d2d5db" :maxlength='40' placeholder="输入备注" @input='getAddition' />
            <view class='counter'>{{textLength}}/40</view>
        </view>
        <view class="margin30"></view>
        <longButton :disable='getDisabled' @click='sure'>确认{{type}}</longButton>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
    import surplusWin from '../components/Vip-Surplus-Window'
    import longButton from '../../components/my-components/LongButton.vue'
    let DataFrom = {}
    export default {
        components: {
            surplusWin,
            longButton
        },
        data() {
            return {
                info: {
                    name: '',
                    img: ''
                },
                textLength: 0,
                label: '',
                type: '',
                curnum: 0,
                money: '',
                addition: '',
                placeholder: ''
            }
        },
        computed: {
            getDisabled() {
                return !this.money || !this.addition;
            }
        },
        methods: {
            inputMoney(val) {
                this.money = val.detail.value
            },
            initPage() {
                let title = ''
                if (DataFrom.value.type == 'add') {
                    title = '增加' + DataFrom.value.label;
                    this.type = '增加';
                } else {
                    title = '扣除' + DataFrom.value.label;
                    this.type = '扣除';
                }
                this.curnum = DataFrom.value.value;
                this.label = DataFrom.value.label;
                this.placeholder = '输入' + this.type + this.label + '数';
                uni.setNavigationBarTitle({
                    title: title
                });
            },
            getAddition(val) {
                this.textLength = val.detail.value.length;
                this.addition = val.detail.value
            },
            sure() {
                let apis = ['changeVipMoney', 'changeVipScore'];
                let api = '';
                let num = 0;
                if (DataFrom.value.type == 'add') {
                    num = this.money;
                } else if (DataFrom.value.type == 'minus') {
                    num = Math.min(this.money, this.curnum) * -1;
                }
                if (DataFrom.value.label == '余额') {
                    api = 'changeVipMoney'
                } else if (DataFrom.value.label == '积分') {
                    api = 'changeVipScore'
                }
                this.Request(api, {
                    member_id: DataFrom.info.id,
                    sum: num, //充值数量 正数添加余额, 负数减少积分
                    remark: this.addition //
                }).then(res => {
                    uni.navigateBack()
                });
            },
        },
        beforeCreate() {
            uni.setNavigationBarTitle({
                title: ''
            });
        },
        onLoad(option) {
            DataFrom = this.Cacher.getData(option.from);
            this.info = {
                name: DataFrom.info.nickname,
                img: DataFrom.info.avatar
            }
            this.initPage();
        },
        onShow() {
            this.initPage();
        }
    }
</script>

<style lang="scss" scoped>
    .margin30 {
        height: 30upx;
    }
    .curMoney {
        width: 100%;
        height: 220upx;
        background: #fff;
        overflow: hidden;
        .tit {
            width: 100%;
            font-size: 28upx;
            color: #8494af;
            line-height: 28upx;
            height: 28upx;
            margin: 40upx auto 32upx;
            text-align: center;
        }
        .num {
            width: fit-content;
            text-align: center;
            width: fit-content;
            margin: auto;
            text {
                color: #213354;
                font-size: 30upx;
            }
            .no {
                font-size: 60upx;
                line-height: 60upx;
                font-weight: 600;
            }
        }
    }
    .money {
        background: #fff;
        height: 120upx;
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        &:after {}
        view,
        input {
            height: 100%;
            line-height: 120upx;
            font-size: 28upx;
            color: #213354;
            font-weight: 600;
            padding: 0 5upx;
            box-sizing: border-box;
        }
        .col1 {
            width: 50upx;
            margin-left: 20upx;
            border-top: 1upx solid #eee;
            border-bottom: 1upx solid #eee;
            text-align: center;
        }
        .col2 {
            border-top: 1upx solid #eee;
            border-bottom: 1upx solid #eee;
            width: 650upx;
        }
    }
    .textarea {
        width: 100%;
        height: 170upx;
        position: relative;
        background: #fff;
        textarea {
            width: 100%;
            height: 100%;
            padding: 30upx 70upx;
            box-sizing: border-box;
        }
        .counter {
            width: fit-content;
            height: 24upx;
            line-height: 24upx;
            color: #9da3ae;
            font-size: 24upx;
            position: absolute;
            bottom: 22upx;
            right: 40upx;
        }
    }
</style>