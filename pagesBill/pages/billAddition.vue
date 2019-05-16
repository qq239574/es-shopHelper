<template>
    <view class='bill-addition page'>
        <textarea class='textarea' :value='val' placeholder-style="color:#d2d5db" :maxlength='0' placeholder="请填写备注" @input='getAddition' />
        <!-- <view class='counter'>{{length}}/50</view> -->
        <longButton :disable='disable' @click='sure'>确定</longButton>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
    import longButton from '../../components/my-components/LongButton.vue'
    let DataFrom = {};
    let cacheVal = '';
    export default {
        components: {
            longButton
        },
        data() {
            return {
                val: '',
                length: 0,
                disable: true
            }
        },
        methods: {
            sure() {
                if (DataFrom.from == 'billProvide') {//订单发货不独自保存备注
                    this.Cacher.setData('billAddition', {
                        billAddition: cacheVal
                    })
                     uni.navigateBack();
                } else {
                    this.pageLoading();
                    this.Request('addAddition', {
                        id: DataFrom.bill.bill.id,
                        remark: cacheVal
                    }).then(res => {
                        this.closePageLoading();
                        uni.navigateBack();
                    }).catch(res=>{
                        this.Toast(res.message)
                    });
                }
            },
            getAddition(val) {
                this.length = val.detail.value.length;
                this.disable = !val.detail.value.length;
                cacheVal = val.detail.value
            }
        },
        onLoad(option) {
            DataFrom = this.Cacher.getData(option.from)
        }
    }
</script>

<style lang="scss" scoped>
    .bill-addition {
        position: relative;
        .counter {
            width: fit-content;
            height: 24upx;
            line-height: 24upx;
            color: #9da3ae;
            font-size: 24upx;
            position: absolute;
            top: 158upx;
            right: 40upx;
        }
        .textarea {
            width: 710upx;
            background: #fff;
            height: 180upx;
            margin: 20upx auto 30upx;
            border-radius: 6upx;
            box-sizing: border-box;
            padding: 20upx;
            font-size: 26upx;
            line-height: 36upx;
        }
    }
</style>