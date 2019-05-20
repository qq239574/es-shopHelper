<template>
	<div class='pages-self-index page'>
		<view class="bg">
			<image lazy-load src='/static/img/global/my_bg.png'></image>
			<view class='userInfo'>
				<view class="name">{{userName}}</view>
				<view class="tel">{{userId}}</view>
			</view>
			<view class='manager'>{{userRoleName}}</view>
		</view>
		<inputItem :disabled='true' label='登陆账号' :value='userId'></inputItem>
		<selectItem label='姓名' :value='realName' @click='toPage("name")'></selectItem>
		<selectItem label='联系方式' :value='contact_mobile' @click='toPage("tel")'></selectItem>
		<selectItem label='修改密码' value=' ' @click='toPage("password")'></selectItem>
		<view class="margin20"></view>
		<selectItem :label='"微信："+(wxInfo.nickName||"")' value='重新绑定' valueStyle='color:#fb6638;' @click='reBindWX' v-if='wxapp_openid'></selectItem>
		<selectItem label='暂未绑定微信~' value='立即绑定' valueStyle='color:#fb6638;' @click='reBindWX' v-else></selectItem>
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
	let managerId=''
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
				wxapp_openid:''
			}
		},
		methods: {
			initPage() {
				this.Request('myInfo').then(res => {
					this.userName = res.contact;
					this.userTel = res.username;
					this.contact_mobile = res.manager_contact_mobile;
					this.userRoleName = res.is_root == 1 ? '超级管理员' : res.role_name;
					this.realName = res.manager_contact;
					this.userId =res[res.account_type]||res.mobile||res.email||res.username;
					this.wxapp_openid=res.wxapp_openid;
					managerId=res.manage_id
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
			reBindWX() { 
				this.closePageLoading();
				bindWx.call(this, true).then(res=>{
					
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
		onPullDownRefresh(){ 
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
