<template>
    <view class='multi-block  page'>
        <view class="block" v-for='(item,index) in list' :key='index'>
             
            
        </view>
        <view class='isSingle' v-if='!list.length'>单规格</view>
        <view class='addType' @click='addType'>
            +添加规格
        </view>
    </view>
</template>

<script>
    import inputItem from '../../components/my-components/editBlock-InputItem.vue'
    import selectItem from '../../components/my-components/editBlock-SelectItem.vue'
    import multiLine from '../../components/my-components/editBlock-MultiLine.vue'
    let DataFrom = {};
    let cacheList = [];
    export default {
        components: {
            inputItem,
            selectItem,
            multiLine
        },
        data() {
            return {
                list: [{ 
                    id:'',
                    title:'',
                    items:[{
                        id:'',
                        title:''
                    }]
                }]
            }
        },
        methods: {
            addType() {
                let index=this.list.length;
                this.list.push({
                    index,
                    specif: {
                        label: '规格',
                        id: '',
                        value: '',
                        disabled: false, //可否编辑
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
                })
            },
            inputCell(val) { 
                let index = val.other.index;
                if (val.label == '规格') {
                    cacheList[index].specif.value = val.value;
                }else if (val.label == '价格') {
                    cacheList[index].price.value = val.value;
                } else if (val.label == '库存') {
                    cacheList[index].stock.value = val.value;
                } else if (val.label == '商品编码') {
                    cacheList[index].code.value = val.value;
                }
                DataFrom.needChange.other.list = cacheList; 
                this.Cacher.setData('editMultiCode', DataFrom)
            }, 
        },
        onLoad(option) {
            DataFrom = this.Cacher.getData(option.from); 
        }
    }
</script>

<style lang="scss" scoped>
    .multi-block {
        width: 100%;
        margin: 0 auto 20upx;
        .isSingle {
            font-size: 40upx;
            font-weight: 700;
            color: #ccc;
            text-align: center;
            line-height: 200upx;
        }
        .addType {
            width: 710upx;
            height: 100upx;
            line-height: 98upx;
            font-size: 26upx;
            border: 1upx solid #ec673e;
            margin: 100upx auto;
            color: #ec673e;
            text-align: center;
            border-radius: 8upx;
        }
        .block {
            width: 710upx;
            margin: 20upx auto 0;
            background: #fff;
            border-radius: 10upx;
            overflow: hidden;
        }
    }
</style>