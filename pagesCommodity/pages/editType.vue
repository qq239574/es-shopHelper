<template>
    <div class='edit-status page'>
        <radioBlock :items='list' valueStyle='color:#fb6638' :defaultIndex='defaultIndex' @clickItem='change'></radioBlock>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </div>
</template>

<script>
    import radioBlock from '../../components/my-components/editBlock-RadioBlock.vue'
    let DataFrom = {};
    let cacheVal = '';
    let cacheFrom = '';
    let cache = ' ';
    export default {
        components: {
            radioBlock,
        },
        data() {
            return {
                defaultIndex: 0,
                list: [{
                    label: '实体商品',
                    value: ' ',
                    subValue: '',
                    id: 1
                }, {
                    label: '虚拟商品',
                    value: ' ',
                    subValue: '',
                    id: 2
                }, {
                    label: '电子卡密',
                    value: ' ',
                    subValue: '',
                    id: 3
                }]
            }
        },
        methods: {
            initPage() { 
                this.list.forEach((item, index) => {
                    if (item.label == DataFrom.needChange.value) {
                        this.defaultIndex = index;
                        DataFrom.needChange = {
                            label: '商品类型',
                            value: item.label,
                            from: 'editType',
                            other: {
                                label: '状态',
                                value: item.label,
                                id: item.id
                            }
                        }
                        this.Cacher.setData('editType', DataFrom)
                    }
                })
            },
            change(val) {
                cacheVal = val;
                console.log(val)
                this.Cacher.setData('editType', {
                    needChange: {
                        label: '商品类型',
                        value: val.label,
                        other: val,
                        id:val.id
                    }
                })
                cache = val.value;
            }
        },
        onLoad(option) {
            DataFrom = this.Cacher.getData(option.from) || {}; 
        },
        onShow() {
            this.initPage()
        }
    }
</script>

<style lang="scss" scoped>
    .edit-status {
        .bg {
            position: fixed;
            background: rgba(0, 0, 0, .5);
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            .picker {
                width: 100%;
                position: absolute;
                bottom: 0;
                left: 0;
            }
        }
    }
</style>