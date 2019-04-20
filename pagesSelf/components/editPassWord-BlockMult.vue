<template>
    <view class='multi-block grace-form'>
        <view class="block">
            <inputItem label='原密码' @input='getInput'></inputItem>
            <inputItem label='新密码' @input='getInput'></inputItem>
            <inputItem label='确认密码' @input='getInput'></inputItem>
        </view>
    </view>
</template>

<script>
    import inputItem from '../../components/my-components/editBlock-InputItem.vue'
    let oldPw = '',
        newPw = '',
        surePw = '';
    export default {
        components: {
            inputItem,
        },
        methods: {
            getInput(val) {
                this.$emit('input', val)
            }
        },
    }
</script>

<style lang="scss" scoped>
    .multi-block {
        width: 100%;
        height: fit-content;
        margin: 20upx auto ;

        .block {
            border-radius: 16upx;
            width: 710upx;
            margin: auto;
            background: #fff;
            overflow: hidden;
        }
    }
</style>