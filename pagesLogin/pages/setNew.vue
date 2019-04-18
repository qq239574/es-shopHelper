<template>
    <view class='tel-email page'>
        <view class="grace-form" style="margin-top:50upx;">
            <van-cell-group>
                <van-field placeholder="请输入6-20位新密码" use-icon-slot @input='getUserId' clearable>
                </van-field>
                <van-field :type="openEye?'text':'password'" placeholder="请再次输入密码" use-icon-slot @input='getPassWord' clearable>
                    <RoundButton slot="icon" @click='getVCode'></RoundButton>
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
        mounted(){
            this.closePageLoading(); 
        },
        methods: {
            nextPage() {
                if (!this.disableButton) {
                    if (this.password1 !== this.password2) {
                        Toast('两次输入不一致');
                    } else {
                        uni.reLaunch({
                            url: '../../pages/index/index'
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