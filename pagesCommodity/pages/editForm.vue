<template>
    <div class='edit-form page'>
        <radioBlock :items='list' valueStyle='color:#fb6638' @change='change'></radioBlock>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </div>
</template>

<script>
    import radioBlock from '../../components/my-components/editBlock-RadioBlock'
    let DataFrom = {};
    let cacheVal = '';
    let cacheFrom = '';
    let cache = '修改';
    export default {
        components: {
            radioBlock
        },
        data() {
            return {
                list: [{
                    label: '不使用表单',
                    value: '',
                    subValue: ''
                }, {
                    label: '西门子洗碗机表单',
                    value: ' ',
                    subValue: ''
                }, {
                    label: '吐鲁番葡萄表单',
                    value: ' ',
                    subValue: ''
                }, ]
            }
        },
        methods: {
            initPage() {
                DataFrom = this.Cacher.getData('billDetail') || {};
            },
            change(val) {
                cacheVal = val;
                this.Cacher.setData('billDetail', {
                    from: 'editForm',
                    needChange: Object.assign(DataFrom.needChange, {
                        label: '商品表单',
                        value: val.label
                    })
                })
                console.log(DataFrom, val)
            }
        },
        onLoad(option) {
            this.initPage()
        },
        onShow() {
            this.initPage()
        }
    }
</script>

<style lang="scss" scoped>
    .setfreight {}
</style>