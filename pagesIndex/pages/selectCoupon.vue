<template>
    <view class='select-coupon page'>
        <search placeholder='搜索优惠券'></search>
        <view class="margin30"></view>
        <block v-for="(item,index) in list" :key='index'>
            <couponItem :info='item' @change='select'></couponItem>
        </block>
        <blockFoot :num='selectnum' @click='clickFoot'></blockFoot>
        <!-- 浮层 -->
        <floatLayer :toggle='toggle'>
            <block v-for='(item,index) in selected' :key='index'>
                <pickerItem @change='change' :info='item'></pickerItem>
            </block>
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
    let cachelist = []
    export default {
        components: {
            search,
            couponItem,
            blockFoot,
            floatLayer,
            pickerItem
        },
        data() {
            return {
                toggle: true,
                list: [{
                    name: '女神节专享通用优惠券1',
                    price: 20,
                    info: '部分商品满100减20',
                    num: 2,
                    id: 1
                }, {
                    name: '女神节专享通用优惠券2',
                    price: 20,
                    info: '部分商品满100减20',
                    num: 0,
                    id: 2
                }, {
                    name: '女神节专享通用优惠券3',
                    price: 20,
                    info: '部分商品满100减20',
                    num: 0,
                    id: 3
                }, {
                    name: '女神节专享通用优惠券4',
                    price: 20,
                    info: '部分商品满100减20',
                    num: 0,
                    id: 4
                }, {
                    name: '女神节专享通用优惠券5',
                    price: 20,
                    info: '部分商品满100减20',
                    num: 0,
                    id: 5
                }, ],
                selected: [],
                selectnum: 0
            }
        },
        methods: {
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
                console.log(event)
                this.toggle = !this.toggle;
                if (event.type == 'check') {
                } else {
                }
            }
        },
        onLoad(){
            this.list.map(item=>{
                this.calc(item)
            })
        }
    }
</script>

<style lang="scss" scoped>
    .select-coupon {
        background: #fff;
        .margin30 {
            height: 30upx;
        }
    }
</style>