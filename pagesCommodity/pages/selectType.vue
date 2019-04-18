<template>
    <div class='select-type page'>
        <tabs></tabs>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </div>
</template>

<script>
    import tabs from '../../components/my-components/editBlock-SelectTabs'
    export default {
        components: {
            tabs
        }
    }
</script>

<style lang="scss" scoped>

</style>