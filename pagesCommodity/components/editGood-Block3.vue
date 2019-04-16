
<template>
    <view class="provide-block" style='overflow:hidden;'>
        <form @submit="formSubmit" class="grace-form">
            <selectItem label='商品编码' :value='goodName' @click="selectCell"></selectItem>
            <selectItem label='快递运费' :value='goodName' @click="selectCell"></selectItem>
            <switchItem label='显示快递' :checked='true' @change="selectCell"></switchItem>
            <selectItem label='参与会员折扣' :value='goodName' @click="selectCell"></selectItem>
            <selectItem label='商品表单' :value='goodName' @click="selectCell"></selectItem>
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
            // 表单提交
            formSubmit: function(e) {
                if (this.provideType == null) {
                    uni.showToast({
                        title: "请选择地区",
                        icon: "none"
                    });
                    return false;
                }
                var rule = [{
                        name: "name",
                        checkType: "string",
                        checkRule: "1,10",
                        errorMsg: "联系人应为1-20个字符"
                    },
                    {
                        name: "phoneno",
                        checkType: "phoneno",
                        checkRule: "",
                        errorMsg: "请正确填写手机号"
                    },
                    {
                        name: "address",
                        checkType: "string",
                        checkRule: "5,100",
                        errorMsg: "请正确填写详细地址"
                    }
                ];
                var formData = e.detail.value;
                formData.city1 = _self.city1.cityCode; //此处以保存用户城市代码为例
                var checkRes = graceChecker.check(formData, rule);
                if (checkRes) {
                    uni.showToast({
                        title: "验证通过! 请观察控制台",
                        icon: "none"
                    });
                    console.log(formData);
                } else {
                    uni.showToast({
                        title: graceChecker.error,
                        icon: "none"
                    });
                }
            },
            selectCell(cont) {
               this.$emit('click',cont)
            },
            onConfirm(e) {
                var cityText1 = e.label;
                var cityValue1 = e.value;
                var cityCode1 = e.cityCode;
                console.log(cityText1, cityValue1, cityCode1);
                this.cityText1 = cityText1;
                this.cityPickerValueDefault1 = cityValue1;
                this.city1 = e;
            }
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