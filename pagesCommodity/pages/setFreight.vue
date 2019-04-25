<template>
    <div class='setfreight page'>
        <radioBlock :items='list' valueStyle='color:#fb6638' @clickItem='change'></radioBlock>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </div>
</template>

<script>
    import radioBlock from '../../components/my-components/editBlock-RadioBlock'
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
                list: [{
                    label: '统一运费（元）',
                    value: '修改',
                    subValue: 6.2
                }, {
                    label: '海鲜运费模板',
                    value: ' ',
                    subValue: 11
                }, {
                    label: '蔬菜水果运费模板',
                    value: ' ',
                    subValue: 12
                }, ]
            }
        },
        methods: {
            initPage() {
                DataGo = this.Cacher.getData('setTotalFreight');
                this.list[0].subValue = DataGo.value.subValue;
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
            this.initPage();
        },
        onShow() {
            this.initPage();
        }
    }
</script>

<style lang="scss" scoped>
    .setfreight {}
</style>