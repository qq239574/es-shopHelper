
<template>
	<view class="provide-block">
		<form class="grace-form">
			<view class="grace-items">
				<view class="grace-label">收货地址</view>
				<view class='address'>{{info.address}}</view>
			</view>
			<view class="grace-items">
				<view class="grace-label">配送方式</view>
				<view @click.stop="selectCell(1,provideType)" class="other">
					{{info.provideType}}
					<text class="grace-icons icon-arrow-right" style='color:#5E5E5E;'></text>
				</view>
			</view>
			<view class="grace-items" v-if='!cityProvide&&!needProvide'>
				<view class="grace-label">物流公司</view>
				<view @click.stop="selectCell(2,info.provideComp)" class="other">
					{{info.provideComp}}
					<text class="grace-icons icon-arrow-right" style='color:#5E5E5E;'></text>
				</view>
			</view>
			<view class="grace-items" v-if='!needProvide'>
				<view class="grace-label">物流单号</view>
				<view @click.stop="selectCell(3,info.provideId)" class="other">
					{{info.provideId}}
					<text class="grace-icons icon-arrow-right" style='color:#5E5E5E;'></text>
				</view>
			</view>
			<view class="grace-items">
				<view class="grace-label">备注</view>
				<view @click.stop="selectCell(4,info.provideAddition)" class="other">
					{{info.provideAddition}}
					<text class="grace-icons icon-arrow-right" style='color:#5E5E5E;'></text>
				</view>
			</view>
		</form>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :pickerValueArray='list[cityProvide]' :pickerValueDefault="defaultVal" @onConfirm="onConfirm">
		</mpvue-picker>
	</view>
</template>
<script>
	import mpvuePicker from '../../graceUI2.0/threeComponents/mpvuePicker.vue';
	var graceChecker = require("../../graceUI2.0/jsTools/graceChecker.js");
	let DataFrom = {};
	export default {
		props: {
			info: {
				type: Object,
				default: {
					address: '请选择', //收货地址
					provideType: '请选择', //配送方式
					provideComp: '请选择', //物流公司
					provideId: '填写', //物流单号
					provideAddition: '未填写', //发货备注
					express: [], //物流公司 
				}
			},
			cityProvide: { //是否同城快递，0快递 1同城
				type: Number,
				default: 0
			},
			needProvide: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				list: [
					[{
							label: '需要物流',
							value: 0
						},
						{
							label: '无需物流',
							value: 1
						},
					],
					[{
							label: '商家自配送',
							value: 0
						},
						{
							label: '第三方配送',
							value: 1
						},
					]
				],
				themeColor: '#007AFF', //颜色 
				defaultVal: [0], //默认选项
			};
		},
		methods: {
			selectCell(num, cont) {
				if (num == 1) { //配送方式
					this.$refs.mpvuePicker.show();
				} else if (num == 2) { //物流公司
					this.$emit('click', {
						index: num,
						name: '物流公司',
						content: cont,
						info: this.info
					})
				} else if (num == 3) { //物流单号
					this.$emit('click', {
						index: num,
						name: '物流单号',
						content: cont,
						info: this.info
					})
				} else if (num == 4) { //备注
					this.$emit('click', {
						index: num,
						name: '备注',
						content: cont,
						info: this.info
					})
				}
			},
			onConfirm(e) {
				console.log(e)
				this.$emit('change', Object.assign({}, this.info, {
					provideType: e.label
				}))
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