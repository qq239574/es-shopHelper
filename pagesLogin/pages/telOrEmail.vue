<template>
    <view class='tel-email page'>
        <view class="grace-form" style='border-top:none;'>
            <van-cell-group>
                <van-field :placeholder="placeholder1" use-icon-slot @input='getUserId' clearable @clear='getUserId'>
                </van-field>
                <van-field :type="openEye?'text':'password'" :placeholder="placeholder2" use-icon-slot @input='getPassWord' @clear='getPassWord' clearable>
                    <RoundButton slot="icon" @click='getVCode'></RoundButton>
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
    export default {
        components: {
            LongButton,
            RoundButton
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
                placeholder2: '请输入短信验证码'
            }
        },
        onLoad(option) { 
            console.log(option)
            if (option.from == 'email') {
                this.placeholder1 = '请输入邮箱';
                this.placeholder2 = '请输入验证码';
            } else {
                this.placeholder1 = '请输入手机号码';
                this.placeholder2 = '请输入短信验证码';
            }
        },
         mounted(){
            this.closePageLoading(); 
        },
        methods: {
            nextPage() {
                 uni.reLaunch({
                    url: './setNew'
                })
            },
            getVCode() {
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
    }
</style>