
<template>
    <div class='search-shop page'>
        <search @search='search' :placeholder='placeholder'></search>
    </div>
</template>

<script>
    let DataFrom = {};
    import search from '../../components/my-components/SearchInputWithButton'
    export default {
        components: {
            search
        },
        data() {
            return {
                placeholder: '搜索店铺',
                
            }
        },
        methods: {
            search(val) {
                this.Cacher.setData('searchShop', {
                    from: 'searchShop',
                    value: val,
                    ...DataFrom
                })
                uni.navigateBack();
            }
        },
        onLoad(option) {
            if (option.from) {
                DataFrom = this.Cacher.getData(option.from);
                this.placeholder = DataFrom.placeholder;
                uni.setNavigationBarTitle({
                    title: DataFrom.title
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .search-shop {
        background: #fff;
    }
</style>