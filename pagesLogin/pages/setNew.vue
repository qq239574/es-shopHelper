<template>
    <view class='tel-email page'>
        <view class="grace-form" style="margin-top:50upx;">
            <van-cell-group>
                <van-field placeholder="请输入6-20位新密码" use-icon-slot @input='getUserId' clearable>
                </van-field>
                <van-field type="text" placeholder="请再次输入密码" use-icon-slot @input='getPassWord' clearable>
                </van-field>
            </van-cell-group>
        </view>
        <LongButton @click='nextPage' :disable='disableButton'>完成</LongButton>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
    import LongButton from '../../components/my-components/LongButton';
    import RoundButton from '../../components/my-components/GetVCodeButton'
    import Toast from '../../wxcomponents/vant-weapp/toast/toast';
    let DataFrom = {};
    export default {
        components: {
            LongButton,
            RoundButton
        },
        data() {
            return {
                openEye: false,
                disable: true,
                password1: '',
                password2: ''
            }
        },
        computed: {
            disableButton() {
                return !this.password1 || !this.password2
            }
        },
        mounted() {
            this.closePageLoading();
        },
        methods: {
            nextPage() {
                if (!this.disableButton) {
                    if (this.password1 !== this.password2) {
                        Toast('两次输入不一致');
                    } else {
                        this.Request('setForgetPassword', {
                            session_id: DataFrom.info.session_id,
                            type: DataFrom.info.type,
                            account: DataFrom.info.account,
                            verify_code: DataFrom.info.verify_code,
                            question: DataFrom.info.question,
                            answer: DataFrom.info.answer,
                            password: this.password1
                        }).then(res => {
                            if (res.error == 0) {
                                this.Cacher.setData('setNewPassword', {
                                    from: 'setNewPassword'
                                });
                                this.Toast('重置密码成功');
                                setTimeout(() => {
                                    uni.reLaunch({
                                        url: '../../pages/login/index?from=setNewPassword'
                                    })
                                }, 1500)
                            } else {
                                this.Toast(res.message)
                            }
                        }).catch(res => {
                            this.Toast(res.message)
                        })
                    }
                }
            },
            getVCode() {
                console.log('object')
            },
            getUserId(val) {
                this.password1 = val.detail;
            },
            getPassWord(val) {
                this.password2 = val.detail;
            },
        },
        onLoad(option) {
            DataFrom = this.Cacher.getData(option.from)
        }
    }
</script>

<style lang="scss" scoped>
    .tel-email {
        background: #fff;
        .grace-form {
            width: 670upx;
            margin: 0 auto 81upx;
        }
    }
</style>