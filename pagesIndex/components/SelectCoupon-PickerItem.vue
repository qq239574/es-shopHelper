<template>
    <view class='picker-item'>
        <view class="content">{{info.name}}</view>
        <view class='number'>
            <numberBox @change='change' :value='info.num'></numberBox>
        </view>
    </view>
</template>

<script>
    import numberBox from '../../components/my-components/Number-Box'
    export default {
        components: {
            numberBox
        },
        props: {
            info: {
                type: Object,
                default: {
                    name: '标题',
                    num: 0
                }
            }
        },
        methods: {
            change(val) {
                this.$emit('change', Object.assign({ ...this.info
                }, {
                    newNumber: val[0]
                }))
            }
        },
    }
</script>

<style lang="scss" scoped>
    .picker-item {
        width: 100%;
        height: 120upx;
        box-sizing: border-box;
        border-bottom: 1upx solid #eee;
        padding: 0 0 0 20upx;
        font-size: 30upx;
        font-weight: 500;
        display: flex;
        justify-content: space-between;
        .content {
            line-height: 120upx;
        }
        .number {
            padding: 30upx 20upx 0 0;
        }
    }
</style>