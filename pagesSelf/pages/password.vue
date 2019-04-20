<template>
    <view class='multi-specification page'>
        <multiBlock @input='getInput'></multiBlock>
        <longButton @click='save'>保存</longButton>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
    import multiBlock from '../components/editPassWord-BlockMult'
    import longButton from '../../components/my-components/LongButton.vue'
    export default {
        components: {
            multiBlock,
            longButton
        },
        methods: {
            getInput(val) {
                console.log(val)
            },
            save() {
                this.pageLoading();
                setTimeout(() => {
                    this.closePageLoading();
                    this.Toast('修改密码成功');
                    uni.navigateBack();
                }, 1000);
            }
        },
    }
</script>

<style lang="scss" scoped>
    .multi-specification {}
</style>