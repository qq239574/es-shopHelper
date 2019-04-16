<template>
	<div class='pages-self-index page'>
		<view class="bg">
			<image lazy-load src='/static/img/global/my_bg.png'></image>
			<view class="name">小花花</view>
			<view class="tel">15065656565</view>
			<view class='manager'>管理员</view>
		</view>
		<inputItem :disabled='true' label='登陆账号' value='1354'></inputItem>
		<selectItem label='姓名' value='张三'></selectItem>
		<selectItem label='联系方式' value='15456989898'></selectItem>
		<selectItem label='修改密码' value=' '></selectItem>
		<view class="margin20"></view>
		<selectItem label='微信：Forever' value='重新绑定' aftStyle='color:#fb6638;'></selectItem>
		<view class="margin20"></view>
		<view class="button">退出登录</view>
		<Button @click='toTest'>Test</Button>
		<Button @click='toEcharts'>echarts</Button>
	</div>
</template>

<script>
	import selectItem from '../../components/my-components/editBlock-SelectItem.vue'
	import inputItem from '../../components/my-components/editBlock-InputItem.vue'
	export default {
		components: {
			selectItem,
			inputItem
		},
		methods: {
			toTest() {
				uni.navigateTo({
					url: '../../pagesTest/pages/test'
				})
			},
			toEcharts() {
				uni.navigateTo({
					url: '../../pagesTest/pages/echarts'
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.bg {
		width: 100%;
		height: 186upx;
		background: #fff;
		position: relative;
		image {
			width: 710upx;
			height: 100%;
			display: block;
			margin: auto;
		}
		view {
			position: absolute;
		}
		.name {
			color: #fff;
			font-size: 32upx;
			line-height: 32upx;
			top: 54upx;
			left: 64upx;
			font-weight: 600;
		}
		.tel {
			color: #fff;
			font-size: 28upx;
			line-height: 28upx;
			bottom: 54upx;
			left: 64upx;
			opacity: .6;
		}
		.manager {
			background: #fff;
			color:#000;
			font-size: 24upx;
			height: 42upx;
			line-height: 42upx;
			text-align: center;
			padding: 0 24upx;
			border-radius:21upx;
			top:76upx;
			right:56upx;
		}
	}
	.margin20 {
		height: 20upx;
	}
	.button {
		width: 100%;
		height: 100upx;
		background: #fff;
		line-height: 100upx;
		text-align: center;
		font-size: 28upx;
		color: #6f7685;
	}
</style>
