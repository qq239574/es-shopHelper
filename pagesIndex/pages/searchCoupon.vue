
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
                placeholder: '搜索优惠券',
            }
        },
        methods: {
            search(val) {
                this.Cacher.setData('searchCoupon', {
                    from: 'searchCoupon',
                    value: val, 
                })
                uni.navigateBack();
            }
        },
        onLoad(option) {
            DataFrom = this.Cacher.getData(option.from);
        }
    }
</script>

<style lang="scss" scoped>
    .search-shop {
        background: #fff;
    }
</style>