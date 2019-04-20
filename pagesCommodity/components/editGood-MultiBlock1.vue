
<template>
    <view class="provide-block" style='overflow:hidden;'>
        <inputItem label='规格类型'  :other='info.goodType' :value='info.goodType.value' :disabled='true'></inputItem>
        <multiBlock :info='info.list.value' @input='inputCell' @click='clickCell'></multiBlock>
        <view class='white'>
            <inputItem label='划线价格'  :other='info.delPrice' :value='info.delPrice.value' @input="inputCell"></inputItem>
            <switchItem label='显示库存'  :other='info.showStock' :checked='info.showStock.value' @change="inputCell"></switchItem>
            <inputItem label='已出售数'  :other='info.soldNum' :value='info.soldNum.value' @input="inputCell"></inputItem>
            <switchItem label='显示销量'  :other='info.showSold' :checked='info.showSold.value' @change="inputCell"></switchItem>
        </view>
    </view>
</template>
<script>
    import mpvuePicker from '../../graceUI2.0/threeComponents/mpvuePicker.vue';
    var graceChecker = require("../../graceUI2.0/jsTools/graceChecker.js");
    import selectItem from '../../components/my-components/editBlock-SelectItem.vue'
    import inputItem from '../../components/my-components/editBlock-InputItem.vue'
    import switchItem from '../../components/my-components/editBlock-SwitchItem.vue'
    import multiBlock from './editGood-BlockMult.vue'
    var _self;
    export default {
        components: {
            mpvuePicker,
            selectItem,
            inputItem,
            switchItem,
            multiBlock
        },
        props: {
            info: {
                type: Object,
                default: {
                    goodType: {
                        label: '规格类型',
                        id: '',
                        value: '多规格',
                        disabled: true, //可否编辑,false可以，true不可
                        editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                    },
                    list: {
                        disabled: false, //可否编辑,false可以，true不可
                        editable: 'block', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                        value: [{
                            specif: {
                                label: '规格',
                                id: '',
                                value: '2000W-亮黑色',
                                disabled: true, //可否编辑
                                editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                            },
                            price: {
                                label: '价格',
                                id: '',
                                value: '1999.0',
                                disabled: false, //可否编辑
                                editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                            },
                            stock: {
                                label: '库存',
                                id: '',
                                value: '23566',
                                disabled: false, //可否编辑
                                editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                            },
                            code: {
                                label: '商品编号',
                                id: '',
                                value: 'JB12595695656565998',
                                disabled: false, //可否编辑
                                editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                            },
                        }]
                    },
                    delPrice: { //划线价格
                        label: '划线价格',
                        id: '',
                        value: '16565',
                        disabled: false, //可否编辑
                        editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                    },
                    showStock: { //显示库存
                        label: '显示库存',
                        id: '',
                        value: false,
                        disabled: false, //可否编辑
                        editable: 'switch', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                    },
                    soldNum: { //已出售数
                        label: '已出售数',
                        id: '',
                        value: 10,
                        disabled: false, //可否编辑
                        editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                    },
                    showSold: { //显示销量
                        label: '显示销量',
                        id: '',
                        value: false,
                        disabled: false, //可否编辑
                        editable: 'switch', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                    }
                },
            }
        },
        data() {
            return {
                goodName: '请选择',
                subTitle: '请选择',
                classification: '填写',
                list: [{
                        label: '飞机',
                        value: 0
                    },
                    {
                        label: '火车票',
                        value: 1
                    },
                ],
                themeColor: '#007AFF', //颜色
                cityText1: "请选择", //文本
                defaultVal: [0], //默认选项
            };
        },
        onLoad: function() {
            _self = this;
        },
        methods: {
            inputCell(cont) {
                this.$emit('input', cont)
            }, 
            clickCell(cont){
                this.$emit('click',cont)
            },
            onConfirm(e) {}
        },
    }
</script>
<style lang='scss'>
    .provide-block {
        margin: 0 0;
        overflow: auto;
        .grace-items {
            width: 710upx;
            margin: auto;
            padding: 2upx auto;
            .address {
                height: fit-content;
                width: 490upx;
                line-height: 38upx; // padding: 40upx 0 20upx;
            }
        }
        .white {
            background: #fff;
        }
    }
</style>