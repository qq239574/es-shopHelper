<template>
    <view class='tel-email page'>
        <view class="grace-form" style='border-top:none;'>
            <van-cell-group>
                <van-field :placeholder="placeholder1" use-icon-slot @input='getUserId' clearable @clear='getUserId'>
                </van-field>
                <van-field :type="openEye?'text':'password'" placeholder="输入图形验证码" use-icon-slot @input='getImgCode' @clear='getPassWord' clearable>
                    <imgCodeButton :refreshButton='refreshButton' slot='icon' :imageCode='imageCode'></imgCodeButton>
                </van-field>
                <van-field :type="openEye?'text':'password'" :placeholder="placeholder2" use-icon-slot @input='getPassWord' @clear='getPassWord' clearable>
                    <RoundButton slot='icon' :canSend='canSendVfCode' @click='getVCode'></RoundButton>
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
    import RoundButton from '../../components/my-components/GetVCodeButton'
    import imgCodeButton from '../../components/my-components/GetVCodeButton-image.vue'
    let type = '';
    let session_id = ''; //
    let questions = []; //	安全问题
    let registerType = ''; //	注册类型(username,mobile,email)
    export default {
        components: {
            LongButton,
            RoundButton,
            imgCodeButton
        },
        computed: {
            disable() {
                return this.userId === '' || this.password === '';
            },
            canSendVfCode() {
                if (type == 'email') {
                    var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
                    return re.test(this.userId) && !!this.imageCode;
                } else {
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
                refreshButton: false
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
                                answer: ''
                            }
                        })
                        uni.navigateTo({
                            url: './setNew?from=telOrEmail'
                        })
                    } else {
                        this.Toast(res.message)
                    }
                }).catch(res => {
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
                } else if (this.imageCode && bool) { //填写了图形验证码
                    this.pageLoading();
                    this.requestCode();
                } else if (this.canSendVfCode && !bool) { //正在请求中
                    this.Toast('请稍后')
                } else { //验证不通过
                    this.Toast(this.placeholder1 + '与图形验证码')
                }
            },
            requestCode() {
                this.Request('sendVfCode', {
                    account: this.userId,
                    session_id: session_id,
                    captcha_code: this.imageCode,
                    action: 'forget',
                    type: type
                }).then(res => {
                    if (error != 0) {
                        this.Toast(res.message)
                    }
                    this.closePageLoading();
                    this.refreshButton();
                }).catch(res => {
                    this.Toast(res.message);
                    this.closePageLoading();
                    this.refreshButton();
                })
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