<template>
    <view class='multi-specification page'>
        <multiBlock @input='getInput'></multiBlock>
        <longButton @click='save' :disable='disable'>保存</longButton>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
    import multiBlock from '../components/editPassWord-BlockMult.vue'
    import longButton from '../../components/my-components/LongButton.vue'
    export default {
        components: {
            multiBlock,
            longButton
        },
        computed: {
            disable() {
                return this.CacheData.oldPw === '' || this.CacheData.newPw === '' || this.CacheData.surePw === ''
            }
        },
        data() {
            return {
                CacheData: {
                    oldPw: '',
                    newPw: '',
                    surePw: ''
                }
            }
        },
        methods: {
            getInput(val) {
                if (val.label == '原密码') {
                    this.CacheData.oldPw = val.value;
                } else if (val.label == '新密码') {
                    this.CacheData.newPw = val.value;
                } else if (val.label == '确认密码') {
                    this.CacheData.surePw = val.value;
                }
            },
            save() {
                let canset = true;

                if (this.CacheData.newPw != this.CacheData.surePw) { 
                    this.Toast('新密码两次输入不一致')
                } else {
                    this.pageLoading();
                    this.Request('changeUserPassword', {
                        original_password: this.CacheData.oldPw,
                        new_password: this.CacheData.newPw
                    }).then(res => {
                        this.closePageLoading();
                        if (res.error == 0) {
                            this.Toast('保存成功');
                            setTimeout(() => {
                                uni.navigateBack();
                            }, 1000)
                        } else {
                            this.Toast(res.message)
                        }
                    }).catch(res => {
                        this.closePageLoading();
                        this.Toast(res.message)
                    })
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .multi-specification {}
</style>