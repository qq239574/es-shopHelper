<template>
    <div class='select-type page'>
        <tabs @change='select' :infoId='index' :typeList='item' v-for='(item,index) in list' :key='index'></tabs>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </div>
</template>

<script>
    import tabs from '../../components/my-components/editBlock-SelectTabs.vue'
    let DataFrom = {};
    let cacheVal = '';
    let cacheFrom = '';
    let cacheSelected = {};
    export default {
        components: {
            tabs
        },
        data() {
            return {
                list: [{
                    name: '',
                    id: '',
                    selected: false,
                    children: [{
                        name: '',
                        id: '',
                        selected: false,
                    }]
                }],
            }
        },
        methods: {
            select(val) {
                cacheSelected[val.index] = val.list;
                let tmp = [];
                for (let k in cacheSelected) {
                    tmp=tmp.concat(cacheSelected[k])
                }
                DataFrom.needChange.value = tmp.map(item=>{
                    if(item.name===undefined){
                        item.name=item.title
                    }
                    return item
                }); 
                this.Cacher.setData('selectType', DataFrom);
            }
        },
        onLoad(option) {
            DataFrom = this.Cacher.getData(option.from);
            this.list = DataFrom.needChange.other.list;
        }
    }
</script>

<style lang="scss" scoped>

</style>