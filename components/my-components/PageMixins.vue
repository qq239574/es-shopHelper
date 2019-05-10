 

<script>
    export default {
        data() {
            return {
                showTabbar: true, //是否显示tabbar
            }
        },
        watch: {
            showTabbar() {
                if (this.showTabbar) {
                    uni.showTabBar({
                        animation: true
                    })
                } else {
                    uni.hideTabBar({
                        animation: true
                    })
                }
            }
        },
        onLoad() {
            console.log(' pafssss')
        }
    }
</script>

<style lang="scss" scoped>

</style>