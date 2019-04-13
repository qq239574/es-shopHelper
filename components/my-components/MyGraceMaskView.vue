<template name="graceMaskView">
	<view class="grace-mask" v-if="show" @tap.stop='close' @touchmove.stop='touch'>
		<view class="grace-mask-view" style="width:100%" v-if="show">
			<view class="grace-mask-view-content" style='background:#fff;'>
				<view class="top" ></view>
				<slot></slot>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: "graceMaskView",
		props: {
			show: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			touch() { //阻止事件穿透
			},
			close: function() {
				this.$emit('close');
			}
		}
	}
</script>
<style lang='scss'>
	.grace-mask {
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: 1;
	}
	.grace-mask-view {
		width: 100%;
		position: fixed;
		left: 0;
		top: 50%;
		bottom: 0;
		background: #fff;
		border-top-left-radius: 30px;
		border-top-right-radius: 30px;
		z-index: 99;
	}
	.grace-mask-view-content {
		width: 100%;
		border-radius: 5px;
		height: 100%;
		.top {
			position: relative;
			width: 100%;
			height: 63upx;
			&:after{
				content:'';
				width:80upx;
				height:12upx;
				position: absolute;
				left:0;right:0;
				margin:auto;
				bottom:15upx;
				border-radius: 6upx;
				background: #eee;
			}
		}
	}
</style>