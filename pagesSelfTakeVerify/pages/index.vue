<template>
    <div class="self-verification page">
        <view class="code-box">
            <view class="title">输入核销码</view>
            <view class="vrcode" @click='checkVrCode'>
                使用二维码核销
            </view>
            <view class="code">
                <view class="col col2"><input type="text" placeholder='请输入核销码' placeholder-style="color:#d2d5db;font-weight:500;" @input='inputMoney'></view>
            </view>
        </view>
        <longButton @click='submit'>提交</longButton>
        <view class='check-history' @click='checkHistory'>查看历史核销记录</view>
    </div>
</template>

<script>
    import longButton from "../../components/my-components/LongButton";
    let cache = '';
    export default {
        data() {
            return {}
        },
        components: {
            longButton
        },
        methods: {
            inputMoney(val) { //手动输入
                cache = val.detail.value;
            },
            submit() { //提交核销码
                this.pageLoading();
                this.Request('postSelfVerifyInfo', {
                    order_id: '',
                    finish_code: cache
                }).then(res => {
                    this.closePageLoading();
                }).catch(res => {
                    this.closePageLoading();
                })
            },
            checkVrCode() { //扫描获取二维码
                let that = this;
                uni.scanCode({
                    success(res) {
                        cache = res.result;
                    },
                    fail(res) {
                        // console.log(res)
                    }
                })
            },
            checkHistory() { //跳转历史核销记录
                uni.navigateTo({
                    url: './historyRecord?from=selfVery'
                })
            }
        },
        onShow() {
            this.closePageLoading();
        }
    };
</script>

<style lang="scss" scoped>
    .self-verification {
        position: relative;
        height: 100%!important;
        .check-history {
            position: fixed;
            width: fit-content;
            left: 0;
            right: 0;
            margin: auto;
            bottom: 100upx;
            color: #fb6638;
            text-decoration: underline;
        }
        .code-box {
            width: 710upx;
            background: #fff;
            box-sizing: border-box;
            padding: 20upx;
            margin: 20upx auto 100upx;
            border-radius: 10upx;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            .title {
                font-size: 28upx;
                color: #333;
                font-weight: 700;
                line-height: 50upx;
            }
            .vrcode {
                width: fit-content;
                height: 50upx;
                font-size: 22upx;
                color: #fb6638;
                background: #fff2f2;
                line-height: 50upx;
                padding: 0 12upx;
                border-radius: 4upx;
            }
        }
        .code {
            background: #fff;
            height: 160upx;
            width: 100%;
            display: flex;
            flex-wrap: nowrap;
            view,
            input {
                height: 100%;
                line-height: 120upx;
                font-size: 30upx;
                color: #213354;
                font-weight: 600;
                padding: 0 5upx;
                box-sizing: border-box;
            }
            .col2 {
                border-top: 1upx solid #eee;
                width: 100%;
                margin: 30upx auto;
                height: 110upx;
            }
        }
    }
</style>