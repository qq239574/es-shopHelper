
<template>
	<view class="provide-block">
		<form @submit="formSubmit" class="grace-form">
			<view class="grace-items">
				<view class="grace-label">收货地址</view>
				<view class='address'>{{address}}</view>
			</view>
			<view class="grace-items">
				<view class="grace-label">配送方式</view>
				<view @click.stop="selectCell(1,provideType)" class="other">
					{{provideType}}
					<text class="grace-icons icon-arrow-right" style='color:#5E5E5E;'></text>
				</view>
			</view>
			<view class="grace-items">
				<view class="grace-label">物流公司</view>
				<view @click.stop="selectCell(2,provideComp)" class="other">
					{{provideComp}}
					<text class="grace-icons icon-arrow-right" style='color:#5E5E5E;'></text>
				</view>
			</view>
			<view class="grace-items">
				<view class="grace-label">物流单号</view>
				<view @click.stop="selectCell(3,provideId)" class="other">
					{{provideId}}
					<text class="grace-icons icon-arrow-right" style='color:#5E5E5E;'></text>
				</view>
			</view>
			<view class="grace-items">
				<view class="grace-label">备注</view>
				<view @click.stop="selectCell(4,provideAddition)" class="other">
					{{provideAddition}}
					<text class="grace-icons icon-arrow-right" style='color:#5E5E5E;'></text>
				</view>
			</view>
		</form>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :pickerValueArray='list' :pickerValueDefault="defaultVal" @onConfirm="onConfirm">
		</mpvue-picker>
	</view>
</template>
<script>
	import mpvuePicker from '../../graceUI2.0/threeComponents/mpvuePicker.vue';
	var graceChecker = require("../../graceUI2.0/jsTools/graceChecker.js");
	var _self;
	export default {
		data() {
			return {
				address: '上东升 青岛市 市北区 龙城路 卓越世纪中心 3号楼 21楼易联互动',
				provideType: '请选择',
				provideComp: '请选择',
				provideId: '填写',
				provideAddition: '未填写',
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
			selectCell(num, cont) {
				if (num == 1) { //配送方式
					this.$refs.mpvuePicker.show();
				} else if (num == 2) { //物流公司
					this.$emit('click', {
						index: num,
						name: '物流公司',
						content: cont
					})
				} else if (num == 3) { //物流单号
					this.$emit('click', {
						index: num,
						name: '物流单号',
						content: cont
					})
				} else if (num == 4) { //备注
					this.$emit('click', {
						index: num,
						name: '备注',
						content: cont
					})
				}
			},
			onConfirm(e) {
				var cityText1 = e.label;
				var cityValue1 = e.value;
				var cityCode1 = e.cityCode;
				console.log(cityText1, cityValue1, cityCode1);
				this.cityText1 = cityText1;
				this.cityPickerValueDefault1 = cityValue1;
				this.city1 = e;
			},
		},
		components: {
			mpvuePicker
		}
	}
</script>
<style lang='scss'>
	.provide-block {
		background: #fff;
		margin-bottom: 30upx;
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