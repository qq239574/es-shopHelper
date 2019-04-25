
<template>
	<view class="provide-block">
		<form @submit="formSubmit" class="grace-form">
			<inputItem label='商品类型' :other='info.goodType' :value='info.goodType.value' :disabled='true'></inputItem>
			<multiLine label='商品名称' :other='info.goodName' :value='info.goodName.value' @click.stop="clickCell"></multiLine>
			<selectItem label='副标题' :other='info.subTitle'  :value='info.subTitle.value' @click.stop="clickCell"></selectItem>
			<selectItem label='商品分类'  :other='info.classification' :value='info.classification.value' @click.stop="clickCell"></selectItem>
			<chooseImgItem label='主图'  :other='info.mainImage' @getImages='getImages' :sortable='false' :imglist='info.mainImage'></chooseImgItem>
			<chooseImgItem label='轮播图' @startmove='startmove' :other='info.swiperList' button='轮播图' @getImages='getImages' :maxNum='10' :imglist='info.swiperList' tips='建议大小：750*750，长按图片可拖拽调整顺序'></chooseImgItem>
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
						label: '商品类型',
						id: '',
						value: '实体商品',
						disabled: true, //可否编辑,false可以，true不可
						editable: 'input', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
					},
					goodName: {
						label: '商品名称',
						id: '',
						value: '',
						disabled: false, //可否编辑
						editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
					},
					subTitle: {
						label: '副标题',
						id: '',
						value: '',
						disabled: false, //可否编辑
						editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
					},
					classification: {
						label: '商品分类',
						id: '',
						value: '',
						disabled: false, //可否编辑
						editable: 'select', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
					},
					mainImage: {
						label: '主图',
						id: '',
						img: '/static/img/global/home_order_tobepay.png',
						list: [{
							img: '/static/img/global/home_order_tobepay.png',
						}],
						disabled: false, //可否编辑
						editable: 'image', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
					},
					swiperList: {
						label: '',
						list: [{
							img: '/static/img/global/order_detail_state1.png'
						}],
						disabled: false, //可否编辑
						editable: 'imagelist', //如何编辑，input当前页输入，switch当前页选择，image选图，imagelist图列，select跳转
					}
				},
			}
		},
		watch: {
			info() {}
		},
		onLoad: function() {
			_self = this;
		},
		methods: {
			startmove(){
				this.$emit('startmove')
			},
			onConfirm(e) {
			},
			clickCell(cont) {
				this.$emit('click', cont);
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