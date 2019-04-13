<template>
    <view class='tel-email page'>
        <view class="grace-form" style='border-top:none;'>
            <van-cell-group>
                <van-field placeholder="请输入用户名" use-icon-slot @input='getUserId' clearable @clear='getUserId'>
                </van-field>
                <van-field :type="openEye?'text':'password'" placeholder="请输入短信验证码" use-icon-slot @input='getPassWord' @clear='getPassWord' clearable>
                    <RoundButton slot="icon" @click='getVCode'></RoundButton>
                </van-field>
            </van-cell-group>
        </view>
        <LongButton :disable='disable' @click='nextPage'>下一步</LongButton>
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
                password: ''
            }
        },
        methods: {
            nextPage() {
                uni.navigateTo({
                    url: './questions'
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