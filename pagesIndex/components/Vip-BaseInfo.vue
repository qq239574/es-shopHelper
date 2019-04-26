<template>
    <view class='vip-baseinfo'>
        <Block1 :info='info.info1'></Block1>
        <Block2 :info='info.info2' @click='clickItem'></Block2>
        <detailPicker :toggle='toggle'>
            <block>
                <view class="row add" @click='clickMenu("add")'>增加</view>
                <view class="row minus" @click='clickMenu("minus")'>扣除</view>
                <view class="row clear" @click='clickMenu("clear")'>清零</view>
                <view class="row cancel" @click='clickMenu("cancel")'>取消</view>
            </block>
        </detailPicker>
    </view>
</template>

<script>
    import Block1 from './Vip-BaseInfo-Block1.vue'
    import Block2 from './Vip-BaseInfo-Block2.vue'
    import detailPicker from './Detail-Picker.vue'
    let cache = {};
    export default {
        props: {
            info: {
                info1: {
                    registerTime: '2015-01-12 14:12:12',
                    origin: 'wechat',
                    vipClass: '默认会员',
                    vipTag: '夜猫子 白领'
                },
                info2: {
                    score: 0,
                    money: 0,
                    coupon: 0
                }
            }
        },
        components: {
            Block1,
            Block2,
            detailPicker
        },
        data() {
            return {
                toggle: false,
            }
        },
        methods: {
            clickItem(val) {
                if (val.label == '余额') {
                    this.toggle = !this.toggle;
                    cache = val;
                } else if (val.label == '积分') {
                    this.toggle = !this.toggle;
                    cache = val;
                } else if (val.label == '优惠券') {
                    this.$emit('click', {
                        ...val
                    })
                }
            },
            clickMenu(type) {
                this.toggle = !this.toggle;
                if (type == 'add' || type == 'minus') {
                    this.$emit('click', {
                        type,
                        ...cache
                    })
                } else if (type == 'clear') { //清空需要二次确认
                    this.Dialog.confirm({
                        title: '清空' + cache.label,
                        message: '您确认将该用户的余额/积分清零吗？'
                    }).then(() => {
                        this.$emit('click', {
                            type,
                            ...cache
                        })
                    }).catch(() => {
                        // on cancel
                    });
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .vip-baseinfo {
        .row {
            width: 100%;
            height: 100upx;
            background: #fff;
            border-bottom: 1upx solid #eee;
            font-size: 30upx;
            text-align: center;
            line-height: 100upx;
        }
        .cancel {
            margin: 20upx 0 0;
        }
    }
</style>