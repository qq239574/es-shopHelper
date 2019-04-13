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
        <LongButton @click='nextPage'>完成</LongButton>
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
        data() {
            return {
                openEye: false
            }
        },
        methods: {
            nextPage(){
                uni.navigateTo({
                    url:'./questions'
                })
            },
            getVCode(){
                console.log('object')
            },
            getUserId(val) {
                userId = val.detail;
            },
            getPassWord(val) {
                password = val.detail;
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