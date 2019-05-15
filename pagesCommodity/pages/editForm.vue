<template>
    <div class='edit-form page'>
        <radioBlock :items='list' :defaultIndex='defaultIndex' valueStyle='color:#fb6638' @clickItem='change'></radioBlock>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </div>
</template>

<script>
    import radioBlock from '../../components/my-components/editBlock-RadioBlock.vue'
    let DataFrom = {};
    let cacheVal = '';
    let cacheFrom = '';
    let cacheLabel=''
    let cache = '修改';
    export default {
        components: {
            radioBlock
        },
        data() {
            return {
                defaultIndex: 0,
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
                        label: cacheLabel,
                        value: val.label,
                        id: val.id
                    })
                })
            }
        },
        onLoad(option) {
           
            DataFrom = this.Cacher.getData(option.from) || {};  
            DataFrom.needChange.label&&uni.setNavigationBarTitle({
                title:DataFrom.needChange.label
            })
            this.list = DataFrom.needChange.other.formList.map((item, index) => {
                if (item.name == DataFrom.needChange.value) {
                    this.defaultIndex = index;
                }
                return {
                    label: item.name,
                    value: item.stock ? (item.stock + '库存') : ' ',
                    subValue: '',
                    id: item.id
                }
            })
            cacheLabel=DataFrom.needChange.label
            let val = this.list[this.defaultIndex];
            this.Cacher.setData('editForm', {
                needChange: Object.assign(DataFrom.needChange, {
                    label: cacheLabel,
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