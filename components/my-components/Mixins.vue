

<script>
    let pageLoadingBar = '';
    let loadMore = ''; 
    import request from './api/index.js'
    export default {
        data() {
            return {
                showReachBottom: false
            };
        },
        methods: {
            pageLoading() {
                clearTimeout(pageLoadingBar);
                uni.showLoading({
                    title: '加载中'
                });
                pageLoadingBar = setTimeout(() => {
                    uni.hideLoading({
                        title: '加载中'
                    });
                }, 3000)
            },
            closePageLoading() {
                clearTimeout(pageLoadingBar);
                uni.hideLoading();
            },
            loadMore() {
                clearTimeout(loadMore);
                this.showReachBottom = true;
                loadMore = setTimeout(() => {
                    this.showReachBottom = false;
                }, 3000)
            },
            closeLoadMore() {
                clearTimeout(loadMore);
                this.showReachBottom = false;
            }
        },
        onPullDownRefresh() {
            this.pageLoading();
        },
        onReachBottom() {
            this.showReachBottom = true;
        },
        created() {
            this.pageLoading();
        },
        onHide() {
            this.closePageLoading();
        }
    }
</script>

<style lang="scss" scoped>

</style>