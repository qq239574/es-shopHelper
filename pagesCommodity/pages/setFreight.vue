<template>
    <div class='setfreight page'>
        <radioBlock :items='list' :defaultIndex='defaultIndex' valueStyle='color:#fb6638; margin-left: 0;' fontStyle='font-size: 28upx;' @clickItem='change'></radioBlock>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </div>
</template>

<script>
    import radioBlock from '../../components/my-components/editBlock-RadioBlock.vue'
    let DataFrom = {};
    let DataGo = {};
    let cacheVal = '';
    let cacheFrom = '';
    let cache = '修改';
    let pageId = 'setFreight'
    export default {
        components: {
            radioBlock
        },
        data() {
            return {
                defaultIndex: 0,
                list: [{
                    label: '统一运费（元）',
                    value: '修改',
                    subValue: 0,
                    id: -1,
                }, ]
            }
        },
        methods: {
            initPage() {
                DataGo = this.Cacher.getData('setTotalFreight');
                if (DataGo.needChange) {
                    this.list[0].subValue = DataGo.needChange.value;
                }
                this.Cacher.setData(pageId, {
                    needChange: {
                        label: '快递运费',
                        value: this.list[0].subValue,
                        info: {
                            ...this.list[this.defaultIndex]
                        }
                    }
                })
            },
            change(val) {
                cacheVal = val;
                this.Cacher.setData(pageId, {
                    needChange: {
                        label: '快递运费',
                        value: val.subValue,
                        info: { ...val
                        }
                    }
                })
                this.defaultIndex = val.index;
                if (val.value == '修改' && cache != '修改') {} else if (val.value == '修改' && cache == '修改') {
                    uni.navigateTo({
                        url: './setTotalFreight?from=setFreight'
                    })
                } else {}
                cache = val.value;
            }
        },
        onLoad(option) {
            DataFrom = this.Cacher.getData(option.from) || {};
            this.Cacher.setData(pageId, { //清空统一运费的设置页的记录
                from: option.from || '',
                go: 'setTotalFreight'
            })
            let dispatch_id=DataFrom.needChange.other.dispatch_id;
            this.list = [{
                label: '统一运费（元）',
                value: '修改',
                subValue: DataFrom.needChange.other.value,
                id: -1,
                index: 0
            }].concat(DataFrom.needChange.other.dispatch_list.map((item, index) => {
                if (item.id==dispatch_id) { //计算默认的模板
                    this.defaultIndex = index + 1;
                }
                return {
                    label: item.name,
                    id: item.id,
                    value: ' ',
                    subValue: ' ',
                    index: index + 1
                }
            })); 
        },
        onShow() {
            this.initPage();
        }
    }
</script>

<style lang="scss" scoped>
    .setfreight {}
</style>