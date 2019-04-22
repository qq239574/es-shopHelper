

<script>
    let pageLoadingBar = '';
    let loadMore = '';
    import request from '../../api/index.js'
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
                DataFrom: '', //页面传参
                ShowLoadMore: false,
                LoadingType: 1,
                LoadingText: ['加载更多', 'loading ......', '已加载全部']
            };
        },
        methods: {
            Request(name,data) {
                return request(name,data);
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
            console.log('refreshing');
            this.closePageLoading();
            setTimeout(()=> {
                uni.stopPullDownRefresh();
            }, 1000);
        },
        onReachBottom() {
            this.showReachBottom = true;
        },
        created() {
            this.pageLoading();
        },
        onHide() {
            this.closePageLoading();
            this.Dialog.close();
        },
        onLoad(option) {
            console.log(option);
            if (!option.from) { //如果没有from就说明是刚进入小程序
            } else {
                console.log('DataFrom:  ', this.Cacher.getData(option.from)); //获取页面传参
            }
        },
        onReachBottom() {
            console.log('onReachBottom')
            this.ShowLoadMore = true;
            setTimeout(() => {
                this.ShowLoadMore = false;
            }, 2000)
        }
    }
</script>

<style lang="scss" scoped>

</style>