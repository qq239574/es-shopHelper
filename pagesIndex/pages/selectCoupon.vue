<template>
    <view class='select-coupon page'>
        <search :disabled='true' :value='searchKey' placeholder='搜索优惠券' @click='clickSearch'></search>
        <view class="margin30"></view>
        <block v-for="(item,index) in list" :key='index'>
            <couponItem :info='item' @change='select'></couponItem>
        </block>
        <nodata type='noresult' v-if='!searching&&!list.length'></nodata>
        <blockFoot :num='selectnum' @click='clickFoot'></blockFoot>
        <!-- 浮层 -->
        <floatLayer :toggle='toggle'>
            <view class='item-box' @click.stop='stop'>
                <block v-for='(item,index) in selected' :key='index'>
                    <pickerItem @change='change' :info='item'></pickerItem>
                </block>
            </view>
        </floatLayer>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
    import search from '../../components/my-components/SearchInput'
    import couponItem from '../components/Coupon-Item2.vue'
    import blockFoot from '../components/selectCoupon--Foot.vue'
    import floatLayer from '../components/SelectCoupon-Picker.vue'
    import pickerItem from '../components/SelectCoupon-PickerItem.vue'
    import nodata from '../../components/my-components/nodata.vue'
    let cachelist = [];
    let DataFrom = {};
    let DataGo = {};
    export default {
        components: {
            search,
            couponItem,
            blockFoot,
            floatLayer,
            pickerItem,
            nodata
        },
        data() {
            return {
                toggle: true,
                list: [{
                    name: '',
                    price: 0,
                    info: '',
                    num: 0,
                    id: 0
                }],
                selected: [],
                selectnum: 0,
                searchKey: '',
                searching: false
            }
        },
        methods: {
            stop() {},
            clickSearch() {
                DataGo.go = 'searchCoupon'
                this.Cacher.setData('selectCoupon', {
                    from: 'selectCoupon',
                })
                uni.navigateTo({
                    url: './searchCoupon?from=selectCoupon'
                })
            },
            initPage() {
                this.pageLoading();
                if (DataGo.go) {
                    DataGo = this.Cacher.getData(DataGo.go) || {
                        go: 'searchCoupon',
                        value: ''
                    }
                } else {
                    DataGo = {
                        go: 'searchCoupon',
                        value: ''
                    }
                }
                this.searchKey = DataGo.value;
                this.searching = true;
                this.Request('getCouponList', {
                    keywords: DataGo.value
                }).then(res => {
                    this.searching = false;
                    this.closePageLoading();
                    this.list = res.list.map(item => {
                        return {
                            name: item.title,
                            price: item.amount,
                            info: '满' + item.enough + '可用',
                            num: 0,
                            id: item.id
                        }
                    })
                })
            },
            change(val) {
                val.num = val.newNumber;
                this.calc(val)
            },
            calc(item) {
                this.list = this.list.map((val, key) => {
                    if (item.id == val.id) {
                        return item
                    } else {
                        return val;
                    }
                });
                cachelist = this.list.filter(item => {
                    return item.num > 0
                });
                let tmp = 0;
                cachelist.forEach((item, index) => {
                    tmp += item.num
                });
                this.selectnum = tmp;
                this.selected = cachelist;
            },
            select(item) {
                this.calc(item)
            },
            clickFoot(event) {
                if (event.type == 'check') {
                    this.toggle = !this.toggle;
                } else {
                    this.pageLoading();
                    let obj = {};
                    let len = this.selected.length;
                    for (let i = 0; i < len; i++) {
                        obj['coupon_id[' + i + ']'] = this.selected[i].id;
                    }
                    obj['member_id[0]'] = DataFrom.info.id
                    for (let i = 0; i < len; i++) {
                        obj['coupon_count[' + i + ']'] = this.selected[i].num;
                    }
                    if (len) {
                        this.Request('sendCoupon', obj).then(res => {
                            this.closePageLoading();
                            uni.navigateBack();
                        })
                    } else {
                        this.closePageLoading();
                        this.Toast('请选择优惠券')
                    }
                }
            }
        },
        onLoad(option) {
            this.pageLoading();
            this.list = [];
            DataFrom = this.Cacher.getData(option.from);
        },
        onShow() {
            this.initPage();
        }
    }
</script>

<style lang="scss" scoped>
    .select-coupon {
        background: #fff;
        .margin30 {
            height: 30upx;
        }
        .item-box {
            height: 100%;
            width: 100%;
            overflow: auto;
        }
    }
</style>