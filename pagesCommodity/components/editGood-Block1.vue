
<template>
	<view class="provide-block">
		<form @submit="formSubmit" class="grace-form">
			<multiLine label='商品类型' :value='goodType' @click='selectCell' @inpiut='inputValue'></multiLine>
			<selectItem label='商品名称' @click.stop="selectCell"></selectItem>
			<selectItem label='副标题' @click.stop="selectCell"></selectItem>
			<selectItem label='商品分类' @click.stop="selectCell"></selectItem>
			<chooseImgItem label='主图' @getImages='getImages' :sortable='false'></chooseImgItem>
			<chooseImgItem label='轮播图' button='轮播图' @getImages='getImages' :maxNum='10' tips='建议大小：750*750，长按图片可拖拽调整顺序'></chooseImgItem>
		</form>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :pickerValueArray='list' :pickerValueDefault="defaultVal" @onConfirm="onConfirm">
		</mpvue-picker>
	</view>
</template>
<script>
	import mpvuePicker from '../../graceUI2.0/threeComponents/mpvuePicker.vue';
	var graceChecker = require("../../graceUI2.0/jsTools/graceChecker.js");
	import chooseImgItem from '../../components/my-components/editBlock-ChooseImageItem.vue'
	import inputItem from '../../components/my-components/editBlock-InputItem.vue'
	import switchItem from '../../components/my-components/editBlock-SwitchItem.vue'
	import multiLine from '../../components/my-components/editBlock-MultiLine.vue'
	import selectItem from '../../components/my-components/editBlock-SelectItem.vue'
	var _self;
	export default {
		props: {
			info: {
				type: Object,
				default: {
					goodType: {
						label: '上东升 青岛市 市北区 龙城路 卓越世纪中心 3号楼 21楼易联互动',
						id: '',
						value: ''
					},
					goodName: {
						label: '上东升 青岛市 市北区 龙城路 卓越世纪中心 3号楼 21楼易联互动',
						id: '',
						value: ''
					},
					subTitle: {
						label: '上东升 青岛市 市北区 龙城路 卓越世纪中心 3号楼 21楼易联互动',
						id: '',
						value: ''
					},
					classification: {
						label: '上东升 青岛市 市北区 龙城路 卓越世纪中心 3号楼 21楼易联互动',
						id: '',
						value: ''
					},
					mainImage: {},
					swiperList: [{}]
				}
			}
		},
		watch: {
			info() {}
		},
		data() {
			return {
				goodType: '上东升 青岛市 市北区 龙城路 卓越世纪中心 3号楼 21楼易联互动',
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
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			onConfirm(e) {
				var cityText1 = e.label;
				var cityValue1 = e.value;
				var cityCode1 = e.cityCode;
				this.cityText1 = cityText1;
				this.cityPickerValueDefault1 = cityValue1;
				this.city1 = e;
			},
			selectCell(cont) {
				this.$emit('click', cont);
			},
			inputValue(val) {
				this.$emit('input', val);
			},
			getImages(list) {
				this.$emit('getImages', list);
			}
		},
		components: {
			mpvuePicker,
			chooseImgItem,
			switchItem,
			inputItem,
			multiLine,
			selectItem
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
			.imgbox {
				width: 490upx;
				padding-bottom: 10upx;
				.tips {
					width: 100%;
					font-size: 20upx;
					text-align: left;
					color: #9ea3ae;
					line-height: 60upx;
				}
			}
			&.mainImage {
				height: 200upx;
				padding-top: 0;
			}
			&.swiper-imgs {
				min-height: 200upx;
				padding: 0 0 10upx;
			}
		}
	}
</style>