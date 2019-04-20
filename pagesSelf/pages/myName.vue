<template>
    <div class='my-name page'>
        <view class="bg">
            <search :value='name' placeholder='请输入姓名'></search>
        </view>
        <view class="margin200"></view>
        <longButton class='save' @click='saveName'>保存</longButton>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </div>
</template>

<script>
    import search from '../../components/my-components/SearchInput'
    import longButton from '../../components/my-components/LongButton.vue'
    export default {
        components: {
            longButton,
            search
        },
        data() {
            return {
                name: "张三"
            }
        },
        methods: {
            saveName() {
                this.pageLoading();
                setTimeout(() => {
                    this.closePageLoading();
                    this.Toast('保存姓名成功');
                    uni.navigateBack();
                }, 1000);
            }
        },
    }
</script>

<style lang="scss" scoped>
    .my-name {
        .margin200 {
            height: 50upx;
        }
        .bg {
            width: 100%;
            height: 110upx;
            background: #fff;
            margin-top: 20upx;
            padding: 20upx;
        }
    }
</style>