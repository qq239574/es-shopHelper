<script>
	import cacher from './store/cache.js'
	export default {
		onLaunch: function() {
			let that = this;
			this.Request('getSettings').then(res => {
				if (res.error == 0) {
					this.Cacher.setData('static_resources_domain', res.settings.attachment_root)
				}
			});
			
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	}
</script>

<style lang='scss'>
	/*每个页面公共css */
	@import "./common/scss/gobal.scss";
	@import "./graceUI2.0/graceUI.css";
	@import "./graceUI2.0/graceIcons.css";
	@import "./graceUI/graceUI.css";
	@font-face {
		font-family: 'iconfont';
		/* project id 1139013 */
		src: url('//at.alicdn.com/t/font_1139013_dnw0k7unsus.eot');
		src: url('//at.alicdn.com/t/font_1139013_dnw0k7unsus.eot?#iefix') format('embedded-opentype'), url('//at.alicdn.com/t/font_1139013_dnw0k7unsus.woff2') format('woff2'), url('//at.alicdn.com/t/font_1139013_dnw0k7unsus.woff') format('woff'), url('//at.alicdn.com/t/font_1139013_dnw0k7unsus.ttf') format('truetype'), url('//at.alicdn.com/t/font_1139013_dnw0k7unsus.svg#iconfont') format('svg');
	}
	/* #ifdef APP-PLUS */
	/* #endif */
	body,
	page {
		width: 100%;
		overflow-x: hidden;
		overflow-y: scroll;
		min-height: 100%;
		display: flex;
		overflow: auto;
		view {
			box-sizing: border-box;
		}
		.i-page-number {
			height: 70upx;
			line-height: 70upx;
		}
	}
</style>
