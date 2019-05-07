
<template>
    <view class="provide-block" style='overflow:hidden;'>
        <form @submit="formSubmit" class="grace-form">
            <selectItem label='商品编码' :other='info.goodCode' :value='info.goodCode.value' @click="clickCell"></selectItem>
            <!-- 电子卡密显示定时下架 -->
            <block v-if='!info.autoExt.needHide'>
                <switchItem label='定时下架' :other='info.autoExt' :checked='info.autoExt.value' @change="inputCell"></switchItem>
                <selectItem label='定时下架时间' :other='info.autoExtTime' :value='info.autoExtTime.value' @click="clickCell"></selectItem>
            </block>
            <!-- 电子卡密不显示发货 -->
            <block v-else>
                <switchItem label='自动发货' :other='info.autoDeliver' :checked='info.autoDeliver.value' @change="inputCell" v-if='!info.autoDeliver.needHide'></switchItem>
                <selectItem label='自动发货内容' :other='info.autoDeliverContent' :value='info.autoDeliverContent.value' @click="clickCell" v-if='!info.autoDeliverContent.needHide'></selectItem>
                <selectItem label='快递运费' :other='info.provideCost' :value='info.provideCost.value' @click="clickCell" v-if='!info.provideCost.needHide'></selectItem>
                <switchItem label='显示快递' :other='info.showProCost' :checked='info.showProCost.value' @change="inputCell" v-if='!info.showProCost.needHide'></switchItem>
            </block>
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
                        value: '',
                        disabled: false, //可否编辑
                        editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                    },
                    autoExt: {
                        label: '定时下架',
                        id: '',
                        value: true,
                        time: '', //定时下架时间
                        disabled: false, //可否编辑
                        editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                        needHide: false,
                    },
                    autoDeliver: {
                        label: '自动发货',
                        id: '',
                        value: false,
                        disabled: false,
                        editable: 'select',
                    },
                    provideCost: {
                        label: '快递运费',
                        id: '',
                        value: 0,
                        disabled: false, //可否编辑
                        editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                    },
                    showProCost: {
                        label: '显示快递',
                        id: '',
                        value: false,
                        disabled: false, //可否编辑
                        editable: 'switch', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
                    },
                    joinCount: {
                        label: '参与会员折扣',
                        id: '',
                        value: false,
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