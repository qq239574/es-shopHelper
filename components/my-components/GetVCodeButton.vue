<template>
    <View class='my-round-button' :class='timing?"timing":""' @click='clickBuntton'>
        {{timing?(timer+'s'):'获取验证码'}}
    </View>
</template>

<script>
    export default {
        data() {
            return {
                timer: 60,
                timing: false,
                bar: ''
            }
        },
        methods: {
            clickBuntton() {
                if (!this.timing) {
                    this.$emit('click');
                    this.timing = true;
                    this.bar = setInterval(() => {
                        if (this.timer > 1) {
                            this.timer--;
                        } else {
                            this.refresh();
                        }
                    }, 1000);
                }
            },
            refresh() {
                this.timer = 60;
                this.timing = false;
                clearInterval(this.bar);
            }
        },
        beforeMount() {
            this.refresh();
        },
    }
</script>

<style lang="scss" scoped>
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
</style>
