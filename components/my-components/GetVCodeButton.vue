<template>
    <View class='my-round-button van-hairline' :class='start?"timing":""' @click='clickBuntton'>
        {{start?(timer+'s后重新发送'):'获取验证码'}}
    </View>
</template>

<script>
    export default {
        props: {
            start: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                timer: 60,
                bar: ''
            }
        },
        watch: {
            start() {
                if (this.start) {
                    this.bar = setInterval(() => {
                        if (this.timer > 1) {
                            this.timer--;
                        } else {
                            this.refresh();
                        }
                    }, 1000);
                } else {
                    this.refresh();
                }
            }
        },
        methods: {
            clickBuntton() {
                if (!this.start) {
                    this.$emit('click', false);
                }  
            },
            refresh() {
                this.timer = 60;
                clearInterval(this.bar);
                this.$emit('refresh');
            }
        },
        beforeMount() {
            this.refresh();
        },
    }
</script>

<style lang="scss" scoped>
    .my-round-button {
        width:fit-content;
        min-width: 150upx;
        height: 54upx;
        border-radius: 27upx;
        line-height: 54upx;
        text-align: center;
        font-size: 24upx;
        font-weight: 500;
        color: #fb6638;
        overflow: visible;
        padding: 0 20upx;
        &:after {
            border: 1upx solid #fb6638;
            border-radius: 54upx;
            bottom:-47%;
        }
    }
    .my-round-button.timing {
        color: #9da3ae;
         &:after {
            border: 1upx solid #9da3ae;
            border-radius: 54upx;
            bottom:-47%;
        }
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
