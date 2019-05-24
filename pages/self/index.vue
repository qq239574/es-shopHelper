<template>
	<div class='pages-self-index page'>
		<view class="bg">
			<image lazy-load src='/static/img/global/my_bg.png'></image>
			<view class='userInfo'>
				<view class="name">{{realName}}</view>
				<view class="tel">{{userId}}</view>
			</view>
			<view class='manager'>{{userRoleName}}</view>
		</view>
		<inputItem :disabled='true' :label-style='"position:relative;padding-left:"+halfWidth+""' label='登录账号' :value='userId'>
			<image slot='icon' lazy-load class='icon' src='/static/img/global/user-icon.jpg'></image>
		</inputItem>
		<selectItem label='姓名' :fontStyle='"position:relative;padding-left:"+halfWidth+""' :value='realName' @click='toPage("name")'>
			<image slot='icon' lazy-load class='icon' src='/static/img/global/diamond.svg'></image>
		</selectItem>
		<selectItem label='联系方式' :fontStyle='"position:relative;padding-left:"+halfWidth+""' :value='contact_mobile' @click='toPage("tel")'>
			<image slot='icon' lazy-load class='icon' src='/static/img/global/phone.svg'></image>
		</selectItem>
		<selectItem label='修改密码' :fontStyle='"position:relative;padding-left:"+halfWidth+""' value=' ' @click='toPage("password")'>
			<image slot='icon' lazy-load class='icon' src='/static/img/global/pw-con.png'></image>
		</selectItem>
		<view class="margin20"></view>
		<view class='rebindWx'>
			<selectItem :label='"微信："+(nickName||"")' value='重新绑定' valueStyle='color:#fb6638;' v-if='nickName'></selectItem>
			<selectItem label='暂未绑定微信~' value='立即绑定' valueStyle='color:#fb6638;' v-else></selectItem>
			<button open-type='getUserInfo' @click='reBindWX' class='appletBtn'> </button>
		</view>
		<view class="margin20"></view>
		<view class="button" @click='leave'>退出登录</view>
		<van-toast id="van-toast" />
		<van-dialog id="van-dialog" />
		<MyTabbar :defaultIndex='3' :Jurisdiction='Jurisdiction'></MyTabbar>
	</div>
</template>

<script>
	import MyTabbar from '../../components/my-components/myTabbar3'
	import selectItem from '../../components/my-components/editBlock-SelectItem.vue'
	import inputItem from '../../components/my-components/editBlock-InputItem.vue'
	import {
		getJurisdiction
	} from '../../components/my-components/getJurisdiction.js'
	import {
		bindWx
	} from '../index/components/bindWx.js'
	let DataFrom = {};
	let managerId = ''
	export default {
		components: {
			selectItem,
			inputItem,
			MyTabbar
		},
		data() {
			return {
				Jurisdiction: {}, //权限
				userName: '',
				userTel: '',
				userId: '',
				contact_mobile: '',
				userRoleName: '',
				realName: '',
				wxInfo: {},
				wxapp_openid: '',
				nickName: '' //绑定的微信的昵称
			}
		},
		computed: {
			halfWidth() {
				return uni.upx2px(40) + 'px';
			}
		},
		methods: {
			initPage() {
				let login = this.Cacher.getData('login');
				this.Request('myInfo').then(res => {
					this.userName = res.contact;
					this.userTel = res.username;
					this.contact_mobile = res.manager_contact_mobile;
					this.userRoleName = res.is_root == 1 ? '超级管理员' : res.role_name;
					this.realName = res.manager_contact;
					this.userId = res[res.account_type] || res.mobile || res.email || res.username;
					this.wxapp_openid = res.wxapp_openid;
					managerId = res.manage_id;
					this.nickName = res.nickName;
					login.userId = login.userId || res.uid;
					this.Cacher.setData('login',login);
				})
			},
			toPage(val) {
				if (val == 'name') {
					this.Cacher.setData('myself', {
						userName: this.realName,
						userTel: this.contact_mobile,
						userRoleName: this.userRoleName,
						realName: this.realName,
						managerId,
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
						managerId,
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
			reBindWX(e) {
				bindWx.call(this, true).then(res => {}).finally(res => {
					this.closePageLoading();
					this.initPage();
				});
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
		},
		onPullDownRefresh() {
			this.initPage();
		},
		onLoad() {
			uni.hideTabBar({ //隐藏tabbar
				animation: false
			});
			getJurisdiction.call(this).then(res => {
				this.Jurisdiction = res;
			}).catch(res => {
				this.Toast(res.message)
			})
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
			white-space: pre-wrap;
			word-break: break-all;
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
	.icon {
		width: 28upx;
		height: 28upx;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		margin: auto;
	}
	.margin20 {
		height: 20upx;
	}
	.rebindWx {
		position: relative;
		width: 100%;
		height: fit-content;
		button {
			opacity: 0;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
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
