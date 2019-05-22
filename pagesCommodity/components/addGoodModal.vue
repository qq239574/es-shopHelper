<template>
    <div class='good-modal' @click='clickModel'>
        <!-- 规格 -->
        <view class="row parentType">
            <view class="label">
                <image class='del' @click='clickMinus("spec",info)' src='/static/img/global/del.svg'></image>
                规格名称
            </view>
            <textarea class="name" :disabled='info.disabled' placeholder-style='color:#9ea3ae' maxlength='20' auto-height :value='cache.title' @input='inputSpecName' placeholder='输入规格名称'></textarea>
        </view>
        <!-- 子规格 -->
        <view class="row childrenType" v-for='(item,index) in cache.items' :key='index'>
            <view class="label">
                <image class='del' @click='clickMinus("item",item)' src='/static/img/global/del.svg'></image>
                规格名称
            </view>
            <textarea class="name" maxlength='20' :disabled='info.disabled' placeholder-style='color:#9ea3ae' auto-height :data-set='item.id' :value='item.title' @input='inputItemName' placeholder='输入规格名称'></textarea>
        </view>
        <block v-if='!info.disabled'>
            <view class='row add' @click='clickAdd' v-if='cache.items.length<10'>
                +添加子规格
            </view>
            <view class='row add' style='color:#3d404d' @click='clickAdd' v-else>
                +添加子规格
            </view>
        </block>
    </div>
</template>

<script>
    let itemIndex = 0;
    export default {
        props: {
            info: {
                type: Object,
                default: {
                    disabled: false,//活动期间不可编辑
                    id: 0,
                    title: '',
                    items: [] //[{index,title,id}]
                }
            },
        },
        data() {
            return {
                cache: {}
            }
        },
        methods: {
            clickModel(){
                this.info.disabled&&this.$parent.Toast('活动商品不可编辑')
            },
            inputSpecName(val) {
                this.cache.title = val.detail.value;
                this.$emit('input', this.cache)
            },
            inputItemName(val) {
                let id = val.currentTarget.dataset.set;
                this.cache.items = this.cache.items.map(item => {
                    item.id == id && (item.title = val.detail.value);
                    return item;
                })
                this.$emit('input', this.cache)
            },
            clickAdd() {
                itemIndex++;
                if (this.cache.items.length < 10) {
                    this.cache.items.push({
                        id: this.info.id + '-item' + itemIndex,
                        title: ''
                    })
                    this.$emit('input', this.cache)
                } else {
                    this.Toast('每个规格的子规格不能超过10个')
                }
            },
            clickMinus(type, item) {
                if (type == 'spec') {
                    this.$emit('delete', item)
                } else {
                    this.$parent.Dialog.confirm({
                        title: '',
                        message: '您确认删除此规格吗？'
                    }).then(() => {
                        this.cache.items = this.cache.items.filter(val => {
                            return val.id != item.id
                        })
                        this.$emit('input', this.cache)
                    });
                }
            }
        },
        watch: {
            info() {
                this.cache = Object.assign({}, this.info);
            }
        },
        mounted() {
            this.closePageLoading();
            this.cache = Object.assign({}, this.info);
        }
    }
</script>

<style lang="scss" scoped>
    .good-modal {
        width: 710upx;
        background: #fff;
        height: fit-content;
        .row {
            width: 100%;
            height: fit-content;
            min-height: 96upx;
            display: flex;
            flex-wrap: nowrap;
            box-sizing: border-box;
            line-height: 96upx;
            textarea {
                text-align: right;
                min-height: 96upx;
                line-height: 36upx;
                font-size: 28upx;
                box-sizing: border-box;
                height: fit-content;
                padding: 33upx 20upx 30upx 0;
                white-space: nowrap;
                color: #3d404d;
            }
            .label {
                padding: 0 36upx 0 60upx;
                position: relative;
                width: fit-content;
                white-space: nowrap;
                line-height: 96upx;
                height: 96upx;
                font-size: 28upx;
                color: #6f7685;
                image {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    left: 20upx;
                }
            }
            .del {
                width: 28upx;
                height: 28upx;
            }
        }
        .parentType {
            border-bottom: 1upx solid #eee;
        }
        .childrenType {
            padding: 0 0 0 46upx;
            position: relative;
            &:after {
                content: '';
                position: absolute;
                width: 664upx;
                bottom: 0;
                right: 0;
                height: 0;
                border-bottom: 1upx solid #eee;
            }
            .label {
                padding: 0 36upx 0 46upx;
                position: relative;
                width: fit-content;
                white-space: nowrap;
                line-height: 96upx;
                height: 96upx;
                font-size: 28upx;
                color: #6f7685;
                image {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    left: 0;
                }
            }
        }
        .add {
            padding: 0 46upx;
            font-size: 28upx;
            font-weight: 600;
            color: #fb6638; 
        }
    }
</style>