<template>
	<div class='pages-self-index page'>
		<view class="bg">
			<image lazy-load src='/static/img/global/my_bg.png'></image>
			<view class="name">{{userName}}</view>
			<view class="tel">{{userTel}}</view>
			<view class='manager' @click='clickManager'>{{userRoleName}}</view>
		</view>
		<inputItem :disabled='true' label='登陆账号' value='1354'></inputItem>
		<selectItem label='姓名' :value='realName' @click='toPage("name")'></selectItem>
		<selectItem label='联系方式' :value='userTel' @click='toPage("tel")'></selectItem>
		<selectItem label='修改密码' value=' ' @click='toPage("password")'></selectItem>
		<view class="margin20"></view>
		<selectItem label='微信：Forever' value='重新绑定' valueStyle='color:#fb6638;' @click='bindWX'></selectItem>
		<view class="margin20"></view>
		<view class="button" @click='leave'>退出登录</view>
		<van-toast id="van-toast" />
		<van-dialog id="van-dialog" />
	</div>
</template>

<script>
	import selectItem from '../../components/my-components/editBlock-SelectItem.vue'
	import inputItem from '../../components/my-components/editBlock-InputItem.vue'
	let DataFrom = {};
	export default {
		components: {
			selectItem,
			inputItem
		},
		data() {
			return {
				userName: '',
				userTel: '',
				userRoleName: '',
				realName: ''
			}
		},
		methods: {
			initPage() {
				
				this.Request('myInfo').then(res => {
					this.userName = res.user.username;
					this.userTel = res.user.contact_mobile;
					this.userRoleName = res.user.role_name;
					this.realName = res.user.contact;
				})
			},
			toPage(val) {
				if (val == 'name') {
					this.Cacher.setData('myself', {
						userName: this.userName,
						userTel: this.userTel,
						userRoleName: this.userRoleName,
						realName: this.realName,
						needChange: {
							name: '姓名',
							id: 'realName'
						}
					}) 
					uni.navigateTo({
						url: '../../pagesSelf/pages/myName?from=myself'
					})
				} else if (val == 'tel') {
					this.Cacher.setData('myself', {
						userName: this.userName,
						userTel: this.userTel,
						userRoleName: this.userRoleName,
						realName: this.realName,
						needChange: {
							name: '联系方式',
							id: 'userTel'
						}
					})
					uni.navigateTo({
						url: '../../pagesSelf/pages/myName?from=myself'
					})
				} else if (val == 'password') {
					uni.navigateTo({
						url: '../../pagesSelf/pages/password?from=myself'
					})
				}
			},
			clickManager() {},
			bindWX() {
				this.closePageLoading();
				this.Toast('绑定微信成功')
			},
			leave() {
				this.closePageLoading();
				this.Dialog.confirm({
					title: '',
					message: '您确认退出当前账号吗？'
				}).then(() => {
					this.Cacher.setData('self', {
						from: 'self'
					})
					uni.reLaunch({
						url: '../login/index?from=self'
					})
				}).catch(() => {
					// on cancel
				});
			}
		},
		onShow() {
			this.initPage();
		}
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
			color: #000;
			font-size: 24upx;
			height: 42upx;
			line-height: 42upx;
			text-align: center;
			padding: 0 24upx;
			border-radius: 21upx;
			top: 76upx;
			right: 56upx;
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
