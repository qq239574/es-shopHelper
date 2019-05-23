<template>
    <view class='filte-group'>
        <radio-group class='group'>
            <view class='grace-items' v-for="(item, index) in items" :key="item.value" @click='clickItem(index)'>
                <view class="grace-label">{{item.label}}</view>
                <view class='radio-box'>
                    <radio :value="item.value" :checked="index === current" color='#fb6638' />
                </view>
            </view>
        </radio-group>
    </view>
</template>

<script>
    export default {
        props: {
           
            items: {
                type: Array,
                default: []
            },
            default: { //清除选择
                type: Number,
                default: -1
            }
        },
        data() {
            return {
                current: 0
            }
        },
        watch: {
            default() {
                
                this.current=this.default;
            }
        },
        methods: {
            clickItem(index) {
                this.current = index;
                this.$emit('click', this.items[index])
            }
        },
    }
</script>

<style lang="scss" scoped>
    .filte-group {
        background: #fff;
        width: 100%;
        margin: 0 0 20upx 0;
        .grace-items {
            display: flex;
            width: 710upx;
            border-bottom: 1upx solid #eee;
            margin: auto;
            height: 96upx;
            background: #fff;
            flex-wrap: nowrap;
            justify-content: space-between;
            box-sizing: border-box;
            view {
                line-height: 100upx;
                width: fit-content;
                radio {
                    transform: scale(.8)
                }
            }
            .grace-label {
                color: #6f7685;
            }
        }
    }
</style>