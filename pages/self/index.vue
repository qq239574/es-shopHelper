<template>
	<div class='pages-self-index page'>
		<view class="bg">
			<image lazy-load src='/static/img/global/my_bg.png'></image>
			<view class='userInfo'>
				<view class="name">{{userName}}</view>
				<view class="tel">{{userId}}</view>
			</view>
			<view class='manager' @click='clickManager'>{{userRoleName}}</view>
		</view>
		<inputItem :disabled='true' label='登陆账号' :value='userId'></inputItem>
		<selectItem label='姓名' :value='realName' @click='toPage("name")'></selectItem>
		<selectItem label='联系方式' :value='contact_mobile' @click='toPage("tel")'></selectItem>
		<selectItem label='修改密码' value=' ' @click='toPage("password")'></selectItem>
		<view class="margin20"></view>
		<selectItem :label='"微信："+wxInfo.nickName' value='重新绑定' valueStyle='color:#fb6638;' @click='bindWX' v-if='wxInfo.nickName'></selectItem>
		<view class="margin20"></view>
		<view class="button" @click='leave'>退出登录</view>
		<van-toast id="van-toast" />
		<van-dialog id="van-dialog" />
		<MyTabbar :defaultIndex='3' ></MyTabbar>
	</div>
</template>

<script>
	import MyTabbar from '../../components/my-components/myTabbar'
	import selectItem from '../../components/my-components/editBlock-SelectItem.vue'
	import inputItem from '../../components/my-components/editBlock-InputItem.vue'
	let DataFrom = {};
	export default {
		components: {
			selectItem,
			inputItem,
			MyTabbar
		},
		data() {
			return {
				userName: '',
				userTel: '',
				userId: '',
				contact_mobile: '',
				userRoleName: '',
				realName: '',
				wxInfo: {}
			}
		},
		methods: {
			initPage() {
				let login_info = this.Cacher.getData('cache-user-login');
				this.Request('myInfo').then(res => {
					this.userName = res.user.is_root == 1 ? '超级管理员' : res.user.manager_name;
					this.userTel = res.user.username;
					this.userId = login_info.userId;
					this.contact_mobile = res.user.contact_mobile;
					this.userRoleName = res.user.is_root == 1 ? '超级管理员' : res.user.role_name;
					this.realName = res.user.contact;
				})
			},
			toPage(val) {
				if (val == 'name') {
					this.Cacher.setData('myself', {
						userName: this.realName,
						userTel: this.contact_mobile,
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
						userName: this.realName,
						userTel: this.contact_mobile,
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
				this.Request('bindWechat', {
					encrypted_data: '',
					session_key: '',
					iv: '',
					user_id: ''
				})
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
			let info = this.Cacher.getData('login') || {};
			this.wxInfo = info.userInfo;
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
		.userInfo {
			position: absolute;
			top: 0;
			left: 64upx;
			width: 450upx;
			height: 100%;
			box-sizing: border-box;
			padding: 38upx 0;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
		}
		.name {
			color: #fff;
			font-size: 32upx;
			line-height: 40upx;
			top: 54upx;
			left: 64upx;
			font-weight: 600;
			width: 100%;
			word-break: break-all;
			height: fit-content;
		}
		.tel {
			color: #fff;
			font-size: 28upx;
			line-height: 28upx;
			bottom: 54upx;
			left: 64upx;
			opacity: .6;
			width: 100%;
			height: fit-content;
			margin-top: 10upx;
		}
		.manager {
			position: absolute;
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
