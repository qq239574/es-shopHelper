<template>
	<view class=" page pages-login-index">
		<view class="grace-center">
			<image src='../../static/img/global/logo.jpg' class='web-logo'></image>
		</view>
		<view class="tips">
			<image src='/static/img/global/warn.png' class='tips__round'></image>
			账号不存在！
		</view>
		<view class="grace-form">
			<van-cell-group>
				<van-field :value="userId" placeholder="请输入用户名" use-icon-slot @input='getUserId' clearable>
					<image slot='left-icon' src='/static/img/global/user-icon.jpg' class='icon user-icon'></image>
				</van-field>
				<van-field :value="password" :type="openEye?'text':'password'" placeholder="请输入密码" use-icon-slot @input='getPassWord' clearable>
					<image slot='left-icon' src='/static/img/global/pw-con.png' class='icon user-icon'></image>
					<van-icon slot="icon" @click='clickPWIcon' name="eye-o" class="van-cell__right-icon" v-if='openEye' />
					<van-icon slot="icon" @click='clickPWIcon' name="closed-eye" class="van-cell__right-icon" v-else />
				</van-field>
			</van-cell-group>
		</view>
		<LongButton @click='loginNow'>登录</LongButton>
		<view class="forget-pw cell-font-gray">
			<view @tap="reg">忘记密码?</view>
		</view>
		<!-- 第三方登录 -->
		<!-- <view class="grace-login-three" style="margin-top:8px;">
				                            <view class="grace-iconfont icon-weixin" @tap="loginWithWx"></view>
				                            <view class="grace-iconfont icon-qq"></view>
				                            <view class="grace-iconfont icon-weibo"></view>
				                        </view> -->
	</view>
</template>
<script>
	var graceChecker = require("../../graceUI/graceChecker.js");
	import LongButton from '../../components/my-components/LongButton';
	let userId = '',
		password = '';
	export default {
		components: {
			LongButton
		},
		data() {
			return {
				openEye: false
			}
		},
		methods: {
			getUserId(val) {
				userId = val.detail;
			},
			getPassWord(val) {
				password = val.detail;
			},
			clearInput() {
				console.log('object')
			},
			clickUserIcon() {
				console.log(123)
			},
			clickPWIcon() {
				console.log(123);
				this.openEye = !this.openEye;
			},
			loginWithWx: function() {
				uni.showToast({
					title: "请完善登录功能",
					icon: "none"
				})
			},
			loginNow: function(e) {
				console.log(userId, password);
				var checkRes = true;
				// 验证通过
				if (checkRes) {
					uni.reLaunch({
						url: '../index/index'
					})
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			reg: function() { //找回密码
				uni.navigateTo({
					url: '../../pagesLogin/pages/index'
				})
			}
		}
	}
</script>
<style lang='scss'>
	.pages-login-index {
		background: #fff;
		.field-index--van-field{
			padding-right:0;
		}
		.grace-center {
			margin: 60upx auto 16upx;
			.web-logo {
				width: 138upx;
				height: 138upx;
				box-shadow: 5upx 10upx 20upx 0 rgba(252, 115, 61, 0.2);
			}
		}
		.item-border {
			border-bottom: 1px solid #E0E0E0 !important;
		}
		.tips {
			width: 670upx;
			height: 64upx;
			box-sizing: border-box;
			background: #fff4f1;
			margin: auto;
			border-radius: 8upx;
			position: relative;
			padding: 0 20upx 0 64upx;
			line-height: 64upx;
			color: #fd463e;
			font-size: 25upx;
			.tips__round {
				position: absolute;
				left: 25upx;
				top: 20upx;
				width: 25upx;
				height: 25upx;
			}
		}
		.grace-form {
			width: 670upx;
			margin: 22upx auto 81upx;
		}
		.to-index {
			margin: 81upx auto 30upx;
		}
		.forget-pw {
			width: 100%;
			text-align: right;
			box-sizing: border-box;
			margin-top:32upx;
			view {
				font-size: 26upx;
				color: #999ca7;
				display: inline;
				margin-right:68upx;
				
			}
		}
		.icon {
			width: 29upx;
			height: 30upx;
			margin: 10upx 24upx 0 12upx;
		}
		.login-sendmsg-btn {
			border: 1px solid #00C777 !important;
			background: none !important;
			color: #00C777 !important;
			width: 100%;
			height: 35px;
			line-height: 35px;
			margin-top: 6px;
			font-size: 14px !important;
		}
		.van-cell__right-icon {
			margin-right: 22upx;
		}
	}
</style>
