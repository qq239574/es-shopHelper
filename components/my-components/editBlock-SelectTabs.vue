<template>
    <view class='select-tabs'>
        <view class="grace-title">
            <view>搜索历史</view>
            <view class="grace-more" @click='clearKey'>
                <radio class='allSelect' value="1" style='display:inline-block;' :checked='true' color='#fb6638' v-if='checked'></radio>
                <radio class='allSelect' value="1" style='display:inline-block;' :checked='false' color='#fb6638' v-else></radio>选择全部</view>
        </view>
        <view class="grace-search-taps">
            <view v-for="(item, index) in searchKeys" :class='selected.indexOf(item)>-1?"selected":""' :key="index" :data-key="item" @tap="setKey(item)">{{item}}</view>
        </view>
    </view>
</template>

<script>
    export default {
        props: {
            searchKeys: {
                type: Array,
                default: [
                    'graceUI', '测试', '关键字', '类型'
                ],
            },
            other: {
                type: [Object, Number, String, Array, Boolean],
                default: ''
            }
        },
        data() {
            return {
                selected: [],
                checked: false
            }
        },
        watch: {
            searchKeys() {
                this.checked = this.selected.length == this.searchKeys.length;
            }
        },
        beforeMount() {
             this.checked = this.selected.length == this.searchKeys.length;
        },
        methods: {
            clearKey(val) {
                this.checked = !this.checked;
                if (this.checked) {
                    this.selected = [...this.searchKeys];
                } else {
                    this.selected = [];
                }
                this.$emit('change', this.selected);
            },
            setKey(val) {
                let index = this.selected.indexOf(val);
                if (index > -1) {
                    this.selected.splice(index, 1)
                } else {
                    this.selected.push(val)
                }
                this.checked = this.selected.length == this.searchKeys.length;
                this.$emit('change', this.selected)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .select-tabs {
        width: 710upx;
        margin: 20upx auto 0;
        background: #fff;
        padding: 20upx 20upx 30upx;
        border-radius: 7upx;
        .grace-title {
            view,
            text {
                line-height: 40upx;
            }
        }
        .grace-more {
            position: relative;
            .allSelect {
                transform: scale(.6);
                width: 30upx;
                height: 30upx;
                margin-right: 10upx;
            }
        }
        .grace-search-taps {
            border: none;
            height: 52upx;
            line-height: 52upx;
            padding: 0 26upx;
            view {
                border: none;
                font-size: 26upx;
                background: #f6f6f6;
                height: 52upx;
                line-height: 50upx;
            }
            .selected {
                background: #fff2f2;
                border: 1upx solid #fb6e42;
                color: #fb6e42;
            }
        }
    }
</style>