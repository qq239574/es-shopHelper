<template>
	<view class=" page pages-login-index">
		<block v-if='!tryLogining'>
			<view class="grace-center">
				<image src='../../static/img/global/logo.jpg' class='web-logo'></image>
			</view>
			<view class="tips" v-if='idError'>
				<image src='/static/img/global/warn.png' class='tips__round'></image>
				账号或密码错误！
			</view>
			<view class="grace-form">
				<van-cell-group :border='false'>
					<van-field :value="userId" placeholder="请输入用户名" use-icon-slot @input='getUserId' clearable @clear='clearInput("userId")'>
						<image slot='left-icon' src='/static/img/global/user-icon.jpg' class='icon user-icon'></image>
					</van-field>
					<view :style='height22'></view>
					<van-field :value="password" type="text" placeholder="请输入密码" use-icon-slot @input='getPassWord' clearable @clear='clearInput("password")' :style='openEye?"":"display:none"'>
						<image slot='left-icon' src='/static/img/global/pw-con.png' class='icon user-icon'></image>
						<van-icon slot="icon" custom-style='vertical-align:-20%;color:#9a9eaa;' :size='height30' @click='clickPWIcon' name="eye-o" class="van-cell__right-icon" v-if='openEye' />
						<van-icon slot="icon" custom-style='vertical-align:-20%;color:#9a9eaa;' :size='height30' @click='clickPWIcon' name="closed-eye" class="van-cell__right-icon" v-else />
					</van-field>
					<van-field :value="password" type="password" placeholder="请输入密码" use-icon-slot @input='getPassWord' clearable @clear='clearInput("password")' :style='openEye?"display:none":""'>
						<image slot='left-icon' src='/static/img/global/pw-con.png' class='icon user-icon'></image>
						<van-icon slot="icon" custom-style='vertical-align:-20%;color:#9a9eaa;' :size='height30' @click='clickPWIcon' name="eye-o" class="van-cell__right-icon" v-if='openEye' />
						<van-icon slot="icon" custom-style='vertical-align:-20%;color:#9a9eaa;' :size='height30' @click='clickPWIcon' name="closed-eye" class="van-cell__right-icon" v-else />
					</van-field>
				</van-cell-group>
			</view>
			<view class='getUserInfo'>
				<LongButton @click='loginNow' :disable='disableButton'><button class='appletBtn'></button>登录</LongButton>
			</view>
			<view class="forget-pw cell-font-gray">
				<view @tap="reg">忘记密码?</view>
			</view>
			<!-- 第三方登录 -->
			<view class="grace-login-three">
				<view class="surport">微信登录</view>
				<view class='surportList'>
					<view class="supporter" @click='loginWithWx'>
						<image lazy-load src='/static/img/global/product_share_wechat.svg'></image>
						<button @click='clickButton' open-type='getUserInfo' class='appletBtn'> </button>
					</view>
				</view>
			</view>
		</block>
		<van-toast id="van-toast" />
		<van-dialog id="van-dialog" />
	</view>
</template>
<script>
	var graceChecker = require("../../graceUI/graceChecker.js");
	import LongButton from '../../components/my-components/LongButton.vue';
	let requesting = false;
	let canLogin = false; //可否登录 
	let sessionId = ''
	let DataFrom = {};
	let requestBar = '';
	import {
		wxLogin,
		login
	} from './login.js'
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
				tryLogining: true, //正在尝试登录的
			}
		},
		computed: {
			disableButton() {
				this.idError = false;
				return !this.userId || !this.password;
			},
			height22() {
				return 'height:' + uni.upx2px(22) + 'px'
			},
			height30() {
				return uni.upx2px(30) + 'px'
			}
		},
		onLoad(option) {
			let canLogin = false;
			requesting = false;
			let that = this;
			this.Cacher.clearData('sessionId');
			DataFrom = this.Cacher.getData(option.from) || {}; //获取页面传参//如果没有from就说明是刚进入小程序
			this.initPage();
			if (!DataFrom.from) {
				setTimeout(() => { //防止接口过久
					this.tryLogining = false;
					this.closePageLoading();
				}, 3000);
				this.pageLoading();
				wxLogin.call(this).then(res => { //先尝试微信登录
					canLogin = true;
					this.Cacher.setData('cache-user-login', { //清空密码
						userId: this.userId,
						password: ''
					})
					uni.reLaunch({
						url: '../../pagesLogin/pages/selectShop?from=login'
					})
				}).finally(res => {
					console.log('loding....', this.userId, this.password, !canLogin)
					clearTimeout(requestBar);
					this.closePageLoading();
					this.tryLogining = false;
					if (this.userId && this.password && !canLogin) { //缓存了账号密码而且没有绑定微信就直接登录
						this.loginNow(false);
					}
				}); //微信登录
			} else { //从别处跳转过来的 
				this.closePageLoading();
				this.tryLogining = false;
				uni.clearStorage(); //清空缓存 
				this.Cacher.setData('cache-user-login', { //清空除账号密码以外的缓存
					userId: this.userId,
					password: this.password
				})
			}
		},
		mounted() {
			this.closePageLoading();
		},
		methods: {
			clickButton() {
				wxLogin.call(this).then(res => {
					uni.reLaunch({
						url: '../../pagesLogin/pages/selectShop?from=login'
					})
				}).catch(res => {
					res.message && this.Toast(res.message)
				}) //微信登录
			},
			initPage() {
				this.openEye = false;
				canLogin = false;
				let cache = this.Cacher.getData('cache-user-login');
				this.userId = cache && cache.userId || '';
				this.password = cache && cache.password || '';
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
			loginWithWx() {
				this.closePageLoading();
			},
			loginNow(val) { //点击登录 
				clearTimeout(requestBar);
				requestBar = setTimeout(() => {
					requesting = false;
					// (typeof val == 'boolean') || this.Toast('登录时间长，请重试');
				}, 6000);
				if (!requesting) { //函数节流
					requesting = true; //是否正在请求接口
					this.pageLoading();
					login.call(this).then(res => {
						clearTimeout(requestBar);
						uni.reLaunch({
							url: '../../pagesLogin/pages/selectShop?from=login'
						})
					}).catch(res => {
						this.idError = true; //账号密码不对
						(typeof val == 'boolean') || this.Toast(res.message);
						this.tryLogining = false;
					}).finally(res => {
						clearTimeout(requestBar);
						requesting = false;
						this.closePageLoading();
					}); //微信登录; //账号密码登录
				} else {
					this.closePageLoading();
					this.Toast('正在登录,请稍候');
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
		.getUserInfo {
			position: relative;
			width: fit-content;
			margin: auto;
			.my-long-button {
				font-size: 30upx;
				font-weight: 700;
				letter-spacing: 1upx;
			}
			button {
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				opacity: 0;
			}
		}
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
				.supporter {
					width: 80upx;
					height: 80upx;
					display: inline-block;
					position: relative;
					margin: 0;
					button,
					image {
						width: 80upx;
						height: 80upx;
						border-radius: 50%;
						padding: 0;
						margin: 0;
						position: absolute;
						top: 0;
						left: 0;
					}
					button {
						opacity: 0;
					}
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
			margin: 12upx 34upx 0 12upx;
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
