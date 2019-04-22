<template>
    <view class='tel-email page'>
        <view class="grace-form" style='border-top:none;'>
            <van-cell-group>
                <van-field :placeholder="placeholder1" use-icon-slot @input='getUserId' clearable @clear='getUserId'>
                </van-field>
                <van-field :type="openEye?'text':'password'" placeholder="输入图形验证码" use-icon-slot @input='getImgCode' @clear='getPassWord' clearable>
                    <imgCodeButton slot='icon' :imageCode='imageCode'></imgCodeButton>
                </van-field>
                <van-field :type="openEye?'text':'password'" :placeholder="placeholder2" use-icon-slot @input='getPassWord' @clear='getPassWord' clearable>
                    <RoundButton slot='icon' :canSend='sendVfCode' @click='getVCode'></RoundButton>
                </van-field>
            </van-cell-group>
        </view>
        <LongButton :disable='disable' @click='nextPage'>下一步</LongButton>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
    let userId = '',
        password = '';
    import LongButton from '../../components/my-components/LongButton';
    import RoundButton from '../../components/my-components/GetVCodeButton'
    import imgCodeButton from '../../components/my-components/GetVCodeButton-image.vue'
    export default {
        components: {
            LongButton,
            RoundButton,
            imgCodeButton
        },
        computed: {
            disable() {
                return this.userId === '' || this.password === '';
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
            }
        },
        onLoad(option) {
            if (option.from == 'email') {
                this.placeholder1 = '请输入邮箱';
                this.placeholder2 = '请输入验证码';
            } else {
                this.placeholder1 = '请输入手机号码';
                this.placeholder2 = '请输入短信验证码';
            }
        },
        watch: {
            imageCode() {}
        },
        mounted() {
            this.closePageLoading();
        },
        methods: {
            getImgCode(val) {
                this.imageCode = val.detail;
            },
            nextPage() {
                uni.reLaunch({
                    url: './setNew'
                })
            },
            getVCode(bool) {
                if (this.imageCode) {
                    this.Request('sendVfCode')
                } else {
                    this.Toast('请输入图形验证码')
                }
                console.log('object')
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