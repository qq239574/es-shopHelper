<template>
    <view class='multi-block  page' @click='clickModel'>
        <view class="block" v-for='(item,index) in list' :key='index'>
            <inputItem :other='item' :disabled='true' label='规格' :value='item.specif.value'></inputItem>
            <inputItem :other='item' label='价格' :disabled='item.disabled' :value='item.price.value' @input='inputCell'></inputItem>
            <!-- 卡密商品没有库存 -->
            <selectItem :other='item' label='卡密库' :value='item.cardStock.value' @click='clickCell' v-if='!item.cardStock.needHide'></selectItem>
            <inputItem :other='item' label='库存' :disabled='item.disabled' :value='item.stock.value' @input='inputCell' v-else></inputItem>
            <inputItem :other='item' label='商品编码' :disabled='item.disabled' :value='item.code.value' @input='inputCell'></inputItem>
        </view>
        <!-- <view class="pager" >
                                    <i-page i-class='pager-button' :current="current" :total="totalPage" @change="handleChange">
                                        <view class='prev button' slot="prev">
                                            <i-icon type="return"></i-icon>
                                            上一步
                                        </view>
                                        <view class='next button' slot="next">
                                            下一步
                                            <i-icon type="enter"></i-icon>
                                        </view>
                                    </i-page>
                                </view> -->
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
    import inputItem from '../../components/my-components/editBlock-InputItem.vue'
    import selectItem from '../../components/my-components/editBlock-SelectItem.vue'
    let DataFrom = {};
    let cacheList = [];
    let DataGo = {
        go: ''
    }
    let cacheIndex = 0;
    export default {
        components: {
            inputItem,
            selectItem
        },
        data() {
            return {
                list: [{
                    specif: {
                        label: '规格',
                        id: '',
                        value: '',
                        disabled: true, //可否编辑
                        editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                    },
                    price: {
                        label: '价格',
                        id: '',
                        value: '0',
                        disabled: false, //可否编辑
                        editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                    },
                    stock: {
                        label: '库存',
                        id: '',
                        value: '0',
                        disabled: false, //可否编辑
                        editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                    },
                    code: {
                        label: '商品编号',
                        id: '',
                        value: '',
                        disabled: false, //可否编辑
                        editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                    },
                }]
            }
        },
        methods: {
            clickModel() {
                this.closePageLoading();
                this.list[0] && this.list[0].disabled && this.Toast('活动商品不可编辑')
            },
            inputCell(val) {
                let index = val.other.index;
                if (val.label == '价格') {
                    cacheList[index].price.value = val.value;
                } else if (val.label == '库存') {
                    cacheList[index].stock.value = val.value;
                } else if (val.label == '商品编码') {
                    cacheList[index].code.value = val.value;
                }
                DataFrom.needChange.other.list = cacheList;
                this.Cacher.setData('editMultiCode', DataFrom)
            },
            clickCell(val) {
                val.other.formList = DataFrom.needChange.other.formList;
                DataGo.go = 'editForm';
                cacheIndex = val.other.index;
                this.Cacher.setData('editMultiCode', {
                    from: 'editMultiCode',
                    go: 'editForm',
                    needChange: val
                })
                uni.navigateTo({
                    url: '../pages/editForm?from=editMultiCode'
                })
            },
            initPage() {
                if (DataGo.go == 'editForm') {
                    DataGo = this.Cacher.getData(DataGo.go);
                    cacheList[cacheIndex].cardStock.value = DataGo.needChange.value;
                    cacheList[cacheIndex].cardStock.id = DataGo.needChange.id;
                    DataFrom.needChange.other.list = cacheList;
                    this.Cacher.setData('editMultiCode', DataFrom)
                }
            }
        },
        onLoad(option) {
            DataFrom = this.Cacher.getData(option.from);
            cacheList = DataFrom.needChange.other.list.map((item, index) => {
                item.index = index;
                item.cardStock.needHide=false;
                item.stock.needHide=true;
                return item;
            });
            this.initPage()
            this.list = cacheList;
            DataFrom.needChange.other.list=cacheList;
            this.Cacher.setData('editMultiCode', DataFrom)
        },
        onShow() {
            this.initPage()
        }
    }
</script>

<style lang="scss" scoped>
    .multi-block {
        width: 100%;
        margin: 0 auto 20upx;
        .block {
            width: 710upx;
            margin: 20upx auto 0;
            background: #fff;
            border-radius: 10upx;
            overflow: hidden;
        }
    }
</style>