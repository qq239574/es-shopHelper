
<template>
    <div class='search-shop page'>
        <search @search='search'></search>
    </div>
</template>

<script>
    import search from '../../components/my-components/SearchInputWithButton'
    export default {
        components: {
            search
        },
        methods: {
            search(val) {
                this.Cacher.setData('searchShop', {
                    from: 'searchShop',
                    value:val
                })
                uni.navigateBack();
            }
        },
    }
</script>

<style lang="scss" scoped>
    .search-shop {
        background: #fff;
    }
</style>