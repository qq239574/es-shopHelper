<template>
	<view class=" page pages-login-index">
		<view class="grace-center">
			<image src='../../static/img/global/logo.jpg' class='web-logo'></image>
		</view>
		<view class="tips" v-if='idError'>
			<image src='/static/img/global/warn.png' class='tips__round'></image>
			账号不存在！
		</view>
		<view class="grace-form">
			<van-cell-group>
				<van-field :value="userId" placeholder="请输入用户名" use-icon-slot @input='getUserId' clearable @clear='clearInput("userId")'>
					<image slot='left-icon' src='/static/img/global/user-icon.jpg' class='icon user-icon'></image>
				</van-field>
				<van-field :value="password" type="text" placeholder="请输入密码" use-icon-slot @input='getPassWord' clearable @clear='clearInput("password")' :style='openEye?"":"display:none"' >
					<image slot='left-icon' src='/static/img/global/pw-con.png' class='icon user-icon'></image>
					<van-icon slot="icon" @click='clickPWIcon' name="eye-o" class="van-cell__right-icon" v-if='openEye' />
					<van-icon slot="icon" @click='clickPWIcon' name="closed-eye" class="van-cell__right-icon" v-else />
				</van-field>
				<van-field :value="password" type="password" placeholder="请输入密码" use-icon-slot @input='getPassWord' clearable @clear='clearInput("password")' :style='openEye?"display:none":""' >
					<image slot='left-icon' src='/static/img/global/pw-con.png' class='icon user-icon'></image>
					<van-icon slot="icon" @click='clickPWIcon' name="eye-o" class="van-cell__right-icon" v-if='openEye' />
					<van-icon slot="icon" @click='clickPWIcon' name="closed-eye" class="van-cell__right-icon" v-else />
				</van-field>
			</van-cell-group>
		</view>
		<LongButton @click='loginNow' :disable='disableButton'>登录</LongButton>
		<view class="forget-pw cell-font-gray">
			<view @tap="reg">忘记密码?</view>
		</view>
		<!-- 第三方登录 -->
		<view class="grace-login-three">
			<view class="surport">微信登录</view>
			<view class='surportList'>
				<image lazy-load src='/static/img/global/wechat.png' @click='loginWithWx'></image>
			</view>
		</view>
		<van-toast id="van-toast" />
		<van-dialog id="van-dialog" />
	</view>
</template>
<script>
	var graceChecker = require("../../graceUI/graceChecker.js");
	import LongButton from '../../components/my-components/LongButton';
	let requesting = false;
	let canLogin = false; //可否登录 
	let sessionId = ''
	let DataFrom = {}
	export default {
		components: {
			LongButton
		},
		data() {
			return {
				openEye: false,
				userId: '',
				password: '',
				idError: false, //用户信息错误
			}
		},
		computed: {
			disableButton() {
				this.idError = false;
				return !this.userId || !this.password;
			}
		},
		onLoad(option) {
			DataFrom = this.Cacher.getData(option.from) || {};//获取页面传参//如果没有from就说明是刚进入小程序
			this.initPage(); 
			if (!DataFrom.from) {} else {}
		},
		mounted() {
			this.closePageLoading()
		},
		methods: {
			initPage() {
				this.openEye = false;
				canLogin = false;
				this.userId = 'yilianxinpin';
				this.password = 'Qm8xn4KVBMc0Wd70';
				this.idError = false;
			},
			getUserId(val) {
				this.userId = val.detail;
			},
			getPassWord(val) {
				this.password = val.detail;
			},
			clearInput(key) {
				this[key] = '';
			},
			clickPWIcon() { //切换加密显示与明文显示
				this.openEye = !this.openEye;
			},
			loginWithWx: function() {
				this.closePageLoading();
				this.Toast('当前微信暂未绑定任何管理员账号');
			},
			loginNow(e) { //点击登录
				if (!requesting) { //函数节流
					requesting = true; //是否正在请求接口
					this.pageLoading();
					this.Request('login', {
						account: this.userId,
						password: this.password
					}).then((res) => {
						// 验证通过
						if (res.error == 0) {
							canLogin = true;
							if (canLogin) {
								uni.reLaunch({
									url: '../../pagesLogin/pages/selectShop?from=login'
								})
							} else {
								this.idError = true;//账号密码不对
							}
						} else {
							this.Toast(res.message)
						}
						this.closePageLoading();
						requesting = false;
					}).catch(res => {
						requesting = false;
						this.Cacher.setData('login',{
							from:'login'
						})
						if (res.error == -3) { //已登录
							uni.reLaunch({
								url: '../../pagesLogin/pages/selectShop?from=login'
							})
						}else{
							this.Toast(res.message)
						}
					})
				} else {
					setTimeout(() => {
						requesting = false;
						this.Toast('登录时间长，请重试')
					}, 3000)
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
		position: relative;
		overflow: hidden;
		.grace-login-three {
			width: 670upx;
			height: 200upx;
			position: absolute;
			left: 40upx;
			bottom: 0;
			flex-wrap: wrap;
			justify-content: flex-start;
			margin: 0;
			.surport {
				color: #a4abb3;
				width: 100%;
				font-size: 26upx;
				height: 26upx;
				line-height: 26upx;
				text-align: center;
				margin: 0;
				position: relative;
				&:before,
				&:after {
					content: '';
					position: absolute;
					width: 240upx;
					border-top: 1upx solid #eee;
					top: 12upx;
				}
				&:before {
					left: 0;
				}
				&:after {
					right: 0;
				}
			}
			.surportList {
				width: 100%;
				height: 80upx;
				text-align: center;
				margin: 0 auto 20upx;
				image {
					display: inline-block;
					width: 80upx;
					height: 80upx;
					border-radius: 50%;
				}
			}
		}
		.field-index--van-field {
			padding-right: 0;
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
			margin-top: 32upx;
			view {
				font-size: 26upx;
				color: #999ca7;
				display: inline;
				margin-right: 68upx;
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
