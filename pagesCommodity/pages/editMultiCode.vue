<template>
    <view class='multi-block  page'>
        <view class="block" v-for='(item,index) in list' :key='index'>
            <inputItem :other='item' :disabled='true' label='规格' :value='item.specif.value'></inputItem>
            <inputItem :other='item' label='价格' :value='item.price.value' @input='inputCell'></inputItem>
            <inputItem :other='item' label='库存' :value='item.stock.value' @input='inputCell'></inputItem>
            <inputItem :other='item' label='商品编码' :value='item.code.value' @click='clickCell'></inputItem>
        </view>
    </view>
</template>

<script>
    import inputItem from '../../components/my-components/editBlock-InputItem.vue'
    import selectItem from '../../components/my-components/editBlock-SelectItem.vue'
    let DataFrom = {};
    let cacheList = [];
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
            inputCell(val) {
                console.log(val);
                let index = val.other.index;
                if (val.label == '价格') {
                    cacheList[index].price.value = val.value;
                } else if (val.label == '库存') {
                    cacheList[index].stock.value = val.value;
                } else if (val.label == '商品编码') {
                    cacheList[index].code.value = val.value;
                }
                DataFrom.needChange.other.list=cacheList;
                DataFrom.from='editMultiCode'
                this.Cacher.setData('billDetail',DataFrom)
            },
            clickCell(val) {
                console.log(val)
            }
        },
        onLoad(option) {
            DataFrom = this.Cacher.getData(option.from);
            cacheList = DataFrom.needChange.other.list.map((item, index) => {
                item.index = index;
                return item;
            });
            this.list = cacheList;
            console.log(DataFrom)
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