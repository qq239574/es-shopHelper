<template>
    <div class='select-type page'>
        <tabs @change='select' :searchKeys='list'></tabs>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </div>
</template>

<script>
    import tabs from '../../components/my-components/editBlock-SelectTabs'
    let DataFrom = {};
    let cacheVal = '';
    let cacheFrom = '';
    export default {
        components: {
            tabs
        },
        data() {
            return {
                list: [{
                    name: 'name1',
                    id: '1'
                }, {
                    name: 'name2',
                    id: '2'
                }, {
                    name: 'name3',
                    id: '3'
                }, {
                    name: 'name4',
                    id: '4'
                }]
            }
        },
        methods: {
            select(val) {  
                DataFrom.needChange.value = val;
                this.Cacher.setData('selectType', DataFrom);
            }
        },
        onLoad(option) {
            DataFrom = this.Cacher.getData(option.from); 
        }
    }
</script>

<style lang="scss" scoped>

</style>