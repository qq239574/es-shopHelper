

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
                Cacher: cacher,
                Toast,
                Dialog,
                DataFrom:'',//页面传参
            };
        },
        methods: {
            Request() {
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
        },
        onLoad(option) {
            console.log(option);
            if (!option.from) { //如果没有from就说明是刚进入小程序
            } else {
                this.DataFrom=this.Cacher.getData(option.from);
                console.log('DataFrom:  ',this.Cacher.getData(option.from)); //获取页面传参
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>