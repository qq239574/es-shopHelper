<template>
    <div class='my-name page'>
        <view class="bg">
            <search :value='name' @input='getInput' :placeholder='placeholder' @clear='clear'></search>
        </view>
        <view class="margin200"></view>
        <longButton class='save' :disable='disable' @click='saveName'>保存</longButton>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </div>
</template>

<script>
    import search from '../../components/my-components/SearchInput.vue'
    import longButton from '../../components/my-components/LongButton.vue'
    import {
        flatten
    } from '../../components/my-components/ajaxDataFormater.js'
    let DataFrom = {};
    let cache = '';
    export default {
        components: {
            longButton,
            search
        },
        computed: {
            disable() {
                return !this.name
            }
        },
        data() {
            return {
                name: "",
                placeholder: '请输入姓名'
            }
        },
        methods: {
            clear() {
                this.name = '';
            },
            getInput(val) {
                DataFrom[DataFrom.needChange.id] = val.value;
                this.name = val.value; 
            },
            saveName() {
                this.pageLoading();
                this.Request('changeUserInfo', flatten({
                    profiles: {
                        "contact_name": DataFrom.realName,
                        "contact_mobile": DataFrom.userTel
                    }
                })).then(res => {
                    this.closePageLoading();
                    if (res.error == 0) {
                        uni.navigateBack();
                    } else {
                        this.Toast(res.message)
                    }
                }).catch(res => {
                    this.closePageLoading();
                    this.Toast(res.message)
                })
            }
        },
        onLoad(option) {
            DataFrom = this.Cacher.getData(option.from);
            uni.setNavigationBarTitle({
                title: '修改' + DataFrom.needChange.name
            });
            this.placeholder = '请输入' + DataFrom.needChange.name;
            this.name = DataFrom[DataFrom.needChange.id]
        }
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