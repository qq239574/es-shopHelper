<template>
    <view class='tel-email page'>
        <view class="grace-form" style='border-top:none;'>
            <van-cell-group :border='false'> 
                <van-field :placeholder="placeholder1" use-icon-slot @input='getUserId' clearable @clear='getUserId'>
                </van-field>
                <view :style='height20'></view>
                <van-field type="text" placeholder="输入图形验证码" use-icon-slot @input='getImgCode' @clear='getPassWord' clearable>
                    <imgCodeButton :refreshAgain='refreshAgain' slot='icon' :imageCode='imageCode'></imgCodeButton>
                </van-field>
                <view :style='height20'></view>
                <van-field type="text" :placeholder="placeholder2" use-icon-slot @input='getPassWord' @clear='getPassWord' clearable>
                    <RoundButton slot='icon' :start='successGetCode' @click='getVCode' @refresh='refreshTiming'></RoundButton>
                </van-field>
            </van-cell-group>
        </view>
        <LongButton :disable='disable' @click='nextPage'>下一步</LongButton>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
    import LongButton from '../../components/my-components/LongButton';
    import RoundButton from '../../components/my-components/GetVCodeButton.vue'
    import imgCodeButton from '../../components/my-components/GetVCodeButton-image.vue'
    let type = '';
    let session_id = ''; //
    let questions = []; //	安全问题
    let registerType = ''; //	注册类型(username,mobile,email)
    let sending = false;
    let bar = '';
    export default {
        components: {
            LongButton,
            RoundButton,
            imgCodeButton
        },
        computed: {
            height20() {
				return 'height:' + uni.upx2px(20) + 'px'
			},
            disable() {
                return this.userId === '' || this.password === '';
            },
            canSendVfCode() {
                if (type == 'email') { //验证邮箱
                    var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
                    return re.test(this.userId) && !!this.imageCode;
                } else { //
                    return /^1[0-9]{10}$/.test(this.userId) && !!this.imageCode;
                }
            }
        },
        data() {
            return {
                openEye: false,
                userId: '',
                password: '',
                placeholder1: '请输入手机号码',
                placeholder2: '请输入短信验证码',
                imageCode: '',
                sendVfCode: false,
                refreshAgain: false,//toggle刷新验证码
                refreshButton: false,
                successGetCode: false, //成功获取验证码
            }
        },
        onLoad(option) {
            if (option.from == 'email') {
                type = 'email';
                this.placeholder1 = '请输入邮箱';
                this.placeholder2 = '请输入验证码';
            } else {
                type = 'mobile';
                this.placeholder1 = '请输入手机号码';
                this.placeholder2 = '请输入短信验证码';
            }
            this.Request('initPassword', {}).then(res => {
                session_id = res.session_id;
                questions = res.settings.questions;
                registerType = res.settings.type;
            })
        },
        watch: {
            imageCode() {
                this.sendVfCode = true;
            }
        },
        mounted() {
            this.closePageLoading();
        },
        methods: {
            refreshTiming() { //倒计时结束时触发
                this.successGetCode = false;
            },
            getImgCode(val) {
                this.imageCode = val.detail;
            },
            nextPage() {
                this.pageLoading();
                this.Request('verifyCode', { //验证验证码
                    session_id: session_id,
                    type: type, //注册方式 (mobile 或 email)
                    account: this.userId,
                    verify_code: this.password,
                    question: '',
                    answer: ''
                }).then(res => {
                    this.refreshAgain = !this.refreshAgain;
                    this.closePageLoading();
                    if (res.error == 0) {
                        this.Cacher.setData('telOrEmail', {
                            from: 'telOrEmail',
                            info: {
                                type, //验证类型
                                session_id,
                                account: this.userId,
                                registerType, //注册类型
                                question: '',
                                answer: '',
                                verify_code: this.password,
                            }
                        })
                        uni.navigateTo({
                            url: './setNew?from=telOrEmail'
                        })
                    } else {
                        this.Toast(res.message)
                    }
                }).catch(res => {
                    this.refreshAgain = !this.refreshAgain;
                    this.successGetCode=false;
                    this.closePageLoading();
                    this.Toast(res.message)
                })
            },
            getVCode(bool) {
                if (!session_id) { //如果还没获取到session_id
                    this.pageLoading();
                    this.Request('initPassword', {}).then(res => {
                        session_id = res.session_id;
                        questions = res.settings.questions;
                        registerType = res.settings.type;
                        // this.getVCode(true);
                        this.requestCode();
                    })
                } else if (this.imageCode && this.canSendVfCode) { //填写了图形验证码
                    this.pageLoading();
                    this.requestCode();
                } else if (!this.imageCode) { //验证不通过 
                    this.Toast('请填写图形验证码')
                } else {
                    this.Toast(this.placeholder1);
                }
            },
            requestCode() {
                if (!sending) {
                    sending = true;
                    this.Request('sendVfCode', {
                        account: this.userId,
                        session_id: session_id,
                        captcha_code: this.imageCode,
                        action: 'forget',
                        type: type
                    }).then(res => {
                        if (res.error != 0) {
                            this.Toast(res.message);
                        } else {
                            this.successGetCode = true;
                        }
                        this.closePageLoading();
                        setTimeout(() => {
                            sending = false;
                        }, 500)
                    }).catch(res => {
                        this.successGetCode = false;
                        this.Toast(res.message || '图形验证码错误');
                        this.closePageLoading();
                        this.refreshAgain = !this.refreshAgain;
                        this.refreshButton = !this.refreshButton;
                        sending = false;
                    })
                }
            },
            getUserId(val) {
                if (val.type == 'input') {
                    this.userId = val.detail;
                } else {
                    this.userId = ''
                }
            },
            getPassWord(val) {
                if (val.type == 'input') {
                    this.password = val.detail;
                } else {
                    this.password = '';
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
    .tel-email {
        background: #fff;
        border-top:1upx solid #eee;
        .grace-form {
            width: 670upx;
            margin: 80upx auto 81upx;
        }
        .imgCode {
            width: 150upx;
            height: 54upx;
        }
    }
</style>