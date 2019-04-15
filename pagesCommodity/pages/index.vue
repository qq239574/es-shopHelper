<template>
    <div class='pagesCommodity-pages-index page'>
        <goodInfo></goodInfo>
        <goodInfo2></goodInfo2>
    </div>
</template>

<script>
    import goodInfo from '../components/editGood-Block1';
    import goodInfo2 from '../components/editGood-Block2.vue'
    import {
        mapState
    } from 'vuex'
    export default {
        components: {
            goodInfo,
            goodInfo2
        },
        computed: {
            ...mapState({
                good: 'goodDetail'
            })
        },
        beforeMount() {
            console.log(this.good)
        },
    }
</script>

<style lang="scss" scoped>

</style>