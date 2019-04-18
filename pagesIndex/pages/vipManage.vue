<template>
    <view class='vip-manage page'>
        <SearchInput @input='search' placeholder='搜索会员' inputStyle='background:#fff;margin:10px auto;' bgStyle='background:#f5f7fa;'></SearchInput>
        <Card @click='clickGood'></Card>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
    import TabCard from '../../components/my-components/Tabs.vue';
    import SearchInput from '../../components/my-components/SearchInput.vue';
    import Card from '../components/VipList.vue';
    let bar = ''
    export default {
        components: {
            TabCard,
            SearchInput,
            Card
        },
        data() {
            return {
                searching: false
            }
        },
        methods: {
            search(val) {
                clearTimeout(bar);
                bar = setTimeout(() => {
                    console.log(val);
                    this.pageLoading()
                }, 500)
            },
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