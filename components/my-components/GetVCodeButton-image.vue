<template>
    <view class='img-code'>
        <image class='imgCode' :src='domain.base_url+"/utility/captcha/get?type=forget&client-type=assistant&width=135&height=32&session-id="+sessionId+"&timestamp="+ time' @click='refresh'></image>
    </view>
</template>

<script>
    import domain from '../../api/domain.js'
    export default {
        props: {
            imageCode: {
                type: String,
                default: ''
            },
            refreshAgain: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                imgSrc: '',
                sessionId: "",
                domain: domain,
                time: new Date().getTime()
            }
        },
        watch: {
            refreshAgain() {
                this.refresh();
            }
        },
        methods: {
            refresh() {
                this.time= new Date().getTime(); 
            }
        },
        beforeMount() {
            this.refresh();
            this.sessionId = this.Cacher.getData('sessionId');
        },
    }
</script>

<style lang="scss" scoped>
    .img-code {
        display: flex;
        flex-wrap: nowrap;
    }
    .my-round-button {
        width: 150upx;
        box-sizing: border-box;
        height: 54upx;
        border-radius: 27upx;
        line-height: 52upx;
        text-align: center;
        font-size: 24upx;
        font-weight: 500;
        color: #fb6638;
        border: 1upx solid #fb6638;
    }
    .my-round-button.timing {
        color: #9da3ae;
        border: 1upx solid #9da3ae;
    }
    .imgCode {
        width: 150upx;
        height: 54upx;
        margin: auto 10upx auto 0;
    }
    .password-code {
        display: flex;
        flex-wrap: nowrap;
    }
</style>
