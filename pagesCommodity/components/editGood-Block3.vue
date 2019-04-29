
<template>
    <view class="provide-block" style='overflow:hidden;'>
        <form @submit="formSubmit" class="grace-form">
            <selectItem label='商品编码' :other='info.goodCode' :value='info.goodCode.value' @click="clickCell"></selectItem>
            <switchItem label='自动发货' :other='info.autoDeliver' :value='info.autoDeliver.value' @change="inputCell" v-if='!item.needHide'></switchItem>
            <selectItem label='自动发货内容' :other='info.autoDeliverContent' :value='info.autoDeliverContent.value' @click="clickCell" v-if='!item.needHide'></selectItem>
            <selectItem label='快递运费' :other='info.provideCost' :value='info.provideCost.value' @click="clickCell" v-if='!item.needHide'></selectItem>
            <switchItem label='显示快递' :other='info.showProCost' :checked='info.showProCost.value' @change="inputCell" v-if='!item.needHide'></switchItem>
            <switchItem label='参与会员折扣' :other='info.joinCount' :checked='info.joinCount.value' @change="inputCell"></switchItem>
            <selectItem label='商品表单' :other='info.goodForm' :value='info.goodForm.value' @click="clickCell"></selectItem>
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
                    goodCode: {
                        label: '商品编码',
                        id: '',
                        value: '0654656565656',
                        disabled: false, //可否编辑
                        editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                    },
                    provideCost: {
                        label: '快递运费',
                        id: '',
                        value: 10,
                        disabled: false, //可否编辑
                        editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                    },
                    showProCost: {
                        label: '显示快递',
                        id: '',
                        value: true,
                        disabled: false, //可否编辑
                        editable: 'switch', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                    },
                    joinCount: {
                        label: '参与会员折扣',
                        id: '',
                        value: true,
                        disabled: false, //可否编辑
                        editable: 'switch', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                    },
                    goodForm: {
                        label: '商品表单',
                        id: '',
                        value: '',
                        disabled: false, //可否编辑
                        editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                    }
                }
            }
        },
        watch:{
            info(){
                console.log(this.info)
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
            clickCell(cont) {
                this.$emit('click', cont)
            },
            inputCell(cont) {
                this.$emit('input', cont)
            },
            onConfirm(e) {}
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
    }
</style>