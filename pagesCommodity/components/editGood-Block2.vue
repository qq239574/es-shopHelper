
<template>
    <view class="provide-block">
        <form @submit="formSubmit" class="grace-form">
            <selectItem label='规格类型' :value='goodClass' @click="selectCell"></selectItem>
            <inputItem :disable='true' label='划线价格' :value='delPrice' @input="inpuitValue"></inputItem>
            <switchItem label='显示库存' :checked='false' @change="selectCell"></switchItem>
            <inputItem :disable='true' label='已出售数' :value='soldNum' @input="inpuitValue"></inputItem>
            <switchItem label='显示销量' :checked='showSold' @change="selectCell"></switchItem>
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
                    goodClass: {
                        label: '上东升 青岛市 市北区 龙城路 卓越世纪中心 3号楼 21楼易联互动',
                        id: '',
                        value: ''
                    },
                    delPrice: {
                        label: '上东升 青岛市 市北区 龙城路 卓越世纪中心 3号楼 21楼易联互动',
                        id: '',
                        value: ''
                    },
                    showStock: {
                        label: '上东升 青岛市 市北区 龙城路 卓越世纪中心 3号楼 21楼易联互动',
                        id: '',
                        value: false
                    },
                    soldNum: {
                        label: '上东升 青岛市 市北区 龙城路 卓越世纪中心 3号楼 21楼易联互动',
                        id: '',
                        value: 0
                    },
                    showSold: {
                        label: '上东升 青岛市 市北区 龙城路 卓越世纪中心 3号楼 21楼易联互动',
                        id: '',
                        value: false
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
                this.$emit('click', cont);
            },
            
            inpuitValue(val) {
                this.$emit('input', val)
            },
            onConfirm(e) {
                var cityText1 = e.label;
                var cityValue1 = e.value;
                var cityCode1 = e.cityCode;
                this.cityText1 = cityText1;
                this.cityPickerValueDefault1 = cityValue1;
                this.city1 = e;
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