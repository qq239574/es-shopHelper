
<template>
    <view class="provide-block">
        <form @submit="formSubmit" class="grace-form">
           
            <selectItem label='规格类型' :other='info.specification' :value='info.specification.value' @click.stop="clickCell"></selectItem>
            <selectItem label='子规格详情' :other='info.childrenSpecs' :value='info.childrenSpecs.value' @click.stop="clickCell" v-if='info.specification.value=="多规格"'></selectItem>
            <inputItem label='售卖价格' type='digit' :other='info.price' :value='info.price.value' @input="inputCell" v-if='!info.price.needHide'></inputItem>
            <inputItem label='划线价格' type='digit' :other='info.delPrice' :value='info.delPrice.value' @input="inputCell" ></inputItem>
            <selectItem label='卡密库' :other='info.cardStock' :value='info.cardStock.value' @click.stop="clickCell" v-if='!info.cardStock.needHide'></selectItem>
            <inputItem label='商品库存' type='number' :other='info.stockNum' :value='info.stockNum.value' @input="inputCell" v-if='!info.stockNum.needHide&&info.cardStock.needHide'></inputItem>
            <switchItem label='显示库存' :other='info.showStock' :checked='info.showStock.value' @change="inputCell"></switchItem>
            <inputItem label='已出售数'  type='number' :other='info.soldNum' :value='info.soldNum.value' @input="inputCell"></inputItem>
            <switchItem label='显示销量' :other='info.showSold' :checked='info.showSold.value' @change="inputCell"></switchItem>
        </form>
        <mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :pickerValueArray='list' :pickerValueDefault="defaultVal" @onConfirm="onConfirm">
        </mpvue-picker>
    </view>
</template>
<script>
    import mpvuePicker from '../../graceUI2.0/threeComponents/mpvuePicker.vue';
    var graceChecker = require("../../graceUI2.0/jsTools/graceChecker.js");
    import selectItem from '../../components/my-components/editBlock-SelectItem.vue'
    import inputItem from '../../components/my-components/editBlock-InputItem.vue'
    import switchItem from '../../components/my-components/editBlock-SwitchItem.vue'
    var _self;
    export default {
        props: {
            info: {
                type: Object,
                default: {
                    specification: {
                        label: '规格类型',
                        id: '',
                        value: '无',
                        disabled: true, //可否编辑
                        editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                    },
                    price: { //售卖价格
                        label: '售卖价格',
                        id: '',
                        value: '18.9',
                        disabled: false, //可否编辑
                        editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                    },
                    delPrice: { //划线价格
                        label: '划线价格',
                        id: '',
                        value: '16565',
                        disabled: false, //可否编辑
                        editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                    },
                    stockNum: { //商品库存
                        label: '商品库存',
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
                }
            }
        },
        watch: {
            info() {}
        },
        data() {
            return {
                goodClass: '',
                delPrice: '',
                showStock: false,
                soldNum: 0,
                showSold: false,
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
            clickCell(cont) {
                this.$emit('click', cont);
            },
            inputCell(val) {
                this.$emit('input', val)
            },
        },
        components: {
            mpvuePicker,
            selectItem,
            inputItem,
            switchItem,
        }
    }
</script>
<style lang='scss'>
    .provide-block {
        background: #fff;
        margin-top: 20upx;
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
    }
</style>