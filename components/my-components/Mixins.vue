

<script>
    let pageLoadingBar = '';
    let loadMore = '';
    import request from './api/index.js'
    import * as cacher from '../../store/cache.js'
    import Toast from '../../wxcomponents/vant-weapp/toast/toast'
    import Dialog from '../../wxcomponents/vant-weapp/dialog/dialog';
    export default {
        components: {},
        data() {
            return {
                showReachBottom: false,
                pageIsLoading: false,
                Cacher:cacher,
                Toast,
                Dialog
            };
        },
        methods: {
            Request(){
                return request;
            },
            pageLoading() {
                clearTimeout(pageLoadingBar);
                uni.showLoading({
                    title: '加载中'
                });
                this.pageIsLoading = true;
                pageLoadingBar = setTimeout(() => {
                    uni.hideLoading({
                        title: '加载中'
                    });
                    this.pageIsLoading = false;
                }, 2000)
            },
            closePageLoading() {
                clearTimeout(pageLoadingBar);
                this.pageIsLoading = false;
                uni.hideLoading();
            },
            loadMore() {
                clearTimeout(loadMore);
                this.showReachBottom = true;
                loadMore = setTimeout(() => {
                    this.showReachBottom = false;
                }, 2000)
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