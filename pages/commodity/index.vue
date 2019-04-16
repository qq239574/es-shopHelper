<template>
    <div class='pages-commodity-index page'>
        <SearchInput @input='search'></SearchInput>
        <TabCard :categories='categories'></TabCard>
        <Card @click='clickGood'></Card>
    </div>
</template>

<script>
    import TabCard from '../../components/my-components/Tabs.vue';
    import SearchInput from '../../components/my-components/SearchInput.vue';
    import Card from './index/goodsList.vue';
    import {
        mapMutations
    } from 'vuex'
    export default {
        components: {
            TabCard,
            SearchInput,
            Card
        },
        data() {
            return {
                categories: [{
                        cateid: 0,
                        name: "出售中"
                    },
                    {
                        cateid: 1,
                        name: "已售罄"
                    },
                    {
                        cateid: 2,
                        name: "仓库中"
                    },
                    {
                        cateid: 3,
                        name: "回收站"
                    }
                ]
            }
        },
        methods: {
            ...mapMutations({
                setGood:"setGoodDetail"
            }),
            search(val) {},
            clickGood(item) {
                if (item.type == 'menu-item') {
                    if (item.name == '编辑') {
                        this.setGood(item);
                        uni.navigateTo({
                            url: '../../pagesCommodity/pages/multiSpecifications'
                        })
                    }
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>