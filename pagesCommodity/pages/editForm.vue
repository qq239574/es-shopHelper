<template>
    <div class='edit-form page'>
        <radioBlock :items='list' valueStyle='color:#fb6638' @clickItem='change'></radioBlock>
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
                    label: '',
                    value: '',
                    subValue: ''
                }]
            }
        },
        methods: {
            change(val) {
                cacheVal = val;
                this.Cacher.setData('editForm', {
                    needChange: Object.assign(DataFrom.needChange, {
                        label: '商品表单',
                        value: val.label,
                        id: val.id
                    })
                }) 
            }
        },
        onLoad(option) {
            DataFrom = this.Cacher.getData(option.from) || {};
            this.list = DataFrom.needChange.other.formList.map(item => {
                return {
                    label: item.name,
                    value: ' ',
                    subValue: '',
                    id: item.id
                }
            })
            let val = this.list[0];
            this.Cacher.setData('editForm', {
                needChange: Object.assign(DataFrom.needChange, {
                    label: '商品表单',
                    value: val.label,
                    id: val.id
                })
            })
        },
    }
</script>

<style lang="scss" scoped>
    .setfreight {}
</style>