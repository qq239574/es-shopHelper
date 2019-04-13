<template>
	<view class='my-cell-block'>
		<view class='my-cell-block__pre my-cell-block__slot'>
			<slot name='pre'></slot>
		</view>
		<view class='my-cell-block__mid my-cell-block__slot'>
			<slot name='mid'></slot>
		</view>
		<view class='my-cell-block__aft my-cell-block__slot'>
			<slot name='aft'></slot>
		</view>
	</view>
</template>

<script>
	export default {}
</script>

<style lang="scss" scoped>
	.my-cell-block {
		width: 702upx;
		height: 210upx;
		background: #fff;
		border-radius: 10upx;
		display: flex;
		flex-wrap: nowrap;
		margin: auto;
		>.my-cell-block__slot {
			height: 100%;
			box-sizing: border-box;
		}
		>.my-cell-block__pre {
			width: 176upx;
			position: relative;
			image {
				width: 96upx;
				height: 96upx;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}
		>.my-cell-block__mid {
			width: 444upx;
		}
	}
</style>
