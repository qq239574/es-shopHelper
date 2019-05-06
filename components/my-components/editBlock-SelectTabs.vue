<template>
    <view class='select-tabs'>
        <view class="grace-title">
            <view>{{typeList.name}}</view>
            <view class="grace-more" @click='clearKey'>
                <radio class='allSelect' value="1" style='display:inline-block;' :checked='true' color='#fb6638' v-if='checked'></radio>
                <radio class='allSelect' value="1" style='display:inline-block;' :checked='false' color='#fb6638' v-else></radio>选择全部</view>
        </view>
        <view class="grace-search-taps" v-if='typeList.children.length'>
            <view v-for="(item, index) in typeList.children" :class='selected.indexOf(item)>-1?"selected":""' :key="index" :data-key="item.name" @tap="setKey(item)">{{item.title}}</view>
        </view>
    </view>
</template>

<script>
    export default {
        props: {
            typeList: {
                type: Object,
                default: {
                    name: '',
                    id: '',
                    selected: false,
                    children: [{
                        name: '',
                        id: '',
                        selected: false
                    }]
                }
            },
            infoId: {
                type: Number,
                default: 0
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
        beforeMount() {
            this.getTypeList();
        },
        methods: {
            getTypeList() {
                if (this.typeList.children && this.typeList.children.length) {
                    this.typeList.children.forEach(val => {
                        val.selected ? this.selected.push(val) : ''
                    });
                    this.checked = (this.typeList.children.length == this.selected.length);
                } else {
                    this.checked == !!this.typeList.selected;
                } 
                if (this.selected.length) {
                    this.$emit('change', {
                        index: this.infoId,
                        list: [{
                            name: this.typeList.name,
                            id: this.typeList.id
                        }, ...this.selected]
                    })
                } else {
                    this.$emit('change', {
                        index: this.infoId,
                        list: []
                    })
                }
            },
            clearKey(val) { //全选或全清理
                this.checked = !this.checked;
                if (this.checked) {
                    this.selected = [...this.typeList.children];
                } else {
                    this.selected = [];
                }
                this.$emit('change', {
                    index: this.infoId,
                    list: this.checked ? [{
                        name: this.typeList.name,
                        id: this.typeList.id
                    }, ...this.selected] : []
                });
            },
            setKey(val) {
                let index = this.selected.indexOf(val);
                if (index > -1) {
                    this.selected.splice(index, 1);
                } else {
                    this.selected.push(val);
                }
                this.checked = this.selected.length == this.typeList.children.length;
                if (this.selected.length) {
                    this.$emit('change', {
                        index: this.infoId,
                        list: [{
                            name: this.typeList.name,
                            id: this.typeList.id
                        }, ...this.selected]
                    })
                } else {
                    this.$emit('change', {
                        index: this.infoId,
                        list: []
                    })
                }
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
            min-height: 52upx;
            line-height: 50upx;
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