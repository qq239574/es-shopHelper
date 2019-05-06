<template>
    <div class='setfreight page'>
        <radioBlock :items='list' :defaultIndex='defaultIndex' valueStyle='color:#fb6638' @clickItem='change'></radioBlock>
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
                    subValue: 0
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
                        value: this.list[0].subValue
                    }
                })
            },
            change(val) {
                cacheVal = val;
                this.Cacher.setData(pageId, {
                    needChange: {
                        label: '快递运费',
                        value: val.subValue
                    }
                })
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
            this.Cacher.setData(pageId, {
                from: option.from || '',
                go: 'setTotalFreight'
            })
            this.list = [{
                label: '统一运费（元）',
                value: '修改',
                subValue: 0
            }].concat(DataFrom.needChange.other.dispatch_list.map((item, index) => {
                if (item.is_default * 1) {
                    this.defaultIndex = index + 1;
                }
                return {
                    label: item.name,
                    id: item.id,
                    value:' ',
                    subValue: ' '
                }
            }))
        },
        onShow() {
            this.initPage();
        }
    }
</script>

<style lang="scss" scoped>
    .setfreight {}
</style>